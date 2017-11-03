import React from 'react';
import { connect } from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';

import { searchUsers } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    users: Object.values(state.entities.users),
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
      ignore: this.props.ignore,
      inputVal: "",
    };
    this.saveTimerId = null;
    this.handleChange = this.handleChange.bind(this);
    this.selectUser = this.selectUser.bind(this);
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

    if (newProps.ignore !== this.props.ignore) {
      this.setState({ignore: newProps.ignore});
    }
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return [];
    }
    let ignoreIds = new Set(this.state.ignore.map(u => u.id));

    this.state.users.forEach(user => {
      if (!ignoreIds.has(user.id)) {
        let searchArea = (`${user.name}${user.email}`).toLowerCase();
        searchArea = searchArea.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g,"");
        if (searchArea.search(this.state.inputVal) > -1) {
          matches.push(user);
        }
      }
    });

    return matches;
  }

  handleClickOutside() {
    this.setState({inputVal: ""});
  }

  handleChange(e) {
    this.setState({inputVal: e.currentTarget.value});
    if (this.saveTimerId) clearTimeout(this.saveTimerId);

    this.saveTimerId = setTimeout(
      () => {
        if (this.state.inputVal !== "") {
          this.props.searchUsers(this.state.inputVal);
        }
        this.saveTimerId = null;
      },
      1000
    );
  }

  selectUser(user) {
    return (e) => {
      this.props.action(user);
      this.setState({inputVal: ""});
    };
  }

  render() {
    let results = this.matches().map((result, i) => {
      return (
        <li key={i} onClick={this.selectUser(result)} className="match-li">
          <div className="ufp-match-tile">
            <p className="ufp-match-info">
              {result.name} ({result.email})
            </p>
          </div>
        </li>
      );
    });

    let { inputVal } = this.state;
    return (
      <div className="user-finder-picker">
        <input type="text" className="ufp-search-bar" value={inputVal}
          onChange={this.handleChange} />
        {
          results.length > 0 ? (
            <div className="ufp-dropdown">
              <ul className="ufp-matches">
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

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(UserFinderPicker));
