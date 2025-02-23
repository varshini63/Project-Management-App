// client/src/components/layout/Dashboard.js
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProjectList from '../projects/ProjectList';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          to="/projects/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create New Project
        </Link>
      </div>
      <ProjectList />
    </div>
  );
};

export default Dashboard;
