// ProjectList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/projects', {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching projects');
        console.error(err.response?.data || 'Error fetching projects');
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard 
            key={project._id} 
            project={project}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-3">No projects found</p>
      )}
    </div>
  );
};

export default ProjectList;