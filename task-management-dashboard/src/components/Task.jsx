import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index, draggableId }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div 
          className="bg-white p-4 rounded shadow mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 className="font-bold">{task.title}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
