import React from 'react';

const ListButton = ({action, numTasks}) => {
  let numRows = 12 - numTasks;
  console.log(`${numRows} ${numTasks}`);
  numRows = numRows < 1 ? 1 : numRows;
  console.log(`${numRows} ${numTasks}`);
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
