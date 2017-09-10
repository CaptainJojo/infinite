import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import Button from './Button.jsx';

describe('Button container', () => {
  it('render correctly', () => {
    const data = {
      text: 'The text to display',
    };
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
    };

    const tree = renderer.create(<Button store={store} {...data} />);

    // Test that onClick doest not throw error when fallback to default
    tree.toJSON().props.onClick();

    expect(tree).toMatchSnapshot();
  });

  it('default to empty text', () => {
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
    };
    const tree = renderer.create(<Button store={store} />);

    expect(tree).toMatchSnapshot();
  });

  it('dispatch onclick event', () => {
    const callback = jest.fn();
    const data = {
      onClick: callback,
      text: 'The text to display',
    };
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
    };

    const tree = renderer.create(<Button store={store} {...data} />).toJSON();

    tree.props.onClick();

    expect(callback).toBeCalled();
  });
});
