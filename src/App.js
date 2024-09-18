import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import './App.css'
import SignIn from './components/SignIn';
import Home from './components/Home';
import SignUp from './components/SignUp';


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
