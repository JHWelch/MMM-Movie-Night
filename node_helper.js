/* Magic Mirror
 * Node Helper: MMM-Movie-Night
 *
 * By Jordan Welch
 * MIT Licensed.
 */

// const Log = require('logger');
const fetch = require('node-fetch');
const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  socketNotificationReceived(notification, _payload) {
    if (notification !== 'MMM-Movie-Night-FETCH') {
      return;
    }
  },

  async getData(token, city) {
    const response = await fetch(
      `https://api.waqi.info/feed/${city}/?token=${token}`,
      this.requestInit(),
    );

    const { aqi } = (await response.json()).data;

    this.sendSocketNotification('MMM-Movie-Night-DATA', { aqi });
  },

  requestInit() {
    return {
      headers: { Accept: 'application/json' },
    };
  },
});
