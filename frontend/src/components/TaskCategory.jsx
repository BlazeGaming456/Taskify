import React from 'react';
import TaskCard from './TaskCard';

const TaskCategory = ({ tasks, status, type, updateTaskStatus, color, priority, onOpenModal }) => {
  if (status === 'Completed Tasks') {
    tasks = tasks.filter((task) => task.status === true);
  } else if (status === 'Pending Tasks') {
    tasks = tasks.filter((task) => task.status === false);
  }

  if (priority === 'Low') {
    tasks = tasks.filter((task) => task.priority === 'Low');
  } else if (priority === 'Medium') {
    tasks = tasks.filter((task) => task.priority === 'Medium');
  } else if (priority === 'High') {
    tasks = tasks.filter((task) => task.priority === 'High');
  }

  return (
    <div className='border border-gray-300 rounded-lg p-4 bg-white shadow-md'>
      <h3 className='text-lg font-semibold text-gray-700 mb-2'>{type}</h3>
      <div className='space-y-4'>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCard updateTaskStatus={updateTaskStatus} task={task} key={index} status={status} color={color} onOpenModal={onOpenModal} />
          ))
        ) : (
          <p className='text-gray-500'>No tasks available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default TaskCategory;