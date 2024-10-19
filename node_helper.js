/* Magic Mirror
 * Node Helper: MMM-Movie-Night
 *
 * By Jordan Welch
 * MIT Licensed.
 */

// const Log = require('logger');
const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  socketNotificationReceived (notification, _payload) {
    if (notification !== 'MMM-Movie-Night-FETCH') {
      return;
    }

    return this.getData();
  },

  async getData () {
    const response = await fetch(
      'https://movies.wowellworld.com/api/weeks?limit=1&posterWidth=w300',
      this.requestInit(),
    );

    const weeks = await response.json();

    this.sendSocketNotification('MMM-Movie-Night-DATA', { week: weeks[0] });
  },

  requestInit () {
    return {
      headers: { Accept: 'application/json' },
    };
  },
});
