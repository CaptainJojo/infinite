import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import actions from 'actions';
import ThreadSection from 'components/Organisms/ThreadSection.jsx';

const REFRESH_INTERVAL = 60; // One minute

class LatestNewsHome extends Component {
  constructor() {
    super();

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.latestNews.fetch());
  }

  onButtonClick(event) {
    this.props.dispatch(actions.latestNews.prefetch());
  }

  render() {
    const filtered = this.props.latestNews
      .filter((article) => article.visible === undefined || article.visible);

    return (
      <ThreadSection
      articles={filtered}
      more={!this.props.isFetching}
      onButtonClick={this.onButtonClick}
      />
    );
  }
}

LatestNewsHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  latestNews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.latestNews.isFetching,
  latestNews: state.latestNews.data,
});

export default connect(mapStateToProps)(LatestNewsHome);
