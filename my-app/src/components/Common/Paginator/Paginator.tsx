import React, {useState} from "react";
import s from "./Paginator.module.css";

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    portionSize: number
    totalUsersCount: number
}

let Paginator: React.FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, portionSize}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Prev</button>
            }
            {pages
                .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) =>
                    <button className={currentPage === p && s.selectedPage}
                            onClick={(e) => {
                                onPageChanged(p);
                            }}
                    >{p}</button>)
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Next</button>
            }
        </div>
    )
}

export default Paginator;