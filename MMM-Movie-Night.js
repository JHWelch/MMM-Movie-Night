/* global Module */

/* Magic Mirror
 * Module: MMM-Movie-Night
 *
 * By Jordan Welch
 * MIT Licensed.
 */

Module.register('MMM-Movie-Night', {
  defaults: {
    updateInterval: 60000,
  },

  requiresVersion: '2.2.0',

  loading: true,

  start() {
    Log.info(`Starting module: ${this.name}`);
    const self = this;

    this.getData();

    setInterval(() => {
      self.getData();
    }, this.config.updateInterval);
  },

  getData() {
    this.sendSocketNotification('MMM-Movie-Night-FETCH');
  },

  getTemplate() {
    return 'templates/MMM-Movie-Night.njk';
  },

  getTemplateData() {
    return {};
  },

  getScripts() {
    return [];
  },

  getStyles() {
    return [
      'font-awesome.css',
      'MMM-Movie-Night.css',
    ];
  },

  getTranslations() {
    return {
      en: 'translations/en.json',
      es: 'translations/es.json',
    };
  },

  socketNotificationReceived(notification, payload) {
    if (notification !== 'MMM-Movie-Night-DATA') {
      return;
    }

    this.loading = false;
    this.updateDom(300);
  },
});
