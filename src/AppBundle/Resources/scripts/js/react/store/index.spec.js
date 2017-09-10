import configureStore from './index';

jest.mock('redux');
jest.mock('redux-thunk', () => 'thunk');
jest.mock('reducers', () => 'reducers');

describe('store index', () => {
  it('return the configured store', () => {
    // Mocked modules
    // eslint-disable-next-line global-require
    const redux = require('redux');

    const state = { data: 'initial state' };

    redux.createStore.mockImplementationOnce(() => 'created store');
    redux.applyMiddleware.mockImplementationOnce(() => 'appliedMiddleware');

    const store = configureStore(state);

    expect(store).toEqual('created store');
    expect(redux.applyMiddleware).toBeCalledWith('thunk');
    expect(redux.createStore).toBeCalledWith(
      'reducers',
      state,
      'appliedMiddleware'
    );
  });
});
