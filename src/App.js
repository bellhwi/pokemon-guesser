import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import Main from './pages/Main'
import Result from './pages/Result'
import NotFound from './pages/NotFound'
import { useDispatch } from 'react-redux'
import { setPokemonColor } from './store'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-color`).then((res) => {
      dispatch(setPokemonColor(res.data.results))
    })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/main' element={<Main />} />
      <Route path='/result' element={<Result />} />
      <Route path='/notfound' element={<NotFound />} />
    </Routes>
  )
}

export default App
