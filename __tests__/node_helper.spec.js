const { default: fetchMock } = require('fetch-mock');
const week = require('./fixtures/week');

beforeAll(() => {
  require('../__mocks__/logger');
});

describe('node_helper', () => {
  let helper;

  beforeEach(() => {
    helper = require('../node_helper');

    helper.setName('MMM-Movie-Night');
  });

  describe('socketNotificationReceived', () => {
    describe('called with proper MMM-Movie-Night-FETCH', () => {
      beforeEach(() => {
        fetchMock.mock('https://movies.wowellworld.com/api/weeks?limit=1&posterWidth=w300', {
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
          .toBe('https://movies.wowellworld.com/api/weeks?limit=1&posterWidth=w300');
      });

      it('calls frontend with movie', async () => {
        await helper.socketNotificationReceived('MMM-Movie-Night-FETCH');

        expect(helper.sendSocketNotification)
          .toHaveBeenCalledWith('MMM-Movie-Night-DATA', {week});
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
