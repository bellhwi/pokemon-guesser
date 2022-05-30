import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPokemonType, setPokemonShape } from '../store'
import axios from 'axios'

function Type({ question, setQuestionCount, toPascalCase }) {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [selectedType, setSelectedType] = useState([])
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
            setSelectedType(e.target.value)
            setIsDefault(false)

            axios.get('https://pokeapi.co/api/v2/pokemon-shape').then((res) => {
              dispatch(setPokemonShape(res.data.results))
            })
          }}
        >
          <option value='default' disabled hidden>
            Choose a type
          </option>
          {state.pokemonType.map((type, index) => {
            return (
              <option key={index} value={type.name}>
                {toPascalCase(type.name)}
              </option>
            )
          })}
        </select>
      </div>
      <div className={`alert ${alertOn}`}>
        <small>! Select a type</small>
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
              .get(`https://pokeapi.co/api/v2/type/${selectedType}`)
              .then((res) => {
                const data = res.data.pokemon
                let pkmNameArr = []
                data.forEach((pkm) => {
                  pkmNameArr.push(pkm.pokemon.name)
                })
                dispatch(setPokemonType(pkmNameArr))
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

export default Type
