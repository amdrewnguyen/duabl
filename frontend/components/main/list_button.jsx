import React from 'react';

const ListButton = ({action, numTasks}) => {
  let numRows = 12 - numTasks;
  numRows = numRows < 1 ? 1 : numRows;
  const emptyRows = [];

  for(let i = 0; i < numRows; i++) {
    emptyRows.push(
      <li key={`mock-${i}`} className="mock-task-list-item">
      </li>
    );
  }
    return (
      <ul onClick={action} className="task-list-button">
        {emptyRows}
      </ul>
    );

};

export default ListButton;
