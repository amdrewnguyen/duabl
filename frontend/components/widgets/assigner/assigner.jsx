import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import enhanceWithClickOutside from 'react-click-outside';

import { updateTask } from '../../../actions/task_actions';
import { selectTaskTeamMembers, selectAssignee } from '../../../util/selectors';
import ProfileImage from '../profile_image';

const mapStateToProps = (state, ownProps) => {
  return {
    members: selectTaskTeamMembers(state.entities, ownProps.task),
    assignee: selectAssignee(state.entities, ownProps.task),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateTask: (task) => dispatch(updateTask(task)),
  };
};

class Assigner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      assignee: this.props.assignee,
      inputVal: "",
      dropdownOpen: false,
      members: this.props.members,
    };

    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectName = this.selectName.bind(this);
    this.clearAssignee = this.clearAssignee.bind(this);
  }

  componentDidMount() {
    this.setState({
      task: this.props.task,
      assignee: this.props.assignee,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.task !== this.state.task ||
        newProps.assignee !== this.state.assignee) {
          this.setState({
            task: newProps.task,
            assignee: newProps.assignee,
          });
        }
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return [];
    }

    this.props.members.forEach(member => {
      let searchArea = (`${member.name}${member.email}`).toLowerCase();
      searchArea = searchArea.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g,"");
      if (searchArea.search(this.state.inputVal) > -1) {
        matches.push(member);
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
  }

  selectName(user) {
    return (e) => {
      this.props.updateTask(Object.assign({}, this.state.task, {assignee_id: user.id}));
      this.setState({inputVal: ""});
    };
  }

  clearAssignee(e) {
    e.stopPropagation();
    let newTask = Object.assign({}, this.state.task, {assignee_id: null});
    this.props.updateTask(newTask);
  }

  render() {
    let results = this.matches().map((result, i) => {
      return (
        <li key={i} onClick={this.selectName(result)} className="match-li">
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
      <div onClick={(e) => this.toggleDropdownMenu()}
           className={`assign-btn ${dropdownOpen ? "active" : "inactive"} ${assignee ? "assigned" : "unassigned"}`}>
        {
          assignee ? (
            <ProfileImage user={assignee} />
          ) : (
            <div className="user-icon">
              <FontAwesome name="user-o" aria-hidden="true"/>
            </div>
          )
        }
        {
          dropdownOpen ?
          <input type="text" value={inputVal}
            ref={
              input => {
                if (input != null) {
                  input.focus();
                }
              }
            }
            onChange={this.handleChange} />
          : (
            assignee ? (
              <div className="assignee">
                <p>
                  {assignee.name}
                </p>
                <p className="clear-assignee-btn" onClick={this.clearAssignee}>
                  <FontAwesome name="times" aria-hidden="true" />
                </p>
              </div>
            ) : (
              <p>
                {"Unassigned"}
              </p>
            )
          )
        }
        {
          dropdownOpen &&
          <div className="search-dropdown">
            <ul className="search-matches">
              {results}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(Assigner));
