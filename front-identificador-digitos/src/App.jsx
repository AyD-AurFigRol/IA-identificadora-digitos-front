import React from 'react';
import { Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import AboutUs from './components/AboutUs';
import Exercises from './components/Exercises';
import Info from './components/Info';
import Alta from './components/Alta';
import NotFound from './components/NotFound';


export default function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/us" element={<AboutUs />} />
          <Route path="/exer" element={<Exercises />} />
          <Route path="/alta" element={<Alta />} />
          <Route path="/exer/info" element={<Info />} />
          <Route path="/" element={<Landing />} />
          <Route path="/skynet" element={<Landing />} />
          <Route path="*" element= {<NotFound />} />
        </Routes>
    </>
  );
}
