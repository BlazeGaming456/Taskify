import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SpinnerRoundFilled } from 'spinners-react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignUp = () => {
  const [user, setUser ] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FaEye />);
      setType("text");
    } else {
      setIcon(<FaEyeSlash />);
      setType("password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { user, password };
    axios.post(`${BACKEND_URL}/users/signup`, data).then((result) => {
      console.log(result);
      navigate("/");
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  };

  return (
    <div className='bg-gray-100 min-h-screen flex justify-center items-center'>
      {loading ? (
        <SpinnerRoundFilled />
      ) : (
        <div className='bg-white p-6 rounded-lg shadow-md w-96'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor="user" className='block text-gray-600 mb-1'>
                <strong>User Name</strong>
              </label>
              <input
                type="text"
                placeholder='Enter UserName...'
                name='user'
                autoComplete='off'
                className='border border-gray-300 p-2 rounded w-full'
                onChange={(e) => setUser (e.target.value)}
              />
            </div>
            <div className='mb-4 relative justify-center items-center'>
              <label htmlFor="password" className='block text-gray-600 mb-1'>
                <strong>Password</strong>
              </label>
              <input
                type={type}
                placeholder='Enter Password...'
                name='password'
                autoComplete='off'
                className='border border-gray-300 p-2 rounded w-full'
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='absolute right-3 bottom-1 transform -translate-y-1/2 cursor-pointer' onClick={handleToggle}>
                {icon}
              </span>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200'
            >
              Sign Up
            </button>
          </form>
          <p className='mt-4 text-center'>Already have an account?</p>
          <Link to="/" className='block text-center mt-2 text-blue-500 hover:underline'>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default SignUp;