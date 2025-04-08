import React from 'react';
import axios from 'axios';
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdTaskAlt, MdAccountCircle } from "react-icons/md";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { SpinnerRoundFilled } from 'spinners-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateTask = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('Daily Tasks'); // Default value
  const [priority, setPriority] = React.useState("Low");
  const status = false;
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSaveTask = () => {
    const data = { title, description, category, priority, status};
    console.log('Data:', data);
    setLoading(true);
    axios.post(`${BACKEND_URL}/tasks`, data)
      .then(() => {
        setLoading(false);
        navigate('/Home');
      })
      .catch((error) => {
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
          <SpinnerRoundFilled />
        </div>
      ) : (
        <div className='m-8 p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>Create a New Task</h2>
          <div className='space-y-4'>
            <div>
              <label className='block text-gray-600 mb-1'>Task Name</label>
              <input
                type="text"
                className='border border-gray-300 p-2 rounded w-full'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='Enter task name...'
              />
            </div>
            <div>
              <label className='block text-gray-600 mb-1'>Description</label>
              <input
                type="text"
                className='border border-gray-300 p-2 rounded w-full'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='Enter task description...'
              />
            </div>
            <div>
              <label className='block text-gray-600 mb-1'>Priority</label>
              <select
                name="Priority"
                className='border border-gray-300 p-2 rounded w-full'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low" className='text-green-600'>Low</option>
                <option value="Medium" className='text-blue-600'>Medium</option>
                <option value="High" className='text-red-600'>High</option>
              </select>
            </div>
            <div>
              <label className='block text-gray-600 mb-1'>Category</label>
              <select
                name="Category"
                className='border border-gray-300 p-2 rounded w-full'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Daily Tasks">Daily Tasks</option>
                <option value="Education">Education</option>
                <option value="Other Tasks">Other Tasks</option>
              </select>
            </div>
            <button
              className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200'
              onClick={handleSaveTask}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTask;