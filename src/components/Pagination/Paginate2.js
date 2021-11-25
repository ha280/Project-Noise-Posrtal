import React, { useRef } from 'react'
import ReactPaginate from 'react-paginate'
import './Paginate.css'


const Paginate2 = ({ totalPages }) => {
  // const pagination = useRef();

  // console.log(pagination);

  const perPage = 20;

  const setPage = ({ selected }) => {

  }

  return (
    <ReactPaginate
      // ref={pagination}
      pageCount={totalPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={setPage}
      containerClassName="pagination"
      activeClassName="active"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      previousLinkClassName="page-link"
      pageClassName="page-item"
      breakClassName="page-item"
      nextClassName="page-item"
      previousClassName="page-item"
      previousLabel={<>&laquo;</>}
      nextLabel={<>&raquo;</>}
    />
  )
}

export default Paginate2
