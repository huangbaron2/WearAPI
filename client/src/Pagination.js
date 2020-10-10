import React from 'react'
import { Filter } from './Filter'

export const Pagination = ({ totalPages, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++){
        pageNumbers.push(i)
    };

    return (
        <nav>
            <ul className = "paginationBox">
                {pageNumbers.map(number => (
                <li key = {number} className = "paginationList">
                    <button onClick = {() => paginate(number)} className = "paginationNumbers">
                        {number}
                    </button>
                </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;