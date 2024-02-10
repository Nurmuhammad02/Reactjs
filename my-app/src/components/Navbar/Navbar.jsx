import React from 'react';
import s from './Navbar.module.css';

const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <a href='/profile'>Profile</a>
        </div>
        <div className={s.item}>
            <a href='/profile'>Messages</a>
        </div>
        <div className={s.item}>
            <a href='/profile'>News</a>
        </div>
        <div className={s.item}>
            <a href='/profile'>Music</a>
        </div>
        <div className={s.item}>
            <a href='/profile'>Settings</a>
        </div>

    </nav>
}


export default Navbar;