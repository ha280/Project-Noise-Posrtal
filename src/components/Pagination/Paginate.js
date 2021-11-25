import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ReactPaginate from 'react-paginate'

const Paginate = ({ totalPages, page }) => {
  return totalPages > 1 && (
    <Pagination className='pagination'>
      {[...Array(totalPages).keys()].map(x => (
        <LinkContainer key={x + 1} to={`/gallery/page/${x + 1}`}>
          <Pagination.Item active={x + 1 === page} >{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>

  )
}

export default Paginate
