import { useNavigate } from 'react-router-dom'
function Farmers({
  brands,
  brandCheck,
  setMyOrder,
  myQuery,
  setMyQuery,
  setBrandCheck,
}) {
  const navigate = useNavigate()
  return (
    <>
      <li>產地篩選</li>
      {brands.map((v, i) => {
        return (
          <li key={i}>
            <label>
              <input
                type="checkbox"
                value={v}
                checked={brandCheck.includes(i + 1)}
                onChange={(e) => {
                  setMyOrder([])
                  const deQuery = { ...myQuery }
                  delete deQuery.orderprice
                  setMyQuery(deQuery)
                  if (brandCheck.includes(i + 1)) {
                    const newBrand = brandCheck.filter((v2, i2) => {
                      return v2 !== i + 1
                    })
                    setBrandCheck(newBrand)
                    const newQuery = {
                      ...deQuery,
                      brand: newBrand.join(''),
                    }
                    setMyQuery(newQuery)
                    navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    // navigate(
                    //   `?cate=1&brand=${newBrand.join('')}`
                    // )
                  } else {
                    const newBrand = [...brandCheck, i + 1]
                    setBrandCheck(newBrand)
                    const newQuery = {
                      ...deQuery,
                      brand: newBrand.join(''),
                    }
                    setMyQuery(newQuery)
                    navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    // navigate(
                    //   `?cate=1&brand=${newBrand.join('')}`
                    // )
                  }
                }}
              />
              <span>{v}</span>
            </label>
          </li>
        )
      })}
    </>
  )
}

export default Farmers
