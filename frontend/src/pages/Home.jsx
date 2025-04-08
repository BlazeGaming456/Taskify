import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SpinnerRoundFilled } from 'spinners-react';
import { MdAccountCircle, MdGridView, MdOutlineTaskAlt } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { BsClockHistory } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';
import TaskCategory from '../components/TaskCategory';
import TaskModal from '../components/TaskModal';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("All Tasks");
  const [filteredTasks, setFilteredTasks] = useState({
    dailyTasks: [],
    education: [],
    otherTasks: []
  });
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/tasks`).then((response) => {
      setTasks(response.data.data);
      setLoading(false);
      setFilteredTasks({
        dailyTasks: response.data.data.filter((task) => task.category === "Daily Tasks"),
        education: response.data.data.filter((task) => task.category === "Education"),
        otherTasks: response.data.data.filter((task) => task.category === "Other Tasks")
      });
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredTasks({
      dailyTasks: tasks.filter((task) => task.category === "Daily Tasks"),
      education: tasks.filter((task) => task.category === "Education"),
      otherTasks: tasks.filter((task) => task.category === "Other Tasks")
    });
  }, [tasks]);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === true).length;
  const pendingTasks = tasks.filter((task) => task.status === false).length;

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 min-h-screen ${activeTask ? 'backdrop-blur-sm' : ''}`}>
      {/* Navbar */}
      <nav className="flex items-center justify-between h-16 shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 dark:from-gray-800 dark:to-gray-900 px-4 md:px-8">
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

      {/* Main Content */}
      <div className='flex flex-col md:flex-row'>
        {/* Sidebar */}
        <div className='w-full md:w-16 h-auto md:h-screen bg-white dark:bg-gray-800 shadow-lg'>
          <ul className='flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 p-2'>
            <li onClick={() => setStatus("All Tasks")} className="cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 p-2 rounded-lg transition duration-200">
              <MdGridView className='size-6 text-gray-700 dark:text-gray-300' />
            </li>
            <li onClick={() => setStatus("Completed Tasks")} className="cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 p-2 rounded-lg transition duration-200">
              <MdOutlineTaskAlt className='size-6 text-gray-700 dark:text-gray-300' />
            </li>
            <li onClick={() => setStatus("Pending Tasks")} className="cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 p-2 rounded-lg transition duration-200">
              <BsClockHistory className='size-6 text-gray-700 dark:text-gray-300' />
            </li>
            <li onClick={toggleDarkMode} className="cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 p-2 rounded-lg transition duration-200">
              {darkMode ? <MdLightMode className='size-6 text-gray-700 dark:text-gray-300' /> : <MdDarkMode className='size-6 text-gray-700 dark:text-gray-300' />}
            </li>
          </ul>
        </div>

        {/* Task List */}
        {loading ? (<SpinnerRoundFilled />) : (
          <div className='flex flex-col flex-grow p-4'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
              <div className='flex items-center space-x-1 text-bold text-xl p-1 dark:text-white'>
                <span>{status}</span>
              </div>
              <div className='flex border border-gray-400 rounded-md p-1 space-x-2'>
                <span
                  className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${priority === 'Low' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white'}`}
                  onClick={() => priority === 'Low' ? setPriority('') : setPriority('Low')}
                >
                  Low
                </span>
                <span
                  className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${priority === 'Medium' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                  onClick={() => priority === 'Medium' ? setPriority('') : setPriority('Medium')}
                >
                  Medium
                </span>
                <span
                  className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${priority === 'High' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white'}`}
                  onClick={() => priority === 'High' ? setPriority('') : setPriority('High')}
                >
                  High
                </span>
              </div>
              <Link to='/tasks/create'>
                <IoMdAdd className='size-8 border border-gray-400 rounded-lg hover:bg-green-500 transition duration-200 cursor-pointer p-1' />
              </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <TaskCategory updateTaskStatus={updateTaskStatus} tasks={filteredTasks.dailyTasks} status={status} type="Daily Tasks" color={`blue`} priority={priority} onOpenModal={setActiveTask} />
              <TaskCategory updateTaskStatus={updateTaskStatus} tasks={filteredTasks.education} status={status} type="Education" color={`green`} priority={priority} onOpenModal={setActiveTask} />
              <TaskCategory updateTaskStatus={updateTaskStatus} tasks={filteredTasks.otherTasks} status={status} type="Other Tasks" color="red" priority={priority} onOpenModal={setActiveTask} />
            </div>
          </div>
        )}

        {/* Sidebar for Task Stats */}
        <div className='w-full md:w-48 flex flex-col bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg mt-4 md:mt-0 md:ml-4'>
          <span className="font-bold text-lg dark:text-white">{totalTasks} Total Tasks</span>
          <span className="text-green-500">{completedTasks} Completed Tasks</span>
          <span className="text-red-500">{pendingTasks} Pending Tasks</span>
          <button onClick={() => navigate("/")} className="mt-4 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200">Sign Out</button>
        </div>
      </div>

      {/* Task Modal */}
      {activeTask && (
        <TaskModal task={activeTask} onClose={() => setActiveTask(null)} />
      )}
    </div>
  );
}

export default Home;