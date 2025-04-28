import React, { useState } from 'react';

const NewTaskModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, status });
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-header">New Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input-field"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="textarea-field"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="select-field"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="add-button"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
