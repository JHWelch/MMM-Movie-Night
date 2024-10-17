const { default: fetchMock } = require('fetch-mock');

beforeAll(() => {
  require('../__mocks__/logger');
});

const week = {
  id: '10806885-b1b9-80bc-86a1-e97ba3f6ee79',
  weekId: '2024-10-17',
  theme: 'My First Horror Movie',
  date: 'Thursday, October 17',
  movies: [
    {
      title: 'Labyrinth',
      director: 'Jim Henson',
      year: 1986,
      length: 102,
      time: '6:00 PM',
      url: 'https://www.themoviedb.org/movie/13597',
      posterUrl: 'https://image.tmdb.org/t/p/w500/hbSdA1DmNA9IlfVoqJkIWYF2oYm.jpg',
      theaterName: '',
      showingUrl: null,
      isFieldTrip: false,
      displayLength: '1h 42m'
    },
    {
      title: 'Neverending Story',
      director: 'Wolfgang Petersen',
      year: 1984,
      length: 102,
      time: '8:00 PM',
      url: 'https://www.themoviedb.org/movie/34584',
      posterUrl: 'https://image.tmdb.org/t/p/w500/lWJC8om086h01f0CMGR9ombdpnI.jpg',
      theaterName: '',
      showingUrl: null,
      isFieldTrip: false,
      displayLength: '1h 42m'
    }
  ],
  slug: null,
  isSkipped: false,
  styledTheme: []
};

describe('node_helper', () => {
  let helper;

  beforeEach(() => {
    helper = require('../node_helper');

    helper.setName('MMM-Movie-Night');
  });

  describe('socketNotificationReceived', () => {
    describe('called with proper MMM-Movie-Night-FETCH', () => {
      beforeEach(() => {
        fetchMock.mock('https://movies.wowellworld.com/api/weeks?limit=1', {
          status: 200,
          body: JSON.stringify([week]),
        });
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('calls movie API', () => {
        helper.socketNotificationReceived('MMM-Movie-Night-FETCH');

        expect(fetchMock.calls(true)[0][0])
          .toBe('https://movies.wowellworld.com/api/weeks?limit=1');
      });

      it('calls frontend with movie', async () => {
        await helper.socketNotificationReceived('MMM-Movie-Night-FETCH');

        expect(helper.sendSocketNotification)
          .toHaveBeenCalledWith('MMM-Movie-Night-DATA', week);
      });
    });
  });

  describe('called with any other message', () => {
    it('does not call movie API', () => {
      helper.socketNotificationReceived('NOT-MMM-Movie-Night-FETCH');

      expect(fetchMock.calls()).toHaveLength(0);
    });

    it('does not call frontend with movie', () => {
      helper.socketNotificationReceived('NOT-MMM-Movie-Night-FETCH');

      expect(helper.sendSocketNotification).not.toHaveBeenCalled();
    });
  });
});
