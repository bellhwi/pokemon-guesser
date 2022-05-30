import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPokemonLetter, setResult } from '../store'
import { useState } from 'react'

function Letter({ question, setQuestionCount }) {
  const state = useSelector((state) => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [alertOn, setAlertOn] = useState('')
  const [isDefault, setIsDefault] = useState(true)
  let letterMatchedArr = []

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
              return
            }

            setIsDefault(false)
            async function getDuplicateElements() {
              const pokemon = new Promise((res) =>
                res([
                  ...state.pokemonColor,
                  ...state.pokemonType,
                  ...state.pokemonShape,
                ])
              )
              const findDuplicates = (arr) =>
                arr.filter((item, index) => arr.indexOf(item) !== index)

              const result = await pokemon
              const duplicatesArr = findDuplicates(result)
              let letterLength = e.target.value

              duplicatesArr.forEach((pkm) => {
                if (pkm.length == letterLength) {
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

            getDuplicateElements()
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
