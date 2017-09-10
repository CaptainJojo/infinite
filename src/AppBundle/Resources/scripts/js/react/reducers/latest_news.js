import actions from 'actions';

export default function latestNews(state = {}, action) {
  switch (action.type) {
    case actions.latestNews.FETCH:
      return Object.assign({}, state, {
        lastItemDate: action.lastItemDate,
        limit: action.limit,
        isFetching: true,
      });
    case actions.latestNews.RECEIVE:
      return Object.assign({}, state, {
        data: state.data.concat(
          action.data.map(
            (article) => Object.assign({}, article, { visible: false })
          )
        ),
        isFetching: false,
      });
    case actions.latestNews.SHOW:
      return Object.assign({}, state, {
        data: state.data.map(
          (article) => {
            if (article.visible === false) {
              return Object.assign({}, article, { visible: true });
            }

            return article;
          }
        ),

        // Items on the next page must be published prior to the last article on the current page.
        lastItemDate: (state.data.length === 0 ? 0 : state.data[state.data.length - 1].createdAt),
      });
    default:
      return state;
  }
}
