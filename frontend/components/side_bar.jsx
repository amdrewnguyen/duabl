import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProjects } from '../actions/project_actions';

const mapStateToProps = (state) => (
  {
    projects: Object.values(state.entities.projects),
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchProjects: () => dispatch(fetchProjects()),
  }
);

class SideBar extends React.Component {
  componentDidMount() {
    console.log("I've mounted.");
    this.props.fetchProjects();
  }

  render() {
    const { projects, loggedIn } = this.props;
    const projectElems = projects.map(
      (project) => (
        <li key={project.id}>
          <Link to={`/${project.id}/list`}>{project.name}</Link>
        </li>
      )
    );
    return loggedIn ? (
      <div className="side-bar">
        <h1>duabl</h1>
        <ul className="project-list">
          <li>PROJECTS</li>
          {projectElems}
        </ul>
      </div>
    ) : (
      <div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
