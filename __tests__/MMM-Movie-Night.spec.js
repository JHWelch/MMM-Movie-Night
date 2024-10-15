 describe('MMM-Movie-Night', () => {
  beforeAll(() => {
    require('../__mocks__/Module');
    require('../__mocks__/globalLogger');
  });

  const name = 'MMM-Movie-Night';

  let MMMAQI;

  beforeEach(() => {
    jest.resetModules();
    require('../MMM-Movie-Night');

    MMMAQI = global.Module.create(name);
    MMMAQI.setData({ name, identifier: `Module_1_${name}` });
  });

  it('requires expected version', () => {
    expect(MMMAQI.requiresVersion).toBe('2.2.0');
  });

  describe('defaults', () => {
    test('updateInterval', () => {
      expect(MMMAQI.defaults.updateInterval).toBe(60000);
    });
  });

  it('inits module in loading state', () => {
    expect(MMMAQI.loading).toBe(true);
  });

  describe('start', () => {
    const originalInterval = setInterval;
    const configObject = {};

    beforeEach(() => {
      MMMAQI.setConfig(configObject);
      global.setInterval = jest.fn();
    });

    afterEach(() => {
      global.setInterval = originalInterval;
    });

    test('logs start of module', () => {
      MMMAQI.start();

      expect(global.Log.info).toHaveBeenCalledWith('Starting module: MMM-Movie-Night');
    });

    test('requests data from node_helper with config variables', () => {
      MMMAQI.start();

      expect(MMMAQI.sendSocketNotification)
        .toHaveBeenCalledWith('MMM-Movie-Night-FETCH');
    });

    test('interval requests data from node_helper', () => {
      MMMAQI.start();
      global.setInterval.mock.calls[0][0]();

      expect(MMMAQI.sendSocketNotification).toHaveBeenCalledTimes(2);
      expect(MMMAQI.sendSocketNotification)
        .toHaveBeenCalledWith('MMM-Movie-Night-FETCH');
    });

    test('interval set starts with default value', () => {
      MMMAQI.setConfig({ updateInterval: 100000 });
      MMMAQI.start();

      expect(global.setInterval)
        .toHaveBeenCalledWith(expect.any(Function), 100000);
    });
  });

  describe('getTemplate', () => {
    it('returns template path', () => {
      expect(MMMAQI.getTemplate()).toBe('templates/MMM-Movie-Night.njk');
    });
  });

  describe('getTemplateData', () => {
    it('returns information needed by template', () => {
      MMMAQI.data.aqi = 179;

      expect(MMMAQI.getTemplateData()).toEqual({});
    });
  });

  describe('getStyles', () => {
    describe('default', () => {
      it('returns styles path', () => {
        expect(MMMAQI.getStyles()).toEqual([
          'font-awesome.css',
          'MMM-Movie-Night.css',
        ]);
      });
    });
  });

  describe('socketNotificationReceived', () => {
    const payload = { aqi: 179 };
    describe('notification is MMM-Movie-Night-DATA', () => {
      it('sets loading to false', () => {
        MMMAQI.socketNotificationReceived('MMM-Movie-Night-DATA', payload);

        expect(MMMAQI.loading).toBe(false);
      });

      it('updates dom', () => {
        MMMAQI.socketNotificationReceived('MMM-Movie-Night-DATA', payload);

        expect(MMMAQI.updateDom).toHaveBeenCalled();
      });
    });

    describe('notification is not MMM-Movie-Night-DATA', () => {
      it('does not set data', () => {
        MMMAQI.socketNotificationReceived('NOT-MMM-Movie-Night-DATA', payload);

        expect(MMMAQI.data.aqi).toEqual(undefined);
      });
    });
  });
});
