import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import enhanceWithClickOutside from 'react-click-outside';

import { updateTask } from '../../../actions/task_actions';
import * as DateUtil from '../../../util/date_util';

// has taskId, updateTask, 230px x 320px

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateTask: (task) => dispatch(updateTask(task)),
  };
};

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    const d = new Date();
    this.state = {
      task: Object.assign({}, props.task),
      dueOn: props.task.dueOn,
      month: d.getMonth(),
      day: d.getDay(),
      year: d.getFullYear(),
      dropdownOpen: false,
      containerClass: "due-date-btn",
    };
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    this.turnOffClickListener = this.turnOffClickListener.bind(this);
    this.turnOnClickListener = this.turnOnClickListener.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handleLastMonth = this.handleLastMonth.bind(this);
    this.handleClickInside = this.handleClickInside.bind(this);
    this.clearDueDate = this.clearDueDate.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.task !== this.props.task) {
      this.setState({task: newProps.task});
    }
  }


  toggleDropdownMenu(e) {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
    if (this.state.containerClass === "due-date-btn") {
      this.setState({containerClass: "due-date-focus"});
    } else {
      this.setState({containerClass: "due-date-btn"});
    }
  }

  handleClickOutside() {
    if (this.state.dropdownOpen) {
      this.toggleDropdownMenu();
      this.turnOnClickListener();
    }
  }

  handleClickInside(e) {
    if (this.state.containerClass === "due-date-focus") {
      // e.stopPropagation();
    } else {
      this.toggleDropdownMenu();
    }
  }

  turnOffClickListener() {
    this.divButton.removeEventListener("click", this.toggleDropdownMenu);
  }

  turnOnClickListener() {
    this.divButton.addEventListener("click", this.toggleDropdownMenu);
  }

  handleNextMonth(e) {
    e.stopPropagation();
    let [month, year] = this.state.month === 11 ?
                          [0, this.state.year + 1]
                          : [this.state.month + 1, this.state.year];
    this.setState({ month, year });
  }

  handleLastMonth(e) {
    e.stopPropagation();
    let [month, year] = this.state.month === 0 ?
                          [11, this.state.year - 1]
                          : [this.state.month - 1, this.state.year];
    this.setState({ month, year });
  }

  clearDueDate(e) {
    let newTask = Object.assign({}, this.state.task, {due_on: null});
    this.props.updateTask(newTask);
    this.setState({
            dropdownOpen: false,
            containerClass: "due-date-btn"
          });
  }

  render() {
    const calendarDays = DateUtil
      .getThirtyFive(this.state.month, this.state.year)
      .map((date) => (
        <div key={`${date.year}${date.month}${date.day}`} onClick={
            (e) => {
              let d = new Date();
              d.setFullYear(date.year, date.month, date.day);
              const newTask = Object.assign({}, this.state.task, {due_on: d.toJSON()});
              this.props.updateTask(newTask);
              this.toggleDropdownMenu(e);
            }
          } className="calendar-cell">{date.day}
        </div>
      )
    );

    const monthPicker = (
      <div className="month-picker">
        <p onClick={this.handleLastMonth} className="month-nav-btn">
          {' < '}
        </p>
        <p>
          {DateUtil.months[this.state.month].name} {this.state.year}
        </p>
        <p onClick={this.handleNextMonth} className="month-nav-btn">
          {' > '}
        </p>
      </div>
    );

    const dayHeaders = DateUtil.dayHeadings.map((day, index) => (
      <p key={`${day}${index}`}>{day}</p>
    ));

    return (
      <div className={this.state.containerClass}
          ref={div => {this.divButton = div;}}
          onClick={this.handleClickInside}>
        <div className={`due-date-icon ${this.state.task.dueOn ? "date-set" : ""}`}>
          <FontAwesome name="calendar" aria-hidden="true" />
        </div>
        {
          this.state.task.dueOn ? (
            <p className="due-date">
              <p>{this.state.task.dueOn}</p>
              <p className="clear-date-btn" onClick={this.clearDueDate}>
                <FontAwesome name="times" aria-hidden="true" />
              </p>
            </p>
          ) : (
            <p className="due-date">
              Due Date
            </p>
          )
        }
        {
          this.state.dropdownOpen &&
          <div id="date-picker">
            {monthPicker}
            <div className="weekday-headers">
              {dayHeaders}
            </div>
            <div className="calendar-days">
              {calendarDays}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(DatePicker));
