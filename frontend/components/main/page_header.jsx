import React from 'react';
import { Route, Link } from 'react-router-dom';

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header">
        <h2>{this.props.project ? this.props.project.name : ""}</h2>
      </div>
    );
  }
}

export default PageHeader;
