import * as actions from 'actions/latest_news';
import reducer from './latest_news';

describe('latest news reducer', () => {
  it('fallback to default state', () => {
    expect(reducer(undefined, { type: 'undefined' })).toEqual({});
  });

  it('return current state if action unhandled', () => {
    const state = {
      data: [],
      limit: 10,
      lastItemDate: 123,
    };

    expect(reducer(state, { type: 'undefined' })).toEqual(state);
  });

  describe('on FETCH action', () => {
    it('update the publication date parameter in state', () => {
      const state = {
        data: [],
        lastItemDate: 123,
        limit: 10,
      };
      const action = {
        limit: 10,
        lastItemDate: 456,
        type: actions.FETCH,
      };

      expect(reducer(state, action))
        .toEqual({
          data: [],
          limit: 10,
          lastItemDate: 456,
          isFetching: true,
        });
    });
  });

  describe('on RECEIVE action', () => {
    it('concat the data to the current state', () => {
      const state = {
        data: [{ foo: 'baz' }],
        limit: 10,
        lastItemDate: 123,
      };
      const action = {
        data: [{ foo: 'bar' }],
        type: actions.RECEIVE,
      };

      expect(reducer(state, action))
        .toEqual({
          data: [
            { foo: 'baz' },
            { foo: 'bar', visible: false },
          ],
          limit: 10,
          lastItemDate: 123,
          isFetching: false,
        });
    });
  });

  describe('on SHOW action', () => {
    it('display hidden article', () => {
      const state = {
        data: [
          { foo: 'baz', createdAt: '1477494316' },
          { foo: 'bax', createdAt: '1477494316', visible: false },
          { foo: 'bay', createdAt: '1477494316', visible: false },
        ],
        limit: 10,
        lastItemDate: 123,
      };
      const action = {
        type: actions.SHOW,
      };

      expect(reducer(state, action))
        .toEqual({
          data: [
            { foo: 'baz', createdAt: '1477494316' },
            { foo: 'bax', createdAt: '1477494316', visible: true },
            { foo: 'bay', createdAt: '1477494316', visible: true },
          ],
          limit: 10,
          lastItemDate: '1477494316',
        });
    });
  });
});
