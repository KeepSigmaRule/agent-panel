import React, { useState } from "react";

function Pagination(props) {
    const [pageNumberLimit] = useState(5);

    const {
        itemsPerPage,
        totelCount,
        setcurrentPage,
        currentPage,
        maxPageNumberLimit,
        minPageNumberLimit,
        setmaxPageNumberLimit,
        setminPageNumberLimit
    } = props

    const pages = [];
    for (let i = 1; i <= Math.ceil(totelCount / itemsPerPage); i++) {
        pages.push(i);
    }
    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number} onClick={() => paginate(number)} id="pageNumber"><a href="javascript:void(0);" className={currentPage === number ? 'select page-item ' : 'none page-item'} style={{pointerEvents: 'none'}}>{number}</a></li>
            );
        } else {
            return null;
        }
    });

    const paginate = (pageNumber) => {
        setcurrentPage(pageNumber);
    };
    
    const handleNextbtn = () => {
        if (currentPage === pages[pages.length - 1]) {
            return;
        }
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        if (currentPage === pages[0]) {
            return;
        }
        setcurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }
    return (
        <>
        <ul id="pageNumberContent" className="pages">
            <li id="prev"><a href="javascript:void(0);" className={`page-link ${currentPage !== pages[0]?'':'disable'}`} onClick={handlePrevbtn}>Prev</a></li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
            <li id="next"><a href="javascript:void(0);" className={`page-link ${currentPage !== pages[pages.length - 1]?'':'disable'}`}  onClick={handleNextbtn}>Next</a></li>
        </ul>
        </>
    )
}
export default Pagination
