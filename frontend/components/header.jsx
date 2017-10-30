import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout, updateUser } from '../actions/session_actions';
import { openModal } from '../actions/ui_actions';
import UserForm from './user/user_form';

const mapStateToProps = (state) => (
  {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(updateUser(user)),
    openUserForm: () => dispatch(openModal(UserForm)),
  }
);

const Header = ({ openUserForm, loggedIn, currentUser, logout }) => {
  if (loggedIn) {
    const names = currentUser.name.split(" ");
    const initials = `${names[0][0]}${names[1][0]}`.toUpperCase();
    return (
      <div className="top-bar">
        <button onClick={logout}>Logout</button>
        <div onClick={openUserForm}>{initials}</div>
      </div>
    );
  } else {
    return (<Redirect to="/login"/>);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
