import * as actions from './latest_news';

describe('latest news actions', () => {
  it('exports actions constants', () => {
    expect(actions.ERROR).toBe('latest_news/ERROR');
    expect(actions.FETCH).toBe('latest_news/FETCH');
    expect(actions.RECEIVE).toBe('latest_news/RECEIVE');
  });

  describe('FETCH action', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    afterEach(() => {
      dispatch.mockClear();
    });

    it('dispatch the FETCH action', (done) => {
      getState.mockImplementationOnce(() => ({
        latestNews: {
          limit: 10,
          lastItemDate: 123,
          firstItemDate: 345,
        },
      }));

      const response = {
        json: jest.fn(() => {}),
        ok: true,
      };

      window.fetch = jest.fn(() => Promise.resolve(response));

      actions.fetch()(dispatch, getState)
        .then(() => {
          expect(dispatch).toBeCalledWith({
            limit: 10,
            lastItemDate: 123,
            type: actions.FETCH,
          });

          done();
        });
    });

    it('fire the ERROR action on fetch error', (done) => {
      getState.mockImplementationOnce(() => ({
        latestNews: {
          limit: 10,
          lastItemDate: 123,
          firstItemDate: 345,
        },
      }));

      window.fetch = jest.fn(() => Promise.resolve({ ok: false }));

      return actions.fetch()(dispatch, getState)
        .then(() => {
          expect(window.fetch).toBeCalledWith(
            '/app_dev.php/ws?last_item_date=123&limit=10',
            { credentials: 'same-origin' }
          );

          expect(dispatch.mock.calls[0]).toEqual([{
            limit: 10,
            lastItemDate: 123,
            type: actions.FETCH,
          }]);
          expect(dispatch.mock.calls[1]).toEqual([{
            type: actions.ERROR,
          }]);
          done();
        });
    });

    it('does nothing when is still fetching', (done) => {
      getState.mockImplementationOnce(() => ({
        latestNews: {
          limit: 10,
          lastItemDate: 123,
          firstItemDate: 345,
          isFetching: true,
        },
      }));

      window.fetch = jest.fn(() => Promise.resolve({ ok: false }));

      return actions.fetch()(dispatch, getState)
        .then(() => {
          expect(window.fetch).not.toBeCalled();
          expect(dispatch).not.toBeCalled();
          done();
        });
    });

    it('fire the action on home', (done) => {
      const response = {
        ok: true,
        json: jest.fn(() => ([{ foo: 'bar' }])),
      };

      getState.mockImplementationOnce(() => ({
        latestNews: {
          limit: 10,
          lastItemDate: 123,
          firstItemDate: 345,
        },
      }));

      window.fetch = jest.fn(() => Promise.resolve(response));

      actions.fetch()(dispatch, getState)
        .then(() => {
          expect(window.fetch).toBeCalledWith(
            '/app_dev.php/ws?last_item_date=123&limit=10',
            { credentials: 'same-origin' }
          );

          expect(dispatch.mock.calls[0]).toEqual([{
            limit: 10,
            lastItemDate: 123,
            type: actions.FETCH,
          }]);
          expect(dispatch.mock.calls[1]).toEqual([{
            data: [{ foo: 'bar' }],
            type: actions.RECEIVE,
          }]);

          done();
        });
    });

    it('fire the action on section home', (done) => {
      const response = {
        ok: true,
        json: jest.fn(() => ([{ foo: 'bar' }])),
      };

      getState.mockImplementationOnce(() => ({
        latestNews: {
          limit: 10,
          lastItemDate: 123,
          section: 'foobar',
        },
      }));

      window.fetch = jest.fn(() => Promise.resolve(response));

      actions.fetch()(dispatch, getState)
        .then(() => {
          expect(window.fetch).toBeCalledWith(
            '/app_dev.php/ws?last_item_date=123&limit=10',
            { credentials: 'same-origin' }
          );

          expect(dispatch.mock.calls[0]).toEqual([{
            limit: 10,
            lastItemDate: 123,
            type: actions.FETCH,
          }]);
          expect(dispatch.mock.calls[1]).toEqual([{
            data: [{ foo: 'bar' }],
            type: actions.RECEIVE,
          }]);

          done();
        });
    });
  });

  describe('PREFETCH action', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    afterEach(() => {
      dispatch.mockClear();
    });

    it('dispatch the SHOW action', (done) => {
      getState.mockImplementationOnce(() => ({
        latestNews: {},
      }));

      const response = {
        json: jest.fn(() => {}),
        ok: true,
      };

      window.fetch = jest.fn(() => Promise.resolve(response));

      return actions.prefetch()(dispatch, getState)
        .then(() => {
          expect(dispatch).toBeCalledWith({
            type: actions.SHOW,
          });

          done();
        });
    });

    it('fire the FETCH action', (done) => {
      const response = {
        ok: true,
        json: jest.fn(() => ([{ foo: 'bar' }])),
      };

      getState.mockImplementationOnce(() => ({
        latestNews: {
          limit: 10,
          lastItemDate: 123,
          firstItemDate: 345,
        },
      }));

      window.fetch = jest.fn(() => Promise.resolve(response));

      return actions.prefetch()(dispatch, getState)
        .then(() => {
          expect(window.fetch).toBeCalledWith(
            '/app_dev.php/ws?last_item_date=123&limit=10',
            { credentials: 'same-origin' }
          );

          expect(dispatch.mock.calls[1]).toEqual([{
            limit: 10,
            lastItemDate: 123,
            type: actions.FETCH,
          }]);
          expect(dispatch.mock.calls[2]).toEqual([{
            data: [{ foo: 'bar' }],
            type: actions.RECEIVE,
          }]);

          done();
        });
    });
  });

});
