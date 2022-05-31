import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPokemonShape, setPokemonDuplicates } from '../store'
import axios from 'axios'

function Shape({
  question,
  setQuestionCount,
  toPascalCase,
  setDuplicateElements,
}) {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [selectedShape, setSelectedShape] = useState([])
  const [alertOn, setAlertOn] = useState('')
  const [isDefault, setIsDefault] = useState(true)

  useEffect(() => {
    const mergedPokemonArr = [...state.pokemonColor, ...state.pokemonType]
    setDuplicateElements(mergedPokemonArr)
  }, [])
  return (
    <>
      <h4 className='main-question'>{question}</h4>
      <div className='main-answer'>
        <select
          className='main-select'
          defaultValue='default'
          onChange={(e) => {
            setSelectedShape(e.target.value)
            setIsDefault(false)
          }}
        >
          <option value='default' disabled hidden>
            Choose a shape
          </option>
          {state.pokemonShape.map((type, index) => {
            return (
              <option key={index} value={type.name}>
                {toPascalCase(type.name)}
              </option>
            )
          })}
        </select>
      </div>
      <div className={`alert ${alertOn}`}>
        <small>! Please select a shape</small>
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
              if (selectedShape !== 'Not sure') {
                axios
                  .get(
                    `https://pokeapi.co/api/v2/pokemon-shape/${selectedShape}`
                  )
                  .then((res) => {
                    const data = res.data.pokemon_species
                    let pkmNameArr = []
                    data.forEach((pkm) => {
                      pkmNameArr.push(pkm.name)
                    })
                    dispatch(setPokemonShape(pkmNameArr))
                  })
                  .then(() => setQuestionCount((prev) => prev + 1))
              } else {
                setQuestionCount((prev) => prev + 1)
                dispatch(setPokemonShape([]))
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

export default Shape
