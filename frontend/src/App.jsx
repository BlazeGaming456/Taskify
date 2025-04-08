import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import DeleteTask from './pages/DeleteTask';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/users/signup' element={<SignUp/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/tasks/create' element={<CreateTask/>}/>
      <Route path='/tasks/edit/:id' element={<EditTask/>}/>
      <Route path='/tasks/delete/:id' element={<DeleteTask/>}/>
    </Routes>
  )
}

export default App