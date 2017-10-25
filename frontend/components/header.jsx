import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/session_actions';

const mapStateToProps = (state) => (
  {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
  }
);

const mapDispatchToProps = dispatch => (
  {
    logout: () => dispatch(logout()),
  }
);

const Header = ({ loggedIn, currentUser, logout }) => (
  loggedIn ?
  <div className="top-bar">
    <span>{currentUser.username}</span>
    <button onClick={logout}>Logout</button>
  </div> :
  <Redirect to="/login"/>
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
