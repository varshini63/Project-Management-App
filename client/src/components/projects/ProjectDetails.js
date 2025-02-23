// ProjectDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TaskList from '../tasks/TaskList';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            'Accept': 'application/json'
          },
          withCredentials: true
        };
        
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`, config);
        setProject(res.data);
        setError(null);
      } catch (err) {
        console.error('Error details:', err.response || err);
        setError(err.response?.data?.msg || 'Error fetching project');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Project not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
            <Link
              to={`/projects/${id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Edit Project
            </Link>
          </div>
          <p className="mt-1 text-sm text-gray-500">{project.description}</p>
        </div>
        
        <div className="px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h5 className="text-lg font-medium text-gray-900">Start Date</h5>
              <p className="mt-1 text-gray-500">
                {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}
              </p>
            </div>
            <div>
              <h5 className="text-lg font-medium text-gray-900">End Date</h5>
              <p className="mt-1 text-gray-500">
                {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h5 className="text-lg font-medium text-gray-900 mb-3">Team Members</h5>
            <div className="space-y-2">
              {project.team?.map(member => (
                <div key={member._id} className="bg-gray-50 px-4 py-2 rounded-md">
                  {member.name} ({member.email})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Tasks</h3>
          <Link 
            to={`/projects/${id}/tasks/new`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Task
          </Link>
        </div>
        <TaskList projectId={id} />
      </div>
    </div>
  );
};

export default ProjectDetails;