import React from 'react'

function Pagination(props) {
  const { totalItems, itemsPerPage, currentPage, onPageChange } = props
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleClick = (page) => {
    onPageChange(page)
  }

  return (
    <>
      <nav>
        <ul class="P-page C-pagination d-flex justify-content-center gap-3 list-unstyled font-M">
          <li
            className={currentPage === 1 ? 'C-disabled' : 'C-P-active'}
            onClick={() => handleClick(currentPage - 1)}
          >
            <div className="fa-solid fa-angle-left"></div>
          </li>
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={currentPage === page ? 'C-P-active' : ''}
              onClick={() => handleClick(page)}
            >
              <div className="f-R">{page}</div>
            </li>
          ))}
          <li
            className={currentPage === totalPages ? 'C-disabled' : ''}
            onClick={() => handleClick(currentPage + 1)}
          >
            <div className="fa-solid fa-angle-right"></div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination
