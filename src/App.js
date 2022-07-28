import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [sort, setSort] = useState('asc')
  const [data, setData] = useState([])

  const url = 'https://jsonplaceholder.typicode.com/posts'

  const fetchData = async url => {
    const res = await axios.get(url)
    const data = await res.data
    return data
  }

  const toggleSort = () => (sort === 'asc' ? setSort('desc') : setSort('asc'))

  const handleSort = () => {
    toggleSort()
    sort === 'asc' ? setData(data.sort()) : setData(data.reverse())
    sort === 'desc' ? setData(data.sort()) : setData(data.reverse())
    // setData(data.sort((a, b) => (sort === 'asc' ? 1 : -1)))
    console.log(data)
  }

  console.log(sort)

  const handleData = async () => {
    const data = await fetchData(url)
    setData(data)
  }

  useEffect(() => {
    handleData()
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
