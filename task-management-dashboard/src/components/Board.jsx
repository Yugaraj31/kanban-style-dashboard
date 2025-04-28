import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask } from '../api/api';
import Column from './Column';
import NewTaskModal from './NewTaskModal';
import TaskTable from './TaskTable'; // Import TaskTable
import { DragDropContext } from '@hello-pangea/dnd';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isTableView, setIsTableView] = useState(false); // Track table view state

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTask = async (task) => {
    try {
      const response = await createTask(task);
      setTasks([...tasks, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const draggedTask = tasks.find(task => task.id.toString() === draggableId);
    if (draggedTask.status !== destination.droppableId) {
      const updatedTask = { ...draggedTask, status: destination.droppableId };
      try {
        await updateTask(draggedTask.id, updatedTask);
        setTasks(tasks.map(task => (task.id === draggedTask.id ? updatedTask : task)));
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  const columns = {
    'To Do': tasks.filter(task => task.status === 'To Do'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Done': tasks.filter(task => task.status === 'Done')
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-8">
      <div className="w-full max-w-6xl px-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Task Management Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 text-white p-2 rounded"
            >
              Add New Task
            </button>
            <button
              onClick={() => setIsTableView(!isTableView)} // Toggle table view
              className="bg-blue-500 text-white p-2 rounded"
            >
              {isTableView ? "Switch to Kanban View" : "Switch to Table View"}
            </button>
          </div>
        </div>

        {showModal && <NewTaskModal onSave={handleNewTask} onClose={() => setShowModal(false)} />}

        {isTableView ? (
          <TaskTable tasks={tasks} /> // Render table view if isTableView is true
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4">
              {Object.entries(columns).map(([columnId, columnTasks]) => (
                <Column key={columnId} columnId={columnId} title={columnId} tasks={columnTasks} />
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default Board;
