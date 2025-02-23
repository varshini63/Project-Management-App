// ProjectCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold">{project.title}</h2>
      <p className="text-gray-600 mt-2">{project.description}</p>
      <div className="flex justify-between items-center mt-4 space-x-2">
        <Link
          to={`/projects/${project._id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
        <div className="space-x-2">
          <Link
            to={`/projects/${project._id}/edit`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;