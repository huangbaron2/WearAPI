import React from 'react'

export const Pagination = ({ totalPages, paginate, isColor }) => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++){
        pageNumbers.push(i)
    };

    return (
        <nav>
            <ul className = "paginationBox">
                {pageNumbers.map(number => (
                <li key = {number} className = "paginationList">
                    <button onClick = {() => paginate(number)} className = "paginationNumbers" style={{backgroundColor: "blue"}}>
                        {number}
                    </button>
                </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;