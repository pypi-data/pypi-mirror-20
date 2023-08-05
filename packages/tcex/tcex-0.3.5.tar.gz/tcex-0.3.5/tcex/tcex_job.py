""" standard """
import json
import re
import time

""" third-party """

""" custom """


class TcExJob(object):
    """Job processing functionality

    Supports batch indicator adds and allows structured group adds.
    """

    def __init__(self, tcex):
        """Initialize class data

        Args:
            tcex (instance): An instance of TcEx class
        """
        self._tcex = tcex

        # containers
        self._file_occurrences = []
        self._group_cache = {}
        self._group_cache_id = {}
        self._group_associations = []
        self._groups = []
        self._indicators = []
        self._indicators_results = []

        # batch "bad" errors
        self._batch_failures = [
            'would exceed the number of allowed indicators'
        ]

        # keep the batch_id
        self._indicator_batch_ids = []

    def _chunk_indicators(self):
        """Split indicator list into smaller more manageable numbers.

        """
        for i in xrange(0, len(self._indicators), self._tcex._args.batch_chunk):
            yield self._indicators[i:i + self._tcex._args.batch_chunk]

    def _group_add(self, resource_type, resource_name, owner, data=None):
        """Add a group to ThreatConnect

        Args:
            resource_type (string): String with resource [group] type
            resource_name (string): The name of the group
            owner (string): The name of the TC owner for the group add
            data (Optional [dictionary]): Any optional group parameters, tags,
                or attributes

        Returns:
            (integer): The ID of the created resource
        """
        resource_id = None
        if data is None:
            data = {}

        self._tcex.log.debug(u'Adding {} "{}" in owner {}'.format(
            resource_type, resource_name, owner))
        resource_body = {'name': resource_name}
        resource = getattr(self._tcex.resources, resource_type)(self._tcex)
        resource.http_method = 'POST'
        resource.owner = owner
        resource.url = self._tcex._args.tc_api_path

        # incident
        if data.get('eventDate') is not None:
            resource_body['eventDate'] = data.get('eventDate')

        resource.body = json.dumps(resource_body)
        results = resource.request()

        if results.get('status') == 'Success':
            resource_id = results['data']['id']
            resource = getattr(self._tcex.resources, resource_type)(self._tcex)
            resource.http_method = 'POST'
            resource.url = self._tcex._args.tc_api_path

            # add attributes
            for attribute in data.get('attribute', []):
                self._tcex.log.debug('Adding attribute type ({})'.format(attribute['type']))
                resource.resource_id(resource_id)
                resource.attributes()
                resource.body = json.dumps(attribute)
                # results = resource.request()
                resource.request()

            # add tags
            for tag in data.get('tag', []):
                self._tcex.log.debug(u'Adding tag ({})'.format(tag))
                resource.resource_id(resource_id)
                resource.tags(tag.get('name'))
                # results = resource.request()
                resource.request()
        else:
            err = 'Failed adding group ({})'.format(resource_name)
            self._tcex.log.error(err)
            self._tcex.exit_code(3)

        return resource_id

    def _process_file_occurrences(self, owner):
        """Process file occurrences and write to TC API

        Args:
            owner (string):  The owner name for the indicator to be written
        """
        # POST /v2/indicators/files/BE7DE2F0CF48294400C714C9E28ECD01/fileOccurrences
        # supported format -> 2014-11-03T00:00:00-05:00

        resource = getattr(self._tcex.resources, 'File')(self._tcex)
        resource.http_method = 'POST'
        resource.owner = owner
        resource.url = self._tcex._args.tc_api_path

        for occurrence in self._file_occurrences:
            # remove the hash from the dictionary and add to URI
            resource.occurrence(occurrence.pop('hash'))
            resource.body = json.dumps(occurrence)
            # results = resource.request()
            resource.request()

    def _process_group_association(self, owner):
        """Process groups and write to TC API

        Args:
            owner (string):  The owner name for the indicator to be written
        """
        for ga in self._group_associations:
            self._tcex.log.info(u'creating association: group {} indicator {}'.format(
                ga['group_name'], ga['indicator']))

            group_id = self.group_id(ga['group_name'], owner, ga['group_type'])
            if group_id is None:
                continue

            resource = getattr(
                self._tcex.resources, self._tcex.safe_rt(ga['indicator_type']))(self._tcex)
            resource.http_method = 'POST'
            resource.indicator(ga['indicator'])
            resource.owner = owner
            resource.url = self._tcex._args.tc_api_path

            association_resource = getattr(self._tcex.resources, ga['group_type'])(self._tcex)
            association_resource.resource_id(group_id)
            resource.association_pivot(association_resource.request_uri)
            resource.request()

    def _process_groups(self, owner, duplicates=False):
        """Process groups and write to TC API

        Args:
            owner (string):  The owner name for the indicator to be written
        """
        for group in self._groups:
            cache = self.group_cache(owner, group['type'])

            self._tcex.log.debug(u'Processing group ({})'.format(group.get('name')))
            if duplicates:
                # bcs - support duplicate groups
                pass
            elif group['name'] not in cache.keys():
                group_id = self._group_add(group['type'], group['name'], owner, group)
                if group_id is not None:
                    self._group_cache[owner][group['type']][group['name']] = group_id
                self._tcex.log.info(u'Creating group {} [{}]'.format(group['name'], group_id))
            else:
                self._tcex.log.debug(u'Existing Group ({})'.format(group.get('name')))

    def _process_indicators(self, owner, batch):
        """Process batch indicators and write to TC API

        Args:
            owner (string): The owner name for the indicator to be written
            batch (boolean): Use the batch API to create indicators
        """
        self._tcex.log.info('Processing {} indicators'.format(len(self._indicators)))

        if batch:
            self._process_indicators_batch(owner)
        else:
            self._process_indicators_v2(owner)

    def _process_indicators_batch(self, owner):
        """Process batch indicators and write to TC API

        Args:
            owner (string):  The owner name for the indicator to be written
        """
        resource = getattr(self._tcex.resources, 'Batch')(self._tcex)
        resource.http_method = 'POST'
        resource.url = self._tcex._args.tc_api_path

        batch_job_body = {
            'action': self._tcex._args.batch_action,
            'attributeWriteType': self._tcex._args.batch_write_type,
            'haltOnError': self._tcex._args.batch_halt_on_error,
            'owner': owner
        }

        for chunk in self._chunk_indicators():
            self._tcex.log.info('Batch Chunk Size: {}'.format(len(chunk)))
            resource.content_type = 'application/json'
            resource.body = json.dumps(batch_job_body)
            results = resource.request()

            if results['status'] == 'Success':
                batch_id = results['data']
                self._indicator_batch_ids.append(batch_id)

                resource.content_type = 'application/octet-stream'
                resource.batch_id(batch_id)
                resource.body = json.dumps(chunk)
                # results = resource.request()
                resource.request()

                # bcs - add a small delay before first status check then normal delay in loop
                time.sleep(3)

                poll_time = 0
                while True:
                    self._tcex.log.debug('poll_time: {0}'.format(poll_time))
                    if poll_time >= self._tcex._args.batch_poll_interval_max:
                        msg = 'Status check exceeded max poll time.'
                        self._tcex.log.error(msg)
                        self._tcex.message_tc(msg)
                        self._tcex.exit(1)

                    if self.batch_status(batch_id):
                        break

                    time.sleep(self._tcex._args.batch_poll_interval)

                    poll_time += self._tcex._args.batch_poll_interval

    def _process_indicators_v2(self, owner):
        """Process batch indicators and write to TC API

        Args:
            owner (string):  The owner name for the indicator to be written
        """
        for i_data in self._indicators:
            i_value = i_data.get('summary').split(' : ')[0]  # only need the first indicator value
            resource = getattr(self._tcex.resources, 'Indicator')(self._tcex)

            body = {}
            for i_field in resource.indicators(i_data):
                body[i_field.get('type')] = i_field.get('value')

            if i_data.get('rating') is not None:
                body['rating'] = i_data.get('rating')
            if i_data.get('confidence') is not None:
                body['confidence'] = i_data.get('confidence')
            if i_data.get('size') is not None:
                body['size'] = i_data.get('size')
            if i_data.get('dns_active') is not None:
                body['dns_active'] = i_data.get('dns_active')
            if i_data.get('whois_active') is not None:
                body['whois_active'] = i_data.get('whois_active')
            if i_data.get('source') is not None:
                body['source'] = i_data.get('source')

            resource = getattr(
                self._tcex.resources, self._tcex.safe_rt(i_data.get('type')))(self._tcex)
            resource.body = json.dumps(body)
            resource.http_method = 'POST'
            resource.owner = owner
            resource.url = self._tcex._args.tc_api_path

            i_results = resource.request()

            # PUT file indicator since API does not work consistenly for all indiator types
            if i_data.get('type') == 'File' and i_results.get('response').status_code == 400:
                resource.http_method = 'PUT'
                resource.indicator(i_value)
                i_results = resource.request()
                resource.http_method = 'POST'

            # Log error and continue
            if i_results.get('status') != 'Success':
                err = 'Failed adding indicator {} type {} ({}).'.format(
                    i_data.get('summary'), i_data.get('type'), i_results.get('response').text)
                self._tcex.log.error(err)
                self._tcex.exit_code(3)
                continue
            results_data = i_results.get('data')

            # Add attribute to Indicator
            for attribute in i_data.get('attribute', []):
                # process attributes
                if resource.custom:
                    resource.indicator(i_data.get('summary'))
                else:
                    resource.indicator(i_value)
                resource.attributes()  # pivot to attribute
                resource.body = json.dumps(attribute)
                a_results = resource.request()
                if a_results.get('status') != 'Success':
                    err = 'Failed adding attribute type {} to indicator {}.'.format(
                        attribute.get('type'), i_data.get('summary'))
                    self._tcex.log.error(err)
                    self._tcex.exit_code(3)
                results_data.setdefault('attribute', []).append(a_results.get('data'))

            for tag in i_data.get('tag', []):
                # process attributes
                if resource.custom:
                    resource.indicator(i_data.get('summary'))
                else:
                    resource.indicator(i_value)
                resource.tags(self._tcex.safetag(tag.get('name')))
                t_results = resource.request()
                if t_results.get('status') != 'Success':
                    err = 'Failed adding tag {} to indicator {}.'.format(
                        tag.get('name'), i_data.get('summary'))
                    self._tcex.log.error(err)
                    self._tcex.exit_code(3)
                results_data.setdefault('tag', []).append(a_results.get('data'))

            for group_id in i_data.get('associatedGroup', []):
                group_type = self.group_cache_type(group_id, owner)
                if group_type is None:
                    err = 'Could not get Group Type for Group ID {} in Owner "{}"'.format(
                        group_id, owner)
                    self._tcex.log.error(err)
                    self._tcex.exit_code(3)
                    continue

                if resource.custom:
                    resource.indicator(i_data.get('summary'))
                else:
                    resource.indicator(i_value)
                association_resource = getattr(self._tcex.resources, group_type)(self._tcex)
                association_resource.resource_id(group_id)
                resource.association_pivot(association_resource.request_uri)
                a_results = resource.request()
                if a_results.get('status') != 'Success':
                    err = 'Failed association group id {} to indicator {}.'.format(
                        group_id, i_data.get('summary'))
                    self._tcex.log.error(err)
                    self._tcex.exit_code(3)
                results_data.setdefault('associatedGroup', []).append(group_id)

            self._indicators_results.append(results_data)

    def batch_action(self, action):
        """Set the default batch action for argument parser.

        Args:
            action (string): Set batch job action
        """
        if action in ['Create', 'Delete']:
            self._tcex._parser.set_defaults(batch_action=action)

    def batch_chunk(self, chunk_size):
        """Set batch chunk_size for argument parser.

        Args:
            chunk_size (integer): Set batch job chunk size
        """
        self._tcex._parser.set_defaults(batch_chunk=chunk_size)

    def batch_halt_on_error(self, halt_on_error):
        """Set batch halt on error boolean for argument parser.

        Args:
            halt_on_error (boolean): Boolean value for halt on error
        """
        if isinstance(halt_on_error, bool):
            self._tcex._parser.set_defaults(batch_halt_on_error=halt_on_error)

    def batch_indicator_success(self):
        """Check completion for all batch jobs associated with this instance.

        Iterate over self._indicator_batch_ids set in
        :py:meth:`~tcex.tcex_job.TcExJob._process_indicators` and return the status of all job.

        Returns:
            (dictionary): The status results from the Batch jobs.
        """

        status = {'success': 0, 'failure': 0, 'unprocessed': 0}

        resource = getattr(self._tcex.resources, 'Batch')(self._tcex)
        resource.url = self._tcex._args.tc_api_path

        for batch_id in self._indicator_batch_ids:
            resource.batch_id(batch_id)
            results = resource.request()

            if (results.get('status') == 'Success' and
                        'batchStatus' in results['data'] and
                        results['data']['batchStatus'] == 'Completed'):
                status['success'] += results['data']['batchStatus']['successCount']
                status['failure'] += results['data']['batchStatus']['errorCount']
                status['unprocessed'] += results['data']['batchStatus']['unprocessCount']

        return status

    def batch_poll_interval(self, interval):
        """Set batch polling interval for argument parser.

        Args:
            interval (integer): Seconds between polling
        """
        if isinstance(interval, int):
            self._tcex._parser.set_defaults(batch_poll_interval=interval)

    def batch_poll_interval_max(self, interval_max):
        """Set batch polling interval max for argument parser.

        Args:
            interval_max (integer): Max seconds before timeout on batch
        """
        if isinstance(interval_max, int):
            self._tcex._parser.set_defaults(batch_poll_interval_max=interval_max)

    def batch_status(self, batch_id):
        """Check the status of a batch job

        This method will get the status of a batch job. Any errors returned from the batch status
        will be automatically logged.

        Critical errors are defined in the __init__ method in the self._batch_failures dictionary.
        If any of the critical errors are found the execution of the App will halt with a exit
        code of 1.  All other errors will set the status code to 3, but will not cause the execution
        to halt.

        Args:
            batch_id (int): Id of the batch job

        Returns:
            (boolean): Status of batch job.
        """
        status = False

        resource = getattr(self._tcex.resources, 'Batch')(self._tcex)
        resource.url = self._tcex._args.tc_api_path
        resource.batch_id(batch_id)
        results = resource.request()

        self._tcex.log.info('batch id: {}'.format(batch_id))
        if results.get('status') == 'Success':
            if results['data']['status'] == 'Completed':
                status = True

                status_msg = 'Batch Job completed, totals: '
                status_msg += 'succeeded: {0}, '.format(results['data']['successCount'])
                status_msg += 'failed: {0}, '.format(results['data']['errorCount'])
                status_msg += 'unprocessed: {0}'.format(results['data']['unprocessCount'])
                self._tcex.log.info(status_msg)

                if results['data']['errorCount'] > 0:
                    self._tcex.exit_code(3)

                    resource = getattr(self._tcex.resources, 'Batch')(self._tcex)
                    resource.url = self._tcex._args.tc_api_path
                    resource.errors(batch_id)
                    error_results = resource.request()

                    for error in json.loads(error_results['data']):
                        error_reason = error.get('errorReason')
                        for error_msg in self._batch_failures:

                            if re.findall(error_msg, error_reason):
                                # Critical Error
                                err = 'Batch Error: {0}'.format(error)
                                self._tcex.message_tc(err)
                                self._tcex.log.error(err)
                                self._tcex.exit(1)
                        self._tcex.log.warn('Batch Error: {0}'.format(error))
            else:
                self._tcex.log.debug('Batch Status: {}'.format(results['data']['status']))

        return status

    def batch_write_type(self, write_type):
        """Set batch attributes write type for argument parser.

        Args:
            write_type (string): Type of Append or Replace
        """
        if write_type in ['Append', 'Replace']:
            self._tcex._parser.set_defaults(batch_write_type=write_type)

    def file_occurrence(self, fo):
        """

        Args:
            fo (dictionary): The file occurrence data.

        .. Warning:: There is no validation of the data passed to this method.

        **Example Data** *(required fields are highlighted)*

        .. code-block:: javascript
            :linenos:
            :lineno-start: 1
            :emphasize-lines: 3

            {
                "date" : "2014-11-03T00:00:00-05:00",
                "fileName" : "win999301.dll",
                "hash": "BE7DE2F0CF48294400C714C9E28ECD01",
                "path" : "C:\\Windows\\System"
            }

        .. Note:: The hash in the example above is not posted in the body, but extracted to use
                  in the URI.
        """
        # POST /v2/indicators/files/BE7DE2F0CF48294400C714C9E28ECD01/fileOccurrences

        if isinstance(fo, list):
            self._file_occurrences.extend(fo)
        elif isinstance(fo, dict):
            self._file_occurrences.append(fo)

    # bcs - not rewriting this until I know what it is for.
    # def get_batch_job(self, batch_id):
    #     """what is this for?"""
    #
    #     batch_jobs = tc.batch_jobs()
    #     batch_filter = batch_jobs.add_filter()
    #     batch_filter.add_id(batch_id)

    #     try:
    #         batch_jobs.retrieve()
    #     except RuntimeError as re:
    #         self._tcex.log.error(re)
    #         self._tcex.message_tc(re)

    #     return batch_jobs

    def group(self, group):
        """Add group data to TcEx job.

        This method will accept a list or dictionary of formatted *Group* data and submit it to the
        API when the :py:meth:`~tcex.tcex_job.TcExJob.process` method is called.

        .. Warning:: There is no validation of the data passed to this method.

        **Example Data** *(required fields are highlighted)*

        .. code-block:: javascript
            :linenos:
            :lineno-start: 1
            :emphasize-lines: 9,14

            {
              'attribute': [
                {
                  'type': 'Description',
                  'value': 'Test Description'
                }
              ],
              'eventDate': '2015-03-7T00:00:00Z'
              'name': 'adversary-001',
              'tag': [{
                'name': 'Pop Star'
              }],
              'type': 'Adversary'
            }

        Args:
            group (dict | list): Dictionary or List containing group data.
        """
        if isinstance(group, list):
            self._groups.extend(group)
        elif isinstance(group, dict):
            self._groups.append(group)

    def group_association(self, associations):
        """Add group association data to TcEx job.

        This method will add group association data to the group association list.

        .. Warning:: There is no validation of the data passed to this method.

        **Example Data** *(required fields are highlighted)*

        .. code-block:: javascript
            :linenos:
            :lineno-start: 1
            :emphasize-lines: 2-5

            {
              'group_name': 'adversary-001',
              'group_type': 'Adversary',
              'indicator': '1.1.1.1',
              'indicator_type': 'Address'
            }

        Args:
            associations (dict | list): Dictionary or List containing group
                association data
        """
        if isinstance(associations, list):
            self._group_associations.extend(associations)
        elif isinstance(associations, dict):
            self._group_associations.append(associations)

    @property
    def group_association_len(self):
        """The current length of the group association list.

        Returns:
            (integer): The length of the group association list
        """
        return len(self._group_associations)

    def group_cache(self, owner, resource_type):
        """Cache group data from the ThreatConnect Platform.

        The method will cache ThreatConnect group data by owner and type.

        **Cache Structure**
        ::

            Owner -> Group Type -> Group Name:Group Id

        Args:
            owner (string): The name of the ThreatConnect owner
            resource_type (string): The resource type name

        Returns:
            (dictionary): Dictionary of group resources
        """

        # already cached
        if owner in self._group_cache:
            if resource_type in self._group_cache[owner]:
                return self._group_cache[owner][resource_type]

        self._tcex.log.info(u'Caching group type {} for owner {}'.format(resource_type, owner))
        self._group_cache.setdefault(owner, {})
        self._group_cache[owner].setdefault(resource_type, {})

        resource = getattr(self._tcex.resources, resource_type)(self._tcex)
        resource.owner = owner
        resource.url = self._tcex._args.tc_api_path
        data = []
        for results in resource:
            if results['status'] == 'Success':
                data += results.get('data')
            else:
                err = 'Failed retrieving result during pagination.'
                self._tcex.log.err(err)
                raise RuntimeError(e)

        for group in data:
            self._tcex.log.debug('cache - group name: ({})'.format(group.get('name')))
            if self._group_cache.get(owner, {}).get(resource_type, {}).get(group.get('name')) is not None:
                warn = 'A duplicate Group name was found ({}). Duplicates are not supported in cache.'
                warn = warn.format(group.get('name'))
                self._tcex.log.warning(warn)
            self._group_cache[owner][resource_type][group['name']] = group['id']

        return self._group_cache[owner][resource_type]

    def group_id(self, name, owner, resource_type):
        """Get the group id from the group cache.

        Args:
            name(string): The name of the Group
            owner (string): The TC Owner where the resouce should be found
            resource_type (string): The resource type name

        Returns:
            (integer): The ID for the provided group name and owner.
        """
        group_id = None

        if owner not in self._group_cache:
            self.group_cache(owner, resource_type)
        elif resource_type not in self._group_cache[owner]:
            self.group_cache(owner, resource_type)

        if name in self._group_cache[owner][resource_type]:
            group_id = self._group_cache[owner][resource_type][name]

        return group_id

    def group_cache_type(self, group_id, owner):
        """Get the group type for the provided group id

        **Cache Structure**
        ::

            Owner -> Group Id:Group Type


        Args:
            group_id (string): The group id to lookup
            owner (string): The TC Owner where the resouce should be found
            resource_type (string): The resource type name

        Returns:
            (integer): The ID for the provided group name and owner.
        """
        if self._group_cache_id.get(owner) is None:

            self._tcex.log.info(u'Caching groups for owner {}'.format(owner))
            self._group_cache_id.setdefault(owner, {})

            resource = getattr(self._tcex.resources, 'Group')(self._tcex)
            resource.owner = owner
            resource.url = self._tcex._args.tc_api_path
            data = []
            for results in resource:
                if results['status'] == 'Success':
                    for group in results.get('data'):
                        self._group_cache_id[owner][group.get('id')] = group['type']
                else:
                    err = 'Failed retrieving result during pagination.'
                    self._tcex.log.error(err)
                    raise RuntimeError(e)

        return self._group_cache_id.get(owner, {}).get(group_id)

    @property
    def group_len(self):
        """The current length of the group list.

        Returns:
            (integer): The length of the group list.
        """
        return len(self._groups)

    def indicator(self, indicator):
        """Add indicator data to TcEx job.

        This method will add indicator data to this TcEx job to be submitted via batch import.

        .. Warning:: There is no validation of the data passed to this method. Duplicate prevention
                     will only be handled when a dictionary is provided.

        **Example Data** *(required fields are highlighted)*

        .. code-block:: javascript
            :linenos:
            :lineno-start: 1
            :emphasize-lines: 14,19

            {
              'associatedGroup': [
                '1',
                '8'
              ],
              'attribute': [
                {
                  'type': 'Description',
                  'value': 'Test Description'
                }
              ],
              'confidence': 5,
              'rating': '3',
              'summary': '1.1.1.1',
              'tag': [
                'APT',
                'Crimeware'
              ],
              'type': 'Address'
            }

        Args:
            indicator (dict | list): Dictionary or List containing indicator
                data
        """
        if isinstance(indicator, list):
            self._indicators.extend(indicator)
        elif isinstance(indicator, dict):
            # verifiy indicator is not a duplicate before adding
            if indicator['summary'] not in self._indicators:
                self._indicators.append(indicator)

    @property
    def indicator_data(self):
        """Return the current indicator list.

        Returns:
            (list): The indicator list
        """
        data = self._indicators
        if len(self._indicators_results) > 0:
            data = self._indicators_results
        return data

    @property
    def indicator_len(self):
        """The current length of the indicator list

        Returns:
            (integer): The length of the indicator list
        """
        return len(self._indicators)

    def process(self, owner, indicator_batch=True):
        """Process all association, group and indicator data.

        Process each of the supported data types for this job.

        Args:
            owner (string): The owner name for the data to be written
        """
        if len(self._groups) > 0:
            self._tcex.log.info('Processing Groups')
            self._process_groups(owner)

        if len(self._indicators) > 0:
            self._tcex.log.info('Processing Indicators')
            self._process_indicators(owner, indicator_batch)

        if len(self._file_occurrences) > 0:
            self._tcex.log.info('Processing File Occurrences')
            self._process_file_occurrences(owner)

        if len(self._group_associations) > 0:
            self._tcex.log.info('Processing Group Associations')
            self._process_group_association(owner)
