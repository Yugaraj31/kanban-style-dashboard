import React from 'react';
import Task from './Task';
import { Droppable } from '@hello-pangea/dnd';

const Column = ({ columnId, title, tasks }) => {
  return (
    <div className="bg-gray-100 rounded p-4 w-80">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[100px]"
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} draggableId={task.id.toString()} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
