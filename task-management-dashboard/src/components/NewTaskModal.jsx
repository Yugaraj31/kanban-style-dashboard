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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
