# Project Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing projects and tasks. This system allows users to create, read, update, and delete projects and their associated tasks, with team collaboration features.

## Features

- **User Authentication**
  - Secure login and registration
  - JWT-based authentication
  - Protected routes

- **Project Management**
  - Create new projects
  - View project details
  - Edit project information
  - Delete projects
  - Add team members to projects
  - Set project start and end dates

- **Task Management**
  - Create tasks within projects
  - Assign priorities (Low, Medium, High)
  - Set task status (To Do, In Progress, Done)
  - Set due dates
  - Edit task details
  - Delete tasks

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS for cross-origin resource sharing

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd project-management-system
```

2. Install Backend Dependencies
```bash
cd server
npm install
```

3. Install Frontend Dependencies
```bash
cd client
npm install
```

## Running the Application

1. Start the Backend Server
```bash
cd server
npm start
```
The server will run on http://localhost:5000

2. Start the Frontend Development Server
```bash
cd client
npm start
```
The client will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get user details

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks/project/:projectId` - Get all tasks for a project
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Usage Guide

1. **Registration and Login**
   - Register with email and password
   - Login to access the dashboard

2. **Creating a Project**
   - Click "New Project" button
   - Fill in project details (title, description, dates)
   - Add team members
   - Submit to create

3. **Managing Tasks**
   - Navigate to project details
   - Click "Add New Task"
   - Fill in task details
   - Submit to create
   - Edit or delete tasks using respective buttons

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration for security

## Error Handling

The application includes comprehensive error handling for:
- Invalid authentication
- Database errors
- Invalid input validation
- Network errors
- Resource not found errors

## Acknowledgments

- MongoDB for database
- Express.js for backend framework
- React.js for frontend framework
- Node.js for runtime environment
- Tailwind CSS for styling
