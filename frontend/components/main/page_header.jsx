import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    project: state.entities.projects.items[ownProps.projectId],
  };
};

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, {project: props.project});
  }

  componentWillReceiveProps(newProps) {
    if (this.props.project !== newProps.project) {
      this.setState({project: newProps.project});
    }
  }

  render() {
    return (
      <div className="page-header">
        <h2 style={{"color": this.state.project ? this.state.project.color : "black"}}>
          {this.state.project ? this.state.project.name : ""}
        </h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(PageHeader);
