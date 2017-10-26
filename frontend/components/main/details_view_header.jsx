import React from 'react';

import DoneToggle from '../widgets/done_toggle';

class DetailsHeader extends React.Component {
  render() {
    return (
      <div className="details-header">
        <DoneToggle task={this.props.task}/>
      </div>
    );
  }
}

export default DetailsHeader;
