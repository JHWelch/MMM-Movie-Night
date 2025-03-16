const { event } = require('../fixtures/event');

nunjucks = require('../../__mocks__/nunjucks');

translate = (str) => str;

describe('content loaded', () => {
  const payload = {
    ...event,
    loading: false,
  };

  it('shows the theme', () => {
    const template = nunjucks.render('MMM-Movie-Night.njk', payload);

    expect(template).toContain(event.theme);
  });

  it('shows the theme', () => {
    const template = nunjucks.render('MMM-Movie-Night.njk', payload);

    payload.movies.forEach((movie) => {
      expect(template).toContain(movie.title);
    });
  });
});

describe('loading', () => {
  it('shows loading', () => {
    const payload = { loading: true };
    const template = nunjucks.render('MMM-Movie-Night.njk', payload);

    expect(template).toContain('LOADING');
  });
});
