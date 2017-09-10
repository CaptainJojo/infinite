import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import LatestNewsHome from 'containers/LatestNewsHome.jsx';
import configureStore from 'store';

const elements = {
  latest_news: document.getElementById('react-latest-news-home'),
};

// eslint-disable-next-line no-underscore-dangle
const store = configureStore(window.__INITIAL_STATE__);

const component = (
  <Provider store={store}>
    <LatestNewsHome />
  </Provider>
);

render(component, elements.latest_news);
