import React from "react";
import s from "./Paginator.module.css";

let Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize}) => {
    // console.log(currentPage, onPageChanged, totalUsersCount, pageSize)
    let pagesCount = Math.ceil(Math.sqrt(totalUsersCount) / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (<div className={s.users}>

            {pages.map((p) =>
                <button className={currentPage === p && s.selectedPage}
                        onClick={(e) => {
                            onPageChanged(p);
                        }}
                >{p}</button>)
            }
        </div>
    )
}

export default Paginator;