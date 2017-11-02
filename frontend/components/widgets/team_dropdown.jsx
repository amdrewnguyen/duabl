import React from 'react';
import FontAwesome from 'react-fontawesome';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';

import { openModal } from '../../actions/ui_actions';
import EditTeamForm from '../teams/edit_team_form';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openEditModal: (team) => dispatch(openModal(EditTeamForm, {team})),
  };
};

class TeamDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: props.team,
      dropdownOpen: false,
    };
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
  }

  componentDidMount() {
    this.setState({team: this.props.team});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.team !== this.props.team) {
      this.setState({team: this.props.team});
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
    let { team } = this.state;
    return (
      <div className="team-menu">
        <FontAwesome onClick={(e) => {
              this.toggleDropdownMenu();
            }
          } name="cog" aria-hidden="true" />
        {
          this.state.dropdownOpen &&
          <div className="team-dropdown" >
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item" onClick={() => {
                  this.toggleDropdownMenu();
                  this.props.openEditModal(this.props.team);
                }}>Edit Team</li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(enhanceWithClickOutside(TeamDropdown));
