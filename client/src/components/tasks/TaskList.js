import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import { useParams } from 'react-router-dom';

const TaskList = ({ projectId: propProjectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId: paramProjectId } = useParams();

  // Use prop projectId if available, otherwise use from params
  const projectId = propProjectId || paramProjectId;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) {
        setError('No project ID provided');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };

        const res = await axios.get(
          `http://localhost:5000/api/tasks/project/${projectId}`,
          config
        );
        
        console.log('Tasks fetched:', res.data); // Debug log
        setTasks(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err.response?.data?.msg || 'Error fetching tasks');
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  if (loading) {
    return <div className="py-4">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="py-4 px-4 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="py-4 text-gray-500">
        No tasks found for this project.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard 
          key={task._id} 
          task={task}
          projectId={projectId}
        />
      ))}
    </div>
  );
};

export default TaskList;