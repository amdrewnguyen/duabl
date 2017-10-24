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
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  render() {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{`${this.props.formTitle} Project`}</h2>

          <form onSubmit={this.handleSubmit}>
            <label>PROJECT NAME</label><br></br>
            <input type="text" value={this.state.name}
                   onChange={this.update("name")}/>
            <br></br>
            <label>DESCRIPTION</label><br></br>
            <input type="text" value={this.state.description}
                   onChange={this.update("description")}/>
            <br></br>
            <input type="submit" value={`${this.props.formTitle} Project`}/>
          </form>
        </div>
      </div>
    );
  }
}

export default ProjectForm;
