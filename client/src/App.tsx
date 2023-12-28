import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LandingPage, RegisterPage, ProfilePage, TweetsPage} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element ={<LandingPage/>} ></Route>
          <Route path="/register" element = {<RegisterPage/>}></Route>
          <Route path="/profile" element = {<ProfilePage/>}></Route>
          <Route path="/tweets" element = {<TweetsPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
