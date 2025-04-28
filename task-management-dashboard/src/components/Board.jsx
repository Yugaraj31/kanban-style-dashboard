import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { getTasks, createTask, updateTask } from '../api/api';
import NewTaskModal from './NewTaskModal';
import Task from './Task';

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
      <div className="board-container">
        <div className="dashboard-header">
          <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary"
            >
              Add New Task
            </button>
            <button
              onClick={() => setIsTableView(!isTableView)}
              className="btn btn-secondary"
            >
              {isTableView ? "Switch to Kanban View" : "Switch to Table View"}
            </button>
          </div>
        </div>
  
        {showModal && (
          <NewTaskModal 
            onSave={handleNewTask} 
            onClose={() => setShowModal(false)} 
          />
        )}
  
        {isTableView ? (
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="columns-container">
              {Object.entries(columns).map(([columnId, columnTasks]) => (
                <div key={columnId} className="column">
                  <h2 className="column-header">{columnId}</h2>
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="tasks-list"
                      >
                        {columnTasks.map((task, index) => (
                          <Task 
                            key={task.id} 
                            task={task} 
                            index={index} 
                            draggableId={task.id.toString()} 
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
    );
  };

export default Board;
