import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const App = (props) => {
  let posts = [
    { id: 1, message: 'Hi', likesCount: 12 },
    { id: 2, message: 'How is your friend?', likesCount: 11 },
];
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs' element={<Dialogs/>} />
            <Route path='/profile' element={<Profile posts={posts}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
