import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

export const getTasks = () => axios.get(API_URL);

export const createTask = (task) => axios.post(API_URL, task);

export const updateTask = (id, updatedTask) => axios.put(`${API_URL}/${id}`, updatedTask);
