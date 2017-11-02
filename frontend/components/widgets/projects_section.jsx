import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import enhanceWithClickOutside from 'react-click-outside';


import { getTeamProjects } from '../../util/selectors';
import { fetchTeams } from '../../actions/team_actions';
import { fetchProjects } from '../../actions/project_actions';
import ProjectDropdown from './project_dropdown';

const mapStateToProps = (state, ownProps) => {
  return {
    projects: getTeamProjects(state, ownProps.teamId),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTeams: () => dispatch(fetchTeams()),
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

class ProjectsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: props.projects,
      selectedProjId: props.selectedProjId,
      loggedIn: props.loggedIn,
    };
  }

  componentDidMount() {
    this.props.fetchTeams()
      .then(
        () => {
          this.props.fetchProjects()
            .then(
              () => this.setState({projects: this.props.projects})
            );
          }
        );
  }

  componentWillReceiveProps(newProps) {
    if (newProps.projects !== this.props.projects) {
      this.setState({projects: newProps.projects});
    }

    if (newProps.team !== this.props.team) {
      this.setState({projects: newProps.projects});
    }

    if (newProps.selectedProjId !== this.props.selectedProjId) {
      this.setState({selectedProjId: newProps.selectedProjId});
    }
  }

  handleClick(projectId) {
    return (e) => {
      e.stopPropagation();
      this.props.history.push(`/${projectId}/list`);
    };
  }

  render() {
    const { projects, loggedIn, selectedProjId } = this.state;
    if (projects) {
       const projectElems = projects.map(
        (project) => (
          <li onClick={this.handleClick(project.id)} key={project.id} className={parseInt(selectedProjId) === project.id ? "selected-proj" : "not-selected-proj"}>
            <Link to={`/${project.id}/list`}>{project.name}</Link>
            <ProjectDropdown openEditModal={this.props.openEditModal} project={project}/>
          </li>
        )
      );
      return (
          <ul className="project-list">
            <li key={-1}>
              PROJECTS
              <a onClick={this.props.openCreateProjectModal}> + </a>
            </li>
            {projectElems}
          </ul>
      );
    } else {
      return (
        <ul className="project-list">
          <li key={-1}>
            PROJECTS
            <a onClick={this.props.openCreateProjectModal}> + </a>
          </li>
        </ul>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsSection));
