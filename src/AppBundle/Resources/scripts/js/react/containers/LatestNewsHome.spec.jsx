import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
// eslint-disable-next-line import/no-extraneous-dependencies

import LatestNewsHome from './LatestNewsHome.jsx';

jest.mock('actions', () => ({
  latestNews: {
    fetch: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  },
}));

describe('LatestNews container', () => {
  const header = {
    text: 'L’info en continu',
    tag: 'h1',
  };

  it('render correctly', () => {
    // Mocker Modules
    // eslint-disable-next-line global-require
    const actions = require('actions');

    const latestNews = {
      data: [
        {
          id: 42,
          publication_url: '/path/to/article/42',
          publish_date: '2016-08-31T12:54:52.956Z',
          content: {
            restricted: false,
            title: 'Article without type',
            section: 'pixels',
          },
        },
        {
          id: 42,
          publication_url: '/path/to/article/42',
          publish_date: '2016-08-31T12:54:52.956Z',
          content: {
            restricted: false,
            title: 'The article invisible',
            section: 'mlemag',
          },
          type: 'article',
          visible: false,
        },
        {
          id: 42,
          publication_url: '/path/to/article/42',
          publish_date: '2016-08-31T12:54:52.956Z',
          content: {
            restricted: false,
            title: 'The article title',
            section: 'pixels',
          },
          type: 'article',
          visible: true,
        },
        {
          id: 42,
          publish_date: '2016-09-06T23:06:23.281Z',
          publication_url: '/path/to/article/42',
          content: {
            text: 'The article text',
            title: 'The article title',
          },
          type: 'alert',
          visible: true,
        },
      ],
      options: {
        header,
        gtmId: 'latest-news',
        qaId: 'latest-news',
      },
    };
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(() => ({ latestNews })),
      subscribe: jest.fn(),
    };

    actions.latestNews.fetch.mockImplementationOnce(() => ({
      data: 'fetch',
    }));
    actions.latestNews.prefetch.mockImplementationOnce(() => ({
      data: 'prefetch',
    }));

    const tree = renderer.create(<LatestNewsHome store={store} />);

    const button = tree.toJSON().children[1].children[0];
    // Simulate click on button
    button.props.onClick();

    expect(tree).toMatchSnapshot();

    expect(store.dispatch.mock.calls[0]).toEqual([
      { data: 'fetch' },
    ]);
    expect(store.dispatch.mock.calls[1]).toEqual([
      { data: 'prefetch' },
    ]);
  });

  it('hide the more button while fetching data', () => {
    const latestNews = {
      data: [],
      options: {
        header,
        gtmId: 'latest-news',
        qaId: 'latest-news',
      },
      isFetching: true,
    };

    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(() => ({ latestNews })),
      subscribe: jest.fn(),
    };
    const tree = renderer.create(<LatestNewsHome store={store} />);

    expect(tree).toMatchSnapshot();
  });
});
