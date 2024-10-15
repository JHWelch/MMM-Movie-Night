beforeAll(() => {
  require('../__mocks__/logger');
  require('../__mocks__/node-fetch');
});

describe('node_helper', () => {
  let helper;
  // let Log;
  // let fetch;

  beforeEach(() => {
    helper = require('../node_helper');
    // Log = require('logger');
    // fetch = require('node-fetch');

    helper.setName('MMM-Movie-Night');
  });

  describe('socketNotificationReceived', () => {
    it('does stuff', () => {
      expect(true).toBe(true);
    });
  });
});
