import React from 'react';
import { IoClose } from "react-icons/io5";

const TaskModal = ({ task, onClose }) => {
  const date = task.setDate ? task.setDate.substring(0, 10) : "No date set";
  return (
    <div 
      className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50' 
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className='w-[90%] max-w-lg h-[400px] bg-white rounded-xl p-6 flex flex-col relative shadow-lg'
      >
        <IoClose 
          className='absolute right-6 top-6 text-gray-600 hover:text-gray-800 cursor-pointer transition duration-200' 
          onClick={onClose} 
          size={24} 
        />
        <h1 className='text-2xl font-bold text-gray-800'>{task.title}</h1>
        <h2 className='text-xl text-gray-600'>{date}</h2>
        <h2 className='text-xl text-gray-600'>{task.category}</h2>
        <p className='mt-4 text-gray-700'>{task.description}</p>
      </div>
    </div>
  );
}

export default TaskModal;