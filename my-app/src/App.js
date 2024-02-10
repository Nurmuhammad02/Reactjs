import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, Routes, Redirect, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <BrowserRouter>
          <Routes>
            <Route component={Dialogs} />
            <Route component={Profile} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
