import React from 'react';
import { connect } from 'react-redux';

import { searchUsers } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    users: Object.values(state.entities.ui.users),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchUsers: (queryString) => dispatch(searchUsers(queryString)),
  };
};

class UserFinderPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: this.props.users,
      inputVal: "",
      dropdownOpen: false,
    };
    this.saveTimerId = null;
    this.handleChange = this.handleChange.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.clearAssignee = this.clearAssignee.bind(this);
  }

  componentDidMount() {
    this.setState({
      users: this.props.users,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.users.length != this.props.users.length) {
      this.setState({ users: newProps.users });
    }
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return [];
    }

    this.state.users.forEach(user => {
      let searchArea = (`${user.name}${user.email}`).toLowerCase();
      searchArea = searchArea.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g,"");
      if (searchArea.search(this.state.inputVal) > -1) {
        matches.push(user);
      }
    });

    return matches;
  }

  toggleDropdownMenu() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  handleClickOutside() {
    if (this.state.dropdownOpen) {
      this.toggleDropdownMenu();
    }
  }

  handleChange(e) {
    this.setState({inputVal: e.currentTarget.value});
    if (this.saveTimerId) clearTimeout(this.saveTimerId);

    this.saveTimerId = setTimeout(
      () => {
        this.props.searchUsers(this.state.inputVal);
        this.saveTimerId = null;
      },
      1000
    );
  }

  selectUser(user) {
    this.props.action(user);
  }

  render() {
    let results = this.matches().map((result, i) => {
      return (
        <li key={i} onClick={this.selectUser(result)} className="match-li">
          <div className="match-tile">
            <p className="match-name">
              {result.name}
            </p>
            <p className="match-email">
              {result.email}
            </p>
          </div>
        </li>
      );
    });

    let { dropdownOpen, assignee, inputVal } = this.state;
    return (
      <div className="user-finder-picker">
        <input type="text" className="user-search-bar" value={inputVal}
          onChange={this.handleChange} />
        {
          results.length > 0 ? (
            <div className="search-dropdown">
              <ul className="search-matches">
                {results}
              </ul>
            </div>
          ) : (
            null
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFinderPicker);
