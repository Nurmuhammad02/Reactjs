import React from "react";
import s from './Users.module.css';
import ava from '../../assets/ava.png';
import {NavLink} from 'react-router-dom';

let Users = (props) => {
    
    let pagesCount = Math.ceil(Math.sqrt(props.totalUsersCount) / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount ; i++) {
        pages.push(i)
    }

    return (<div className={s.users}>

        {pages.map((p) => {
            return <button className={props.currentPage === p && s.selectedPage}
                onClick={(e) => { props.onPageChanged(p); }}
            >{p}</button>
        })
        }

        {
            props.users.map(u => <div key={u.id} >
                <span>
                    <div>
                        <NavLink to={"/profile/" + u.id}>
                            <img src={u.photos.small !== null ? u.photos.small : ava}
                                className={s.userPhoto} alt="" />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                            : <button onClick={() => { props.follow(u.id) }}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.status}
                        </div>
                    </span>
                    <span>
                        <div>
                            {/* {u.location.country} */}
                        </div>
                        <div>
                            {/* {u.location.city} */}
                        </div>
                    </span>
                </span>
            </div>
            )
        }
    </div>
    )
}

export default Users;