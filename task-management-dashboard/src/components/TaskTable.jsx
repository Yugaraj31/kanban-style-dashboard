import React from 'react';

const TaskTable = ({ tasks }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="p-4">{task.title}</td>
              <td className="p-4">{task.description}</td>
              <td className="p-4">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
