import { useNavigate } from 'react-router-dom'

function Pagination({ page, totalPages, queryObj }) {
  const navigate = useNavigate()
  const qo = { ...queryObj }
  return (
    <ul className="P-page d-flex justify-content-center gap-3 list-unstyled font-M p-md-5">
      <li>
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault()
            qo.page = page - 1 === 0 ? 1 : page - 1
            const qoups = new URLSearchParams(qo).toString()
            navigate(`?${qoups}`)
          }}
        >
          <i className="fa-solid fa-angle-left"></i>
        </a>
      </li>
      {[...Array(5)].map((v, i) => {
        const p = page - 2 + i
        if (p < 1 || p > totalPages) return null
        let liClass = ''
        if (p === page) {
          liClass = 'active'
        }
        return (
          <li className={liClass} key={p}>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault()
                qo.page = p
                const qoups = new URLSearchParams(qo).toString()
                navigate(`?${qoups}`)
              }}
            >
              {p}
            </a>
          </li>
        )
      })}
      <li>
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault()
            qo.page = page + 1 > totalPages ? totalPages : page + 1
            const qoups = new URLSearchParams(qo).toString()
            navigate(`?${qoups}`)
          }}
        >
          <i className="fa-solid fa-angle-right"></i>
        </a>
      </li>
    </ul>
  )
}

export default Pagination
