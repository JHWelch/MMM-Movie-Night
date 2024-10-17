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

    console.log(payload);

    expect(template).toContain(week.theme);
  });
});

describe('loading', () => {
  it('shows loading', () => {
    const payload = { loading: true };
    const template = nunjucks.render('MMM-Movie-Night.njk', payload);

    expect(template).toContain('LOADING');
  });
});
