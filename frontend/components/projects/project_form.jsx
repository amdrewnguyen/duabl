import React from 'react';
import merge from 'lodash/merge';

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    const blankState = {name: "", description: ""};
    this.state = (props.formType === "Update") ? (
      merge({}, blankState, props.project)
    ) : (
      blankState
    );

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(this.props.action);
    this.props.action(this.state)
      .then(
        () => this.props.closeModal(),
        () => console.log("error")
      );
  }

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    return (
        <div className="modal" onClick={this.handleClick}>
          <h2>{`${this.props.formType} Project`}</h2>

          <form onSubmit={this.handleSubmit}>
            <label>PROJECT NAME</label><br></br>
            <input type="text" value={this.state.name}
                   onChange={this.update("name")}/>
            <br></br>
            <label>DESCRIPTION</label><br></br>
            <input type="text" value={this.state.description}
                   onChange={this.update("description")}/>
            <br></br>
            <input type="submit" value={`${this.props.formType} Project`}/>
          </form>
        </div>
    );
  }
}

export default ProjectForm;
