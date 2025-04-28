# Task Management Dashboard

A modern, drag-and-drop task management application built with React and Tailwind CSS.

## Features

- Kanban-style board with drag-and-drop functionality
- Create, edit, and delete tasks
- Move tasks between status columns (To Do, In Progress, Done)
- Responsive design for desktop and mobile devices
- Real-time status updates
- Customizable task descriptions
- Modern UI with Tailwind CSS

## Tech Stack

- **React** - Frontend library
- **Tailwind CSS** - Utility-first CSS framework
- **@hello-pangea/dnd** - Drag and drop library (fork of react-beautiful-dnd)
- **Axios** - HTTP client for API requests
- **ESLint** - Linting tool
- **Prettier** - Code formatter

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/task-management-dashboard.git
cd task-management-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:3001/api
```

## Running the Application

### Development mode

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## API Integration

The application expects a backend API with the following endpoints:

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

### Setting up a mock API server (optional)

You can use json-server to create a quick mock API:

1. Install json-server:

```bash
npm install -g json-server
```

2. Create a `db.json` file in the project root:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Sample Task 1",
      "description": "This is a sample task",
      "status": "In Progress"
    },
    {
      "id": 2,
      "title": "Sample Task 2",
      "description": "This is another sample task",
      "status": "To Do"
    },
    {
      "id": 3,
      "title": "Completed Task",
      "description": "This task is already done",
      "status": "Done"
    }
  ]
}
```

3. Run the mock server:

```bash
json-server --watch db.json --port 3001
```

## Project Structure

```
task-management-dashboard/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── api/
│   │   └── api.js
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   ├── Task.jsx
│   │   ├── NewTaskModal.jsx
│   │   └── TaskTable.jsx
│   ├── App.jsx
│   ├── Index.css
│   └── index.js
├── .env
├── package.json
├── tailwind.config.js
└── README.md
```

## Tailwind CSS Configuration

The project uses Tailwind CSS for styling. The configuration is defined in `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors can be added here
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
  ],
}
```
## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- [React](https://reactjs.org/)