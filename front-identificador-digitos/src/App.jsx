import React from 'react';
import { Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import AboutUs from './components/AboutUs';
import Exercises from './components/Exercises';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/us" element={<AboutUs/>} />
        <Route path="/exer" element={<Exercises/>} />
        <Route path="/" element={<Landing />} />    
      </Routes>

    </>
  );
}
