import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import ThreadSection from './ThreadSection.jsx';

describe('ThreadSection container', () => {
  const header = {
    text: 'Header text',
    tag: 'h1',
  };

  it('render correctly', () => {
    const articles = [
      {
        id: 42,
        publication_url: '/path/to/article/42',
        publish_date: '2016-08-31T12:54:52.956Z',
        content: {
          restricted: false,
          title: 'Article without type',
        },
      },
      {
        id: 42,
        publication_url: '/path/to/article/42',
        publish_date: '2016-08-31T12:54:52.956Z',
        content: {
          restricted: false,
          title: 'The article title',
        },
        type: 'article',
      },
      {
        id: 42,
        publication_url: '/path/to/alert/42',
        publish_date: '2016-08-31T12:54:52.956Z',
        content: {
          text: 'The article text',
          title: 'The article title',
        },
        type: 'alert',
      },
      {
        type: 'advert',
        id: 'my-advert-id',
      },
    ];
    const tree = renderer.create(
      <ThreadSection
        header={header}
        articles={articles}
        qaId="test-id"
      />
    );

    expect(tree).toMatchSnapshot();
  });

  describe('with more button', () => {
    it('render correctly', () => {
      const tree = renderer.create(
        <ThreadSection
          header={header}
          more
          qaId="test-id"
        />
      );

      expect(tree).toMatchSnapshot();
    });

    it('calls callback on button click', () => {
      const onButtonClick = jest.fn();
      const tree = renderer.create(
        <ThreadSection
          header={header}
          more
          onButtonClick={onButtonClick}
          qaId="test-id"
        />
      );

      const button = tree.toJSON().children[1].children[0];

      button.props.onClick();

      expect(onButtonClick).toBeCalled();
    });
  });
});
