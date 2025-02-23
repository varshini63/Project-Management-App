import React, { useState } from 'react';
import EditTaskForm from './EditTaskForm';

const TaskCard = ({ task, projectId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityColor = (priority) => {
    const priorityLower = priority?.toLowerCase() || '';
    switch (priorityLower) {
      case 'high':
        return 'bg-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    switch (statusLower) {
      case 'done':
        return 'bg-green-200 text-green-800';
      case 'in progress':
        return 'bg-blue-200 text-blue-800';
      case 'to do':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
          </div>
          <div className="flex space-x-2 items-center">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:text-blue-800 mr-2"
            >
              Edit
            </button>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>

      {isEditing && (
        <EditTaskForm
          task={task}
          projectId={projectId}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default TaskCard;