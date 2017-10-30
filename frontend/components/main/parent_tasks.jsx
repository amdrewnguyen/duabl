import React from 'react';
import { Link } from 'react-router-dom';

class ParentTasks extends React.Component {

  render() {
    const { parentTasks, projectId } = this.props;
    if (parentTasks.length > 0 ) {
      const lineage = parentTasks.map((ancestor) => (
        <li key={ancestor.id}>
          <Link to={`/${projectId}/${ancestor.id}`}>{ancestor.name}</Link>
        </li>
      ));
      return (
        <div className="task-lineage">
          {lineage}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ParentTasks;
