import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdTaskAlt, MdAccountCircle } from "react-icons/md";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Logo from '../images/logo.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SpinnerRoundFilled } from 'spinners-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/tasks/${id}`).then((response) => {
      setTitle(response.data.task.title);
      setDescription(response.data.task.description);
      setCategory(response.data.task.category);
      setPriority(response.data.task.priority);
      setLoading(false);
      console.log(response.data.task);
    }).catch((error) => {
      setLoading(false);
      console.log(error);
    });
  }, [id]);

  const handleEditTask = () => {
    const data = { title, description, category, priority};
    setLoading(true);
    axios.put(`${BACKEND_URL}/tasks/${id}`, data).then(() => {
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
          <FaLongArrowAltLeft className='bg-blue-500 text-white size-8 border border-gray-500 hover:opacity-60 transition duration-200 cursor-pointer' />
        </Link>
        <span className='text-white'>Return to the Home Page</span>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <SpinnerRoundFilled />
        </div>
      ) : (
        <div className='m-8 p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>Edit a Task</h2>
          <div className='space-y-4'>
            <div>
              <label className='block text-gray-600 mb-1'>Task Name</label>
              <input
                type="text"
                value={title}
                className='border border-gray-300 p-2 rounded w-full'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className='block text-gray-600 mb-1'>Description</label>
              <input
                type="text"
                value={description}
                className='border border-gray-300 p-2 rounded w-full'
                onChange={(e) => setDescription(e.target.value)}
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
                value={category}
                className='border border-gray-300 p-2 rounded w-full'
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Daily Tasks">Daily Tasks</option>
                <option value="Education">Education</option>
                <option value="Other Tasks">Other Tasks </option>
              </select>
            </div>
            <button
              className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200'
              onClick={handleEditTask}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTask;