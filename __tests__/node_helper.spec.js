/* eslint-disable global-require */
beforeAll(() => {
  require('../__mocks__/logger');
  require('../__mocks__/node-fetch');
});

describe('node_helper', () => {
  let helper;
  let Log;
  let fetch;

  beforeEach(() => {
    helper = require('../node_helper');
    Log = require('logger'); // eslint-disable-line import/no-unresolved
    fetch = require('node-fetch'); // eslint-disable-line import/no-unresolved

    helper.setName('MMM-Movie-Night');
  });

  describe('socketNotificationReceived', () => {
    it('does stuff', () => {
      expect(true).toBe(true);
    });
  });
});
