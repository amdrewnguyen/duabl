import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout, updateUser } from '../actions/session_actions';
import { openModal } from '../actions/ui_actions';
import UserForm from './user/user_form';
import ProfileImage from './widgets/profile_image';

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
    openUserForm: (currentUser,updateUser) => dispatch(openModal(UserForm, {currentUser,updateUser})),
  }
);

const Header = ({ updateUser, openUserForm, loggedIn, currentUser, logout }) => {
  if (loggedIn) {
    return (
      <div className="top-bar">
        <button onClick={logout}>Logout</button>
        <ProfileImage user={currentUser} onClick={() => (openUserForm(currentUser, updateUser))} />
      </div>
    );
  } else {
    return (<Redirect to="/login"/>);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
