import logging

from django.conf import settings

import re
import requests


class ConnectWiseAPIError(Exception):
    """Raise this, not request exceptions."""
    pass


CONTENT_DISPOSITION_RE = re.compile(
    '^attachment; filename=\"{0,1}(.*?)\"{0,1}$'
)

logger = logging.getLogger(__name__)


class ConnectWiseAPIClient(object):
    API = None

    def __init__(
        self,
        id=settings.CONNECTWISE_CREDENTIALS['company_id'],
        integrator_login_id=settings.CONNECTWISE_CREDENTIALS[
            'integrator_login_id'],
        integrator_password=settings.CONNECTWISE_CREDENTIALS[
            'integrator_password'],
        url=settings.CONNECTWISE_SERVER_URL,
        api_public_key=settings.CONNECTWISE_CREDENTIALS['api_public_key'],
        api_private_key=settings.CONNECTWISE_CREDENTIALS['api_private_key'],
        api_codebase=settings.CONNECTWISE_CREDENTIALS['api_codebase']
    ):  # TODO - kwarg should be changed to server_url

        if not self.API:
            raise ValueError('API not specified')

        self.id = id
        self.integrator_login_id = integrator_login_id
        self.integrator_password = integrator_password
        self.api_public_key = api_public_key
        self.api_private_key = api_private_key
        self.api_codebase = api_codebase

        self.url = '{0}/{1}/apis/3.0/{2}/'.format(
            url,
            self.api_codebase,
            self.API,
        )

        self.auth = ('{0}+{1}'.format(self.id, self.api_public_key),
                     '{0}'.format(self.api_private_key),)

    def _endpoint(self, path):
        return '{0}{1}'.format(self.url, path)

    def _log_failed(self, response):
        logger.error('FAILED API CALL: {0} - {1} - {2}'.format(
            response.url, response.status_code, response.content))

    def fetch_resource(self, endpoint_url, params=None):
        """
        A convenience method for issuing a request to the
        specified REST endpoint
        """
        if not params:
            params = {}

        if 'pageSize' not in params:
            # Default to max record count.
            params['pageSize'] = 1000

        try:
            endpoint = self._endpoint(endpoint_url)
            response = requests.get(
                endpoint,
                params=params,
                auth=self.auth,
                timeout=settings.DJCONNECTWISE_API_TIMEOUT,
            )
        except requests.RequestException as e:
            logger.error('Request failed: GET {}: {}'.format(endpoint, e))
            raise ConnectWiseAPIError('{}'.format(e))

        if 200 <= response.status_code < 300:
            return response.json()
        else:
            msg = response.content
            self._log_failed(response)

            raise ConnectWiseAPIError(msg)


class ProjectAPIClient(ConnectWiseAPIClient):
    API = 'project'
    ENDPOINT_PROJECT = 'projects/'

    def get_projects(self):
        return self.fetch_resource(self.ENDPOINT_PROJECT)

    def update_project(self, json_data):
        try:
            endpoint = self._endpoint('projects/{}'.format(json_data['id']))
            response = requests.put(
                endpoint,
                params=dict(id=json_data['id'], body=json_data),
                json=json_data,
                auth=self.auth,
                timeout=settings.DJCONNECTWISE_API_TIMEOUT,
            )
            return response
        except requests.RequestException as e:
            logger.error('Request failed: PUT {}: {}'.format(endpoint, e))
            raise ConnectWiseAPIError('{}'.format(e))


