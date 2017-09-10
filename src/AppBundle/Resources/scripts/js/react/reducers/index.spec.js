import reducers from './index';

jest.mock('redux', () => ({
  combineReducers: jest.fn(() => 'combined'),
}));
jest.mock('./latest_news', () => ([]));

describe('reducers index', () => {
  it('combine reducers', () => {
    // Mocker Modules
    // eslint-disable-next-line global-require
    const redux = require('redux');

    expect(reducers).toEqual('combined');
    expect(redux.combineReducers).toBeCalledWith(
      {
        latestNews: [],
      }
    );
  });
});
