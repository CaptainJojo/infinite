export const ERROR = 'latest_news/ERROR';
export const FETCH = 'latest_news/FETCH';
export const RECEIVE = 'latest_news/RECEIVE';
export const SHOW = 'latest_news/SHOW';

const error = () => ({
  type: ERROR,
});

const fetching = (lastItemDate, limit) => ({
  lastItemDate,
  limit,
  type: FETCH,
});

const receive = (news) => ({
  type: RECEIVE,
  data: news,
});

const show = () => ({
  type: SHOW,
});

/**
 * Fetch the data latest_news data
 *
 * @dispatch latest_news/FETCH
 * @dispatch latest_news/RECEIVE
 * @dispatch latest_news/ERROR
 */
export const fetch = () => (dispatch, getState) => {
  const { isFetching, lastItemDate, limit } = getState().latestNews;

  if (isFetching) {
    return Promise.resolve();
  }

  let url = `/app_dev.php/ws?last_item_date=${lastItemDate}&limit=${limit}`;

  dispatch(fetching(lastItemDate, limit));

  return window.fetch(url, { credentials: 'same-origin' })
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    })
    .then(json => dispatch(receive(json)))
    .catch(() => dispatch(error()));
};

/**
 * Prefetch the data latest_news data
 * And display the previously prefetched data
 *
 * @dispatch latest_news/ERROR
 * @dispatch latest_news/FETCH
 * @dispatch latest_news/RECEIVE
 * @dispatch latest_news/SHOW
 */
export const prefetch = () => (dispatch, getState) => {
  dispatch(show());

  return fetch()(dispatch, getState);
};

/**
 * Refresh the latest views to update their diff time
 */
export const refresh = () => ({
  type: REFRESH,
});
