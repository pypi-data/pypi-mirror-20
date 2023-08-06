import datetime
import logging

import requests


logger = logging.getLogger(__name__)


class Trackobot:
    def __init__(self, username, password):
        logger.info('Creating Trackobot instance')
        self._url = 'https://trackobot.com'
        endpoint = '/sessions'
        logger.debug('POST on %s', endpoint)
        r = requests.post(self._url+endpoint, data={'username': username, 'password': password})
        r.raise_for_status()
        if 'Invalid credentials' in r.text:
            logger.error('Invalid credentials supplied')
            raise ValueError('Incorrect username or password. API token is not supported.')
        self._username = username
        self._password = password
        self._auth = requests.auth.HTTPBasicAuth(username, password)

    @staticmethod
    def create_user() -> dict:
        """
        Create a new username and password in Trackobot.
        Returns JSON of the format {'username': 'newuser', 'password': 'password}

        :return: Dictionary of new user data
        :raises: requests.exceptions.HTTPError on error
        """
        logger.info('Called create_user()')
        endpoint = '/users.json'
        url = 'https://trackobot.com' + endpoint
        logger.debug('POST on %s', endpoint)
        r = requests.post(url)
        r.raise_for_status()
        return r.json()

    def rename_user(self, name: str):
        """
        Rename your user to something else.

        :param str name: The new display name
        :return: None
        """
        logger.info('Called rename_user()')
        logger.debug('GET on /profile to get user\'s ID')
        r = requests.get('https://trackobot.com/profile', auth=self._auth)
        user_id = r.text.split('edit_user_',1)[1].split('"')[0]
        logger.debug('User ID is %s', user_id)
        endpoint = '/users/{}/rename'.format(user_id)
        url = self._url + endpoint
        data = {'_method': 'patch', 'user[displayname]': name}
        logger.debug('POST on %s', endpoint)
        r = requests.post(url, auth=self._auth, data=data)
        r.raise_for_status()

    def one_time_auth(self) -> str:
        """
        Generate a one-time URL for opening your profile

        :return: Profile URL
        :rtype: str
        :raises: requests.exceptions.HTTPError on error
        """
        logger.info('Called one_time_auth()')
        endpoint = '/one_time_auth.json'
        url = self._url + endpoint
        logger.debug('POST on %s', endpoint)
        r = requests.post(url, auth=self._auth)
        r.raise_for_status()
        return r.json()['url'] if 'error' not in r.json() else r.json()['error']

    def modify_metadata(self, game_id: int, param: str, value: str) -> bool:
        """
        Modify the metadata of a specified game.
        Possible parameters that can be changed are: added, mode, win,
        hero, opponent, coin, duration, rank, legend, deck_id,
        opponent_deck_id, note.
        It is up to the user to know the correct possible values for each
        of these parameters.

        :param int game_id: The ID of the game to be modified
        :param str param: The name of the parameter to be modified
        :param str value: The new value for the parameter
        :return: True if successfully changed, False otherwise
        :rtype: bool
        :raises: ValueError
        """
        logger.info('Called modify_metadata()')
        allowed_params = ['added', 'mode', 'win', 'hero', 'opponenet',
                          'coin', 'duration', 'rank', 'legend', 'deck_id',
                          'opponent_deck_id', 'note']
        if param not in allowed_params:
            logger.error('Parameter %s is not an approved value', param)
            raise ValueError('param must be one of ' + ', '.join(allowed_params))
        endpoint = '/profile/results/'
        url = self._url + endpoint + str(game_id)
        data = {param: value}
        logger.debug('PUT on %s', endpoint)
        r = requests.put(url, auth=self._auth, json=data)
        if r.status_code == 204:
            logger.info('Modify succeeded')
            return True
        else:
            logger.info('Modify failed')
            return False

    def stats(self, stats_type: str='decks', time_range: str='all', mode: str='all',
              start: datetime.datetime=None, end: datetime.datetime=None,
              as_hero: str=None, vs_hero: str=None, as_deck: int=None, vs_deck: int=None) -> dict:
        """
        Get the user's statistics by deck, class, or for arena.
        This will return a dictionary with statistics associated with
        the requested type. You can specify a time range to search under
        as well as what modes to get stats for.

        :param str stats_type: The type of stats you want to see. One of decks, classes, arena
        :param str time_range: A time range to get stats for. One of current_month, all, last_3_days, last_24_hours, custom
        :param str mode: The game mode to get stats for. One of ranked, arena, casual, friendly, all
        :param datetime.datetime start: If using "custom" for time_range, a starting datetime.datetime date
        :param datetime.datetime end: If using "custom" for time_range, an ending datetime.datetime date
        :param str as_hero: If getting by class, only get stats for playing as the specified hero
        :param str vs_hero: If getting by class, only get stats for playing against the specified hero
        :param int as_deck: If getting by deck, only get stats for playing as the specified deck. Get the deck id from a call to decks()
        :param int vs_deck: If getting by deck, only get stats for playing against the specified deck. Get the deck id from a call to decks()
        :return: Dictionary of stats
        :rtype: dict
        :raises: requests.exceptions.HTTPError on error
        :raises: ValueError
        :raises: TypeError
        """
        logger.info('Called stats()')
        allowed_endpoints = ['classes', 'decks', 'arena']
        allowed_range = ['current_month', 'all', 'last_3_days', 'last_24_hours', 'custom']
        allowed_modes = ['ranked', 'arena', 'casual', 'friendly', 'all']
        if stats_type not in allowed_endpoints:
            logger.error('%s is not an allowed stats_type', stats_type)
            raise ValueError('stats_type must be one of ' + ', '.join(allowed_endpoints))
        if time_range not in allowed_range:
            logger.error('%s is not an allowed time_range', time_range)
            raise ValueError('time_range must be one of ' + ', '.join(allowed_range))
        if mode not in allowed_modes:
            logger.error('%s is not an allowed mode', mode)
            raise ValueError('mode must be one of ' + ', '.join(allowed_modes))
        if time_range == 'custom' and \
            (start is None or end is None or type(start) != datetime.datetime or type(end) != datetime.datetime):
            logger.error('start and end must be of type datetime.datetime when using custom time_range')
            raise TypeError('If using "custom" mode then you must specify a datetime.datetime for start and end')
        endpoint = '/profile/stats/{}.json'.format(stats_type)
        params = {'mode': mode, 'time_range': time_range}
        if 'custom' == time_range:
            params.update({'start': start.strftime('%Y-%m-%d'), 'end': start.strftime('%Y-%m-%d')})
        if stats_type == 'decks':
            params.update({'as_deck': as_deck, 'vs_deck': vs_deck})
        elif stats_type == 'classes':
            params.update({'as_hero': as_hero, 'vs_hero': vs_hero})
        url = self._url + endpoint
        logger.debug('GET on %s', endpoint)
        r = requests.get(url, auth=self._auth, params=params)
        r.raise_for_status()
        return r.json()

    def decks(self) -> dict:
        """
        Get the deck archetypes supported by Track-o-bot.

        :return: Dictionary listing each archetype by class
        :rtype: dict
        :raises: requests.exceptions.HTTPError on error
        """
        logger.info('Called decks()')
        endpoint = '/profile/settings/decks.json'
        url = self._url + endpoint
        logger.debug('GET on %s', endpoint)
        r = requests.get(url, auth=self._auth)
        r.raise_for_status()
        return r.json()

    def reset(self, modes: list=None):
        """
        Reset the user's account data for the specified game modes.
        Supported modes values are "ranked", "casual", "practice",
        "arena", and "friendly".

        :param list modes: A list of the modes to reset
        :return: None
        :raises: requests.exceptions.HTTPError on error
        :raises: ValueError
        """
        logger.info('Called reset()')
        allowed = ['ranked', 'casual', 'practice', 'arena', 'friendly']
        if modes is None:
            modes = allowed
        if any(mode not in allowed for mode in modes):
            logger.error('Invalid mode(s) given')
            raise ValueError('modes list can only contain ' + ', '.join(allowed))
        endpoint = '/profile/settings/account/reset'
        url = self._url + endpoint
        data = {'reset_modes[]': modes}
        logger.debug('POST on %s', endpoint)
        r = requests.post(url, auth=self._auth, data=data)
        r.raise_for_status()

    def history(self, page: int=1, query: str=None) -> dict:
        """
        Get game history for the user by page.
        Each page contains 15 games.
        Returns JSON as a dictionary representing each game.
        Note that this will include arena matches.

        :param int page: The page number
        :param str query: A query string to narrow results
        :return: Dictionary of game data
        :rtype: dict
        :raises: requests.exceptions.HTTPError on error
        """
        logger.info('Called history()')
        endpoint = '/profile.json' 
        url = self._url + endpoint
        params = {'page': page}
        if query is not None:
            params['query'] = query
        logger.debug('GET on %s', endpoint)
        r = requests.get(url, auth=self._auth, params=params)
        r.raise_for_status()
        return r.json()

    def arena_history(self, page: int=1) -> dict:
        """
        Get arena game history for the user by page.
        Returns JSON as a dictionary representing each game.

        :param int page: The page number
        :return: Dictionary of game data
        :rtype: dict
        :raises: requests.exceptions.HTTPError on error
        """
        logger.info('Called arena_history()')
        endpoint = '/profile/arena.json' 
        url = self._url + endpoint
        params = {'page': page}
        logger.debug('GET on %s', endpoint)
        r = requests.get(url, auth=self._auth, params=params)
        r.raise_for_status()
        return r.json()

    def toggle_tracking(self, enabled: bool=True):
        """
        Enable or disable automatic deck tracking

        :param bool enabled: If True, tracking is enabled, else it is disabled
        :return None:
        :raises: requests.exceptions.HTTPError on error
        """
        logger.info('Called toggle_tracking()')
        endpoint = '/profile/settings/decks/toggle'
        url = self._url + endpoint
        val = 'true' if enabled else 'false'
        data = {'user[deck_tracking]': val, '_method': 'put'}
        logger.debug('POST on %s', endpoint)
        r = requests.post(url, auth=self._auth, data=data)
        r.raise_for_status()

    def delete_game(self, game_id: int):
        """
        Delete the specified game from Trackobot.

        :param int game_id: The ID of the game to delete
        :return: None
        """
        logger.info('Called delete_game()')
        endpoint = '/profile/results/' + str(game_id)
        url = self._url + endpoint
        logger.debug('DELETE on %s', endpoint)
        r = requests.delete(url, auth=self._auth)
        r.raise_for_status()

    def upload_game(self, game_data: dict) -> dict:
        """
        Upload a new game's data to Trackobot.
        This method assumes you have properly formatted your
        game data dictionary.
        For instructions on how to do so, please follow the guide
        here: https://gist.github.com/stevschmid/120adcbc5f1f7cb31bc5

        :param dict game_data: The metadata and card data for the new game
        :return: JSON dictionary of the newly created game
        :rtype: dict
        :raises: requests.exceptions.HTTPError on error
        """
        logger.info('Called upload_game()')
        endpoint = '/profile/results.json'
        url = self._url + endpoint
        logger.debug('POST on %s', endpoint)
        r = requests.post(url, auth=self._auth, json=game_data)
        r.raise_for_status()
        return r.json()

