import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { BsClockFill, BsClockHistory } from "react-icons/bs";
import axios from 'axios';

const TaskCard = ({ task, updateTaskStatus, color, onOpenModal }) => {
  const [status, setStatus] = useState(task.status);
  const id = task._id;

  const colorMap = {
    blue: {
      bg: 'bg-blue-300',
      border: 'bg-blue-500'
    },
    green: {
      bg: 'bg-green-300',
      border: 'bg-green-500'
    },
    red: {
      bg: 'bg-red-300',
      border: 'bg-red-500'
    }
  };

  const { bg, border } = colorMap[color] || { bg: 'bg-gray-300', border: 'bg-gray-500' };

  useEffect(() => {
    axios.get(`http://localhost:3000/tasks/${id}`)
      .then((response) => {
        setStatus(response.data.task.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleStatus = () => {
    axios.put(`http://localhost:3000/tasks/${task._id}`, { status: !status })
      .then((response) => {
        setStatus(!status);
        updateTaskStatus(task._id, !status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const date = task.setDate ? task.setDate.substring(0, 10) : "No date set";

  return (
    <div className={`${bg} rounded-md p-4 shadow-md relative transition-transform transform hover:scale-105 h-48 flex flex-col justify-between mb-4`}>
      <div className={`absolute left-1 top-2 h-[calc(100%-1rem)] w-1 ${border} rounded-md`}></div>

      <div>
        <span
          onClick={() => onOpenModal(task)} // Open modal with the task
          className='text-lg font-semibold hover:cursor-pointer hover:text-green-600 transition duration-200'
        >
          {task.title}
        </span>
        <p className='text-sm text-gray-600 mt-1'>{task.description}</p>
        <p className='text-sm text-gray-600 mt-1'>{date}</p>
        <p className='text-sm text-gray-600 mt-1'>
          Status: {status ? "Completed" : "Pending"}
        </p>
      </div>

      <div className='flex justify-end space-x-2'>
        <Link to={`/tasks/delete/${task._id}`}>
          <FaTrash
            className='opacity-60 size-4 hover:opacity-100 cursor-pointer'
            style={{ color: "red" }}
          />
        </Link>
        <Link to={`/tasks/edit/${task._id}`}>
          <TbEdit
            className='opacity-60 size-5 hover:opacity-100 cursor-pointer'
            style={{ color: "blue" }}
          />
        </Link>
        {status ? (
          <BsClockFill
            className='opacity-60 size-5 hover:opacity-100 cursor-pointer'
            onClick={handleStatus}
            style={{ color: "green" }}
          />
        ) : (
          <BsClockHistory
            className='opacity-60 size-5 hover:opacity-100 cursor-pointer'
            onClick={handleStatus}
            style={{ color: "red" }}
          />
        )}
      </div>
    </div>
  );
};

export default TaskCard;