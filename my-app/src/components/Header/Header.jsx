import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://e7.pngegg.com/pngimages/594/855/png-clipart-facebook-logo-facebook-computer-icons-logo-background-black-white-text.png" alt="" />
            <div className={s.menu}>
                <div className={s.menu__links}>
                    <li className={s.menu__link}>
                        <NavLink to="#"> Menu </NavLink>
                    </li>
                    <li className={s.menu__link}>
                        <NavLink to="#"> Communities </NavLink>
                    </li>
                    <li className={s.menu__link}>
                        <NavLink to="#"> Reference </NavLink>
                    </li>
                    <li className={s.menu__link}>
                        <NavLink to="#">  Support </NavLink>
                    </li>

                </div>
            </div>
            <div className={props.isAuth ? s.trueLogin : s.loginBlock}>
                {
                    props.isAuth ? props.login : <NavLink to={'/login'}> Login</NavLink>
                }
                
            </div>
        </header>
    )
}


export default Header;