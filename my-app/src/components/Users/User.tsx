import React from "react";
import s from './Users.module.css';
import ava from '../../assets/ava.png';
import { NavLink } from 'react-router-dom';
import cn from "classnames";
import { UserType} from "../../Types/types.ts";

type PropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
    user: UserType
}

let User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return (

        <div className={cn(s.someStyles,
            //example for classnames
            {
                [s.someBack]
                    : user.followed
            }
        )}>
            <span>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : ava}
                            className={cn(s.userPhoto)} alt="" />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.status}
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
        </div >
    )
}

export default User;