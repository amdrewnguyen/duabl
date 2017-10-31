import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

class ProjectsSection extends React.Component {
  handleClick(projectId) {
    return (e) => {
      this.props.history.push(`/${projectId}/list`);
    };
  }

  render() {
    const { projects, loggedIn, selectedProjId } = this.props;
    const projectElems = projects.map(
      (project) => (
        <li onClick={this.handleClick(project.id)} key={project.id} className={parseInt(selectedProjId) === project.id ? "selected-proj" : "not-selected-proj"}>
          <Link to={`/${project.id}/list`}>{project.name}</Link>
          <FontAwesome onClick={() => {
              this.props.openEditModal(project.id);
            }} name="pencil" aria-hidden="true" />
        </li>
      )
    );
    return (
      <div className="side-bar">
        <ul className="project-list">
          <li key={-1}>
            PROJECTS
            <a onClick={this.props.openCreateProjectModal}>( + )</a>
          </li>
          {projectElems}
        </ul>
      </div>
    );
  }
}

export default ProjectsSection;
