const { week } = require('../fixtures/week');

nunjucks = require('../../__mocks__/nunjucks');

translate = (str) => str;

describe('content loaded', () => {
  const payload = {
    ...week,
    loading: false,
  };

  it('shows the theme', () => {
    const template = nunjucks.render('MMM-Movie-Night.njk', payload);

    expect(template).toContain(week.theme);
  });

  it('shows the theme', () => {
    const template = nunjucks.render('MMM-Movie-Night.njk', payload);

    payload.movies.forEach((movie) => {
      expect(template).toContain(movie.title);
      expect(template).toContain(movie.year.toString());
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
