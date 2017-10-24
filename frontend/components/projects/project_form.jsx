import React from 'react';

class ProjectForm extends React.Component {
  render() {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{this.props.formTitle}</h2>

          <form onSubmit={this.handleSubmit}>
            <label>PROJECT NAME</label><br></br>
            <input type="text" value={this.state.email}
                   onChange={this.update("email")}/>
            <br></br>
            <label>DESCRIPTION</label><br></br>
            <input type="text" value={this.state.password}
                   onChange={this.update("password")}/>
            <br></br>
            <input type="submit" value={this.props.formTitle}/>
          </form>
          <Link to={this.props.otherPath}>{this.props.otherTitle}</Link>
        </div>
      </div>
    );
  }
}

export default ProjectForm;
