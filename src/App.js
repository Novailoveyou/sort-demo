import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [sort, setSort] = useState('asc')
  const [data, setData] = useState([])

  const url = 'https://jsonplaceholder.typicode.com/posts'

  const fetchData = async (url, reversed = false) => {
    const res = await axios.get(url)
    const data = await res.data
    return reversed ? data.reverse() : data
  }

  const toggleSort = () => (sort === 'asc' ? setSort('desc') : setSort('asc'))

  const handleSort = () => {
    toggleSort()
    sort === 'asc' ? handleData(url) : handleData(url, true)
    sort === 'desc' ? handleData(url) : handleData(url, true)
  }

  const handleData = async (url, reversed = false) => {
    const data = await fetchData(url, reversed)
    setData(data)
  }

  useEffect(() => {
    handleData(url)
  }, [])

  // console.log(data)

  // console.log(data.sort((a, b) => (sort === 'asc' ? 1 : -1)))

  return (
    <div className='App'>
      <h1>Sort demo</h1>
      <button onClick={handleSort}>Sort</button>
      {data && data?.length > 0 && (
        <div>
          <p>Sort direction: {sort}</p>
          <ul>
            {data.map((item, idx) => (
              <li key={item.id}>
                <p>{item.userId}</p>
                <p>{item.title}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
