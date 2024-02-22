import React from 'react';
import s from '../../Users/Users.module.css';

let Preloader = () => {
    return (
        <div className={s.lazyLoading}>
            <div className={s.center_body}>
                <div className={s.loader_spanne_20}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default Preloader;