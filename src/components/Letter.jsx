import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPokemonLetter, setResult } from '../store'
import { useState, useEffect } from 'react'

function Letter({ question, setQuestionCount, setDuplicateElements }) {
  const state = useSelector((state) => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [alertOn, setAlertOn] = useState('')
  const [isDefault, setIsDefault] = useState(true)

  useEffect(() => {
    if (state.pokemonShape.length == 0) return
    const mergedPokemonArr = [...state.pokemonDuplicates, ...state.pokemonShape]
    setDuplicateElements(mergedPokemonArr)
  }, [])
  return (
    <>
      <h4 className='main-question'>{question}</h4>
      <div className='main-answer'>
        <input
          type='text'
          autoFocus
          placeholder='Type a number of characters'
          className='letter-input'
          onChange={(e) => {
            if (isNaN(e.target.value) || e.target.value.trim().length == 0) {
              setIsDefault(true)
              setAlertOn('alert-on')
              setTimeout(() => {
                setAlertOn('')
              }, 2000)
            } else {
              setIsDefault(false)

              let letterMatchedArr = []
              state.pokemonDuplicates.forEach((pkm) => {
                if (pkm.length == e.target.value) {
                  letterMatchedArr.push(pkm)
                }
              })

              dispatch(setPokemonLetter(letterMatchedArr))

              if (letterMatchedArr.length == 1) {
                axios
                  .get(
                    `https://pokeapi.co/api/v2/pokemon/${letterMatchedArr[0]}`
                  )
                  .then((res) => {
                    const data = res.data
                    const searchedPokemon = {
                      name: data.name,
                      spriteURL: data.sprites.front_default,
                    }

                    dispatch(setResult(searchedPokemon))
                  })
              }
            }
          }}
        />
      </div>
      <div className={`alert ${alertOn}`}>
        <small>! Type a number</small>
      </div>
      <div className='main-pager'>
        <span
          onClick={() => {
            if (isDefault) {
              setAlertOn('alert-on')
              setTimeout(() => {
                setAlertOn('')
              }, 2000)
            } else {
              if (state.pokemonLetter.length == 1) {
                navigate('/result')
              } else {
                state.pokemonLetter.length == 0
                  ? navigate('/notfound')
                  : setQuestionCount((prev) => prev + 1)
              }
            }
          }}
        >
          Next &gt;
        </span>
      </div>
    </>
  )
}

export default Letter