class SystemAPIClient(ConnectWiseAPIClient):
    API = 'system'
    MAX_PER_PAGE = 1000

    # endpoints
    ENDPOINT_MEMBERS = 'members/'
    ENDPOINT_MEMBERS_IMAGE = 'members/{}/image'
    ENDPOINT_MEMBERS_COUNT = 'members/count'
    ENDPOINT_CALLBACKS = 'callbacks/'
    ENDPOINT_INFO = 'info/'

    def get_connectwise_version(self):
        result = self.fetch_resource(self.ENDPOINT_INFO)
        return result.get('version', '')

    def get_members(self):
        response_json = self.get_member_count()

        if len(response_json) == 1:
            per_page = response_json['count']
        else:
            per_page = self.MAX_PER_PAGE

        params = {
            'pageSize': per_page,
        }

        return self.fetch_resource(
            self.ENDPOINT_MEMBERS,
            params=params
        )

    def get_member_count(self):
        return self.fetch_resource(self.ENDPOINT_MEMBERS_COUNT)

    def get_callbacks(self):
        return self.fetch_resource(self.ENDPOINT_CALLBACKS)

    def delete_callback(self, entry_id):
        try:
            endpoint = self._endpoint(
                '{}{}'.format(self.ENDPOINT_CALLBACKS, entry_id)
            )

            response = requests.request(
                'delete',
                endpoint,
                auth=self.auth,
                timeout=settings.DJCONNECTWISE_API_TIMEOUT,
            )
        except requests.RequestException as e:
            logger.error('Request failed: DELETE {}: {}'.format(endpoint, e))
            raise ConnectWiseAPIError('{}'.format(e))

        response.raise_for_status()
        return response

    def create_callback(self, callback_entry):
        try:
            endpoint = self._endpoint(self.ENDPOINT_CALLBACKS)
            response = requests.request(
                'post',
                endpoint,
                json=callback_entry,
                auth=self.auth,
                timeout=settings.DJCONNECTWISE_API_TIMEOUT,
            )
        except requests.RequestException as e:
            logger.error('Request failed: POST {}: {}'.format(endpoint, e))
            raise ConnectWiseAPIError('{}'.format(e))

        if 200 <= response.status_code < 300:
            return response.json()
        else:
            self._log_failed(response)

        return {}

    def update_callback(self, callback_entry):
        try:
            endpoint = self._endpoint(
                'callbacks/{0}'.format(callback_entry.entry_id)
            )
            response = requests.request(
                'put',
                endpoint,
                json=callback_entry,
                auth=self.auth,
                timeout=settings.DJCONNECTWISE_API_TIMEOUT,
            )
        except requests.RequestException as e:
            logger.error('Request failed: PUT {}: {}'.format(endpoint, e))
            raise ConnectWiseAPIError('{}'.format(e))

        return response

    def get_member_by_identifier(self, identifier):
        return self.fetch_resource('members/{0}'.format(identifier))

    def get_member_image_by_identifier(self, identifier):
        """
        Return a (filename, content) tuple.
        """
        try:
            endpoint = self._endpoint(
                self.ENDPOINT_MEMBERS_IMAGE.format(identifier)
            )
            response = requests.get(
                endpoint,
                auth=self.auth,
                timeout=settings.DJCONNECTWISE_API_TIMEOUT,
            )
        except requests.RequestException as e:
            logger.error('Request failed: GET {}: {}'.format(endpoint, e))
            raise ConnectWiseAPIError('{}'.format(e))

        if 200 <= response.status_code < 300:
            headers = response.headers
            content_disposition_header = headers.get('Content-Disposition',
                                                     default='')
            msg = "Got member '{}' image; size {} bytes " \
                "and content-disposition header '{}'"

            logger.info(msg.format(
                identifier,
                len(response.content),
                content_disposition_header
            ))
            attachment_filename = self._attachment_filename(
                content_disposition_header)
            return attachment_filename, response.content
        else:
            self._log_failed(response)
            return None, None

    def _attachment_filename(self, content_disposition):
        """
        Return the attachment filename from the content disposition header.

        If there's no match, return None.
        """
        m = CONTENT_DISPOSITION_RE.match(content_disposition)
        return m.group(1) if m else None


class CompanyAPIClient(ConnectWiseAPIClient):
    API = 'company'
    ENDPOINT_COMPANIES = 'companies'

    def by_id(self, id):
        endpoint_url = '{}/{}'.format(self.ENDPOINT_COMPANIES,
                                      id)
        return self.fetch_resource(endpoint_url)

    def get(self):
        return self.fetch_resource(self.ENDPOINT_COMPANIES)


class ServiceAPIClient(ConnectWiseAPIClient):
    API = 'service'
    ENDPOINT_BOARDS = 'boards'
    ENDPOINT_PRIORITIES = 'priorities'
    ENDPOINT_LOCATIONS = 'locations'

    def __init__(self, *args, **kwargs):
        self.extra_conditions = None
        if 'extra_conditions' in kwargs:
            self.extra_conditions = kwargs.pop('extra_conditions')

        super(ServiceAPIClient, self).__init__(*args, **kwargs)

    def get_conditions(self):
        default_conditions = settings.DJCONNECTWISE_DEFAULT_TICKET_CONDITIONS

        condition_list = [c for c in [
            default_conditions, self.extra_conditions] if c]
        conditions = ''

        for condition in condition_list:
            condition = '({})'.format(condition)
            if conditions:
                condition = ' AND {}'.format(condition)
            conditions += condition
        return conditions

    def tickets_count(self):
        params = dict(
            conditions=self.get_conditions(),
        )
        return self.fetch_resource('tickets/count', params).get('count', 0)

    def get_ticket(self, ticket_id):
        endpoint_url = 'tickets/{}'.format(ticket_id)
        return self.fetch_resource(endpoint_url)

    def get_tickets(self, page=0,
                    page_size=settings.DJCONNECTWISE_API_BATCH_LIMIT):
        params = dict(
            page=page,
            pageSize=page_size,
            conditions=self.get_conditions()
        )

        return self.fetch_resource('tickets', params=params)

    def update_ticket(self, ticket):
        try:
            endpoint = self._endpoint('tickets/{}'.format(ticket['id']))
            response = requests.put(
                endpoint,
                params=dict(id=ticket['id'], body=ticket),
                json=ticket,
                auth=self.auth,
                timeout=settings.DJCONNECTWISE_API_TIMEOUT,
            )
            return response
        except requests.RequestException as e:
            logger.error('Request failed: PUT {}: {}'.format(endpoint, e))
            raise ConnectWiseAPIError('{}'.format(e))

    def get_statuses(self, board_id):
        """
        Returns the status types associated with the specified board.
        """
        endpoint_url = 'boards/{}/statuses'.format(board_id)

        return self.fetch_resource(endpoint_url)

    def get_boards(self):
        return self.fetch_resource(self.ENDPOINT_BOARDS)

    def get_board(self, board_id):
        return self.fetch_resource('boards/{}'.format(board_id))

    def get_priorities(self):
        return self.fetch_resource(self.ENDPOINT_PRIORITIES)

    def get_teams(self, board_id):
        endpoint = '{}/{}/teams/'.format(self.ENDPOINT_BOARDS, board_id)
        return self.fetch_resource(endpoint)

    def get_locations(self):
        return self.fetch_resource(self.ENDPOINT_LOCATIONS)
