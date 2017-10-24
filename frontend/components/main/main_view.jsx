import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => (
  {

  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {

  }
);

class MainView extends React.Component {
  render() {
    return (
      <div className="main-view">
        <div className="task-list-view"></div>
        <div className="details-view"></div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainView)
);
