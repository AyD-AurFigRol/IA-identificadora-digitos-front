import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AppConfig } from './app.config';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Exercises from './screens/Exercises';
import TestExercise from './screens/TestExercise';
import ModifyExercise from './screens/ModifyExercise';
import ViewExercise from './screens/ViewExercise';

export default function App() {
    return (
        <div className='flex flex-col'>
            <Header />
            <div className='h-full'>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercises/view/:id" element={<ViewExercise />} />
                <Route path="/exercises/test/:id" element={<TestExercise />} />
                <Route path="/exercises/modify/:id" element={<ModifyExercise />} />
            </Routes> 
            </div>
            <Footer />
        </div>
    );
}