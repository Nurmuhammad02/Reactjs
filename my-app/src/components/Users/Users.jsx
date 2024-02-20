import React from 'react';
import s from './Users.module.css';

// followed={u.followed} name={u.name} status={u.status} location={u.location}
const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1, photoUrl: 'https://i.pinimg.com/736x/19/2f/6e/192f6ee2577c75e151d6d6b53fc889f4.jpg',
                followed: true, fullName: 'Dmitry', status: 'Boss', location: { city: 'Minsk', country: 'Belarus' }
            },
            {
                id: 2, photoUrl: 'https://i.pinimg.com/564x/2b/b5/45/2bb5457d792451c80ed2e128b0804577.jpg',
                folowed: false, fullName: 'Andrey', status: 'Boss', location: { city: 'Moscow', country: 'Russia' }
            },
            {
                id: 3, photoUrl: 'https://i.pinimg.com/564x/69/51/60/695160f563ddaada2f85f30dd34cdd1e.jpg',
                folowed: false, fullName: 'Sveta', status: 'Boss', location: { city: 'Kiev', country: 'Ukraine' }
            },
        ])
    }


    return (
        <div className={s.users}>
            {
                props.users.map(u => <div key={u.id} >
                    <span>
                        <div>
                            <img src={u.photoUrl} className={s.userPhoto} alt="" />
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
                                {u.fullName}
                            </div>
                            <div>
                                {u.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {u.location.country}
                            </div>
                            <div>
                                {u.location.city}
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