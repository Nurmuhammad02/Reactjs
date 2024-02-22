import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { Route, Routes, Navigate } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

const App = (props) => {

  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/dialogs' element={<DialogsContainer />} />
          <Route path='/profile/:userId' element={<ProfileContainer />} />
          <Route path='/profile' element={<ProfileContainer />} />
          <Route path='/users' element={<UsersContainer />} />
          <Route path='*' element={<Navigate to="/profile" replace />} />

        </Routes>
      </div>
    </div>

  );
}

export default App;
