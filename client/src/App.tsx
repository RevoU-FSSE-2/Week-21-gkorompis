import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LandingPage, RegisterPage, ProfilePage} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element ={<LandingPage/>} ></Route>
          <Route path="/register" element = {<RegisterPage/>}></Route>
          <Route path="/profile" element = {<ProfilePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
