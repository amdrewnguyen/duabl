import React from 'react';
import FontAwesome from 'react-fontawesome';
import enhanceWithClickOutside from 'react-click-outside';


class ProjectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      dropdownOpen: false,
    };
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
  }

  componentDidMount() {
    this.setState({project: this.props.project})
  }

  componentWillReceiveProps(newProps) {
    if (newProps.project !== this.props.project) {
      this.setState({project: this.props.project})
    }
  }

  toggleDropdownMenu() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  handleClickOutside() {
    if (this.state.dropdownOpen) {
      this.toggleDropdownMenu();
    }
  }

  render() {
    let { project } = this.state;
    return (
      <div className="project-menu">
        <FontAwesome onClick={(e) => {
              this.toggleDropdownMenu();
            }
          } name="ellipsis-h" aria-hidden="true" />
        {
          this.state.dropdownOpen &&
          <div className="project-dropdown" >
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item" onClick={() => {
                  this.toggleDropdownMenu();
                  this.props.openEditModal(this.props.project.id);
                }}>Edit Project</li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default enhanceWithClickOutside(ProjectDropdown);
