import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import enhanceWithClickOutside from 'react-click-outside';

import { logout, updateUser } from '../actions/session_actions';
import { openModal } from '../actions/ui_actions';
import { openSidebar, openDropdown } from '../actions/ui_actions';
import UserForm from './user/user_form';
import ProfileImage from './widgets/profile_image';

const mapStateToProps = (state) => (
  {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
    sidebarOpen: state.ui.sidebarOpen,
  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(updateUser(user)),
    openUserForm: (currentUser, updateUser) => dispatch(openModal(UserForm, {currentUser, updateUser})),
    openSidebar: () => dispatch(openSidebar()),
    openDropdown: (comp, cb) => dispatch(openDropdown(comp, cb)),
  }
);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dropdownOpen: false};
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    this.dropdownMenu = null;
  }

  toggleDropdownMenu(e) {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  handleClickOutside() {
    if (this.state.dropdownOpen) {
      this.toggleDropdownMenu();
    }
  }

  render() {
    const { updateUser, openUserForm, loggedIn, currentUser, logout } = this.props;

    if (loggedIn) {
      return (
        <div className="top-bar" >
          {
            !this.props.sidebarOpen &&
            <div className="close-sidebar" onClick={() => this.props.openSidebar()}>
              <FontAwesome name="bars" aria-hidden="true" />
            </div>
          }
          <ProfileImage user={currentUser} onClick={(e) => this.toggleDropdownMenu(e)}/>
          {
            this.state.dropdownOpen &&
            <div className="dropdown-menu" >
              <ul className="dropdown-menu-list">
                <li className="dropdown-menu-item" onClick={(e) => (openUserForm(currentUser, updateUser))}>Edit User Settings</li>
                <li className="dropdown-menu-item" onClick={logout}>Logout</li>
              </ul>
            </div>
          }
        </div>
      );
    } else {
      return (<Redirect to="/login"/>);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(Header));
