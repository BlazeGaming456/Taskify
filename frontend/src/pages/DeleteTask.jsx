import React, { useEffect, useState } from 'react';
import { MdTaskAlt, MdAccountCircle } from 'react-icons/md';
import Logo from '../images/logo.png';
import { Link, useParams } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteTask = () => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/tasks/${id}`).then((response) => {
      setTask(response.data.task);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, [id]);

  const handleDeleteTask = () => {
    setLoading(true);
    axios.delete(`http://localhost:3000/tasks/${id}`).then(() => {
      setLoading(false);
      navigate('/Home');
    }).catch((error) => {
      setLoading(false);
      console.log(error);
    });
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <nav className="flex items-center justify-between h-16 shadow-lg bg-blue-600 dark:from-gray-800 dark:to-gray-900 px-4 md:px-8">
              <div className="flex items-center space-x-2">
                <img src={Logo} alt="Site logo" className="h-10 w-auto" />
                <span className="text-white text-xl font-bold">Task Manager</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center hover:text-blue-200 transition duration-200">
                  <MdAccountCircle className="text-2xl h-8 text-white" aria-label="Account Icon" />
                  <span className="hidden md:block ml-1 text-white">Profile</span>
                </Link>
              </div>
            </nav>
      <div className='h-12 bg-blue-500 flex items-center space-x-3 pl-4'>
        <Link to='/Home'>
          <FaLongArrowAltLeft className='bg-blue-500 text-white size-8 border border-gray-500 hover:opacity-60 transition duration:200 cursor-pointer' />
        </Link>
        <span className='text-white'>Return to the Home Page</span>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span>Loading...</span>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <div className='bg-white p-6 rounded-lg shadow-md w-96'>
            <h2 className='text-xl font-semibold text-gray-700 mb-4'>Delete Task</h2>
            <div className='mb-4'>
              <p className='text-gray-600'><strong>Title:</strong> {task.title}</p>
              <p className='text-gray-600'><strong>Description:</strong> {task.description}</p>
              <p className='text-gray-600'><strong>Category:</strong> {task.category}</p>
              <p className='text-gray-600'><strong>Status:</strong> {task.status}</p>
            </div>
            <div className='flex flex-col'>
              <span className='text-gray-600 mb-2'>Are you sure you want to delete this task?</span>
              <button
                onClick={handleDeleteTask}
                className='bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 transition duration-200'
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteTask;