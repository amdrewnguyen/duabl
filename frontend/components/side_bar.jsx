import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => (
  {
    projects: Object.values(state.entities.projects),
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
  }
);

const mapDispatchToProps = dispatch => (
  {
  }
);

const SideBar = ({ projects, loggedIn }) => {
  const projectElems = projects.map(
    (project) => (
      <li>
        <Link to={`/${project.id}/list`}>{project.name}</Link>
      </li>
    )
  );
  return loggedIn ? (
    <div className="side-bar">
      <h1>duabl</h1>
      <ul className="project-list">
        <li>PROJECTS</li>
      </ul>
    </div>
  ) : (
    <div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
