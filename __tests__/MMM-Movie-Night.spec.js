describe('MMM-Movie-Night', () => {
  beforeAll(() => {
    require('../__mocks__/Module');
    require('../__mocks__/globalLogger');
  });

  const name = 'MMM-Movie-Night';

  let MMMMovieNight;

  beforeEach(() => {
    jest.resetModules();
    require('../MMM-Movie-Night');

    MMMMovieNight = global.Module.create(name);
    MMMMovieNight.setData({ name, identifier: `Module_1_${name}` });
  });

  it('requires expected version', () => {
    expect(MMMMovieNight.requiresVersion).toBe('2.2.0');
  });

  describe('defaults', () => {
    test('updateInterval', () => {
      expect(MMMMovieNight.defaults.updateInterval).toBe(60000);
    });
  });

  it('inits module in loading state', () => {
    expect(MMMMovieNight.loading).toBe(true);
  });

  describe('start', () => {
    const originalInterval = setInterval;
    const configObject = {};

    beforeEach(() => {
      MMMMovieNight.setConfig(configObject);
      global.setInterval = jest.fn();
    });

    afterEach(() => {
      global.setInterval = originalInterval;
    });

    test('logs start of module', () => {
      MMMMovieNight.start();

      expect(global.Log.info).toHaveBeenCalledWith('Starting module: MMM-Movie-Night');
    });

    test('requests data from node_helper with config variables', () => {
      MMMMovieNight.start();

      expect(MMMMovieNight.sendSocketNotification)
        .toHaveBeenCalledWith('MMM-Movie-Night-FETCH');
    });

    test('interval requests data from node_helper', () => {
      MMMMovieNight.start();
      global.setInterval.mock.calls[0][0]();

      expect(MMMMovieNight.sendSocketNotification).toHaveBeenCalledTimes(2);
      expect(MMMMovieNight.sendSocketNotification)
        .toHaveBeenCalledWith('MMM-Movie-Night-FETCH');
    });

    test('interval set starts with default value', () => {
      MMMMovieNight.setConfig({ updateInterval: 100000 });
      MMMMovieNight.start();

      expect(global.setInterval)
        .toHaveBeenCalledWith(expect.any(Function), 100000);
    });
  });

  describe('getTemplate', () => {
    it('returns template path', () => {
      expect(MMMMovieNight.getTemplate()).toBe('templates/MMM-Movie-Night.njk');
    });
  });

  describe('getTemplateData', () => {
    it('returns information needed by template', () => {
      MMMMovieNight.data.aqi = 179;

      expect(MMMMovieNight.getTemplateData()).toEqual({});
    });
  });

  describe('getStyles', () => {
    describe('default', () => {
      it('returns styles path', () => {
        expect(MMMMovieNight.getStyles()).toEqual([
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
        MMMMovieNight.socketNotificationReceived('MMM-Movie-Night-DATA', payload);

        expect(MMMMovieNight.loading).toBe(false);
      });

      it('updates dom', () => {
        MMMMovieNight.socketNotificationReceived('MMM-Movie-Night-DATA', payload);

        expect(MMMMovieNight.updateDom).toHaveBeenCalled();
      });
    });

    describe('notification is not MMM-Movie-Night-DATA', () => {
      it('does not set data', () => {
        MMMMovieNight.socketNotificationReceived('NOT-MMM-Movie-Night-DATA', payload);

        expect(MMMMovieNight.data.aqi).toEqual(undefined);
      });
    });
  });
});
