import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProjectForm from './components/projects/ProjectForm';
import ProjectDetails from './components/projects/ProjectDetails';
import EditProjectForm from './components/projects/EditProjectForm';
import TaskForm from './components/tasks/TaskForm';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/new"
              element={
                <PrivateRoute>
                  <ProjectForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <PrivateRoute>
                  <ProjectDetails />
                </PrivateRoute>
              }
            />
            {/* Add the edit route */}
            <Route
              path="/projects/:id/edit"
              element={
                <PrivateRoute>
                  <EditProjectForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:projectId/tasks/new"
              element={
                <PrivateRoute>
                  <TaskForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;