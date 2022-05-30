import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPokemonShape } from '../store'
import axios from 'axios'

function Shape({ question, setQuestionCount, toPascalCase }) {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [selectedShape, setSelectedShape] = useState([])
  const [alertOn, setAlertOn] = useState('')
  const [isDefault, setIsDefault] = useState(true)

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
        <small>! Select a shape</small>
      </div>
      <div className='main-pager'>
        <span
          onClick={() => {
            if (isDefault) {
              setAlertOn('alert-on')
              setTimeout(() => {
                setAlertOn('')
              }, 2000)
              return
            }
            axios
              .get(`https://pokeapi.co/api/v2/pokemon-shape/${selectedShape}`)
              .then((res) => {
                const data = res.data.pokemon_species
                let pkmNameArr = []
                data.forEach((pkm) => {
                  pkmNameArr.push(pkm.name)
                })
                dispatch(setPokemonShape(pkmNameArr))
              })
            setQuestionCount((prev) => prev + 1)
          }}
        >
          Next &gt;
        </span>
      </div>
    </>
  )
}

export default Shape
