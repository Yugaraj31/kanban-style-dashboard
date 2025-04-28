import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index, draggableId }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
