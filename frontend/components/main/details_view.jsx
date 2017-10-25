import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class DetailsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="details-view">
          Task id: {this.props.match.params.taskId}
        </div>
    );
  }
}

export default DetailsView;
