import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import actions from 'actions';

class LatestNewsHome extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>COUCOU</div>
    );
  }
}

LatestNewsHome.propTypes = {
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(LatestNewsHome);
