import React from 'react';
import { Link } from 'react-router-dom';
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
  <div>
    <h1>Welcome, {currentUser.username}</h1>
    <button onClick={logout}>Logout</button>
  </div> :
  <div>
    <Link to='/signup'>Sign Up </Link>
    <Link to='/login'>Log In </Link>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
