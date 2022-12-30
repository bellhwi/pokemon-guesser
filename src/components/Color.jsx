import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPokemonColor, setPokemonType } from '../store'
import axios from 'axios'

function Color({ question, setQuestionCount, toPascalCase }) {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [selectedColor, setSelectedColor] = useState([])
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
            setSelectedColor(e.target.value)
            setIsDefault(false)

            // Fetch API for the next question
            axios.get('https://pokeapi.co/api/v2/type').then((res) => {
              let data = res.data.results
              data.splice(18, 2)
              dispatch(setPokemonType(data))
            })
          }}
        >
          <option value='default' disabled hidden>
            Choose a color
          </option>
          {state.pokemonColor.map((color, index) => {
            return (
              <option key={index} value={color.name}>
                {toPascalCase(color.name)}
              </option>
            )
          })}
        </select>
      </div>
      <div className={`alert ${alertOn}`}>
        <small>! Please select a color</small>
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
              // Fetch API based on user selection
              axios
                .get(`https://pokeapi.co/api/v2/pokemon-color/${selectedColor}`)
                .then((res) => {
                  const data = res.data.pokemon_species
                  let pkmNameArr = []
                  data.forEach((pkm) => {
                    pkmNameArr.push(pkm.name)
                  })
                  dispatch(setPokemonColor(pkmNameArr))
                })
                .then(() => setQuestionCount((prev) => prev + 1))
            }
          }}
        >
          Next &gt;
        </span>
      </div>
    </>
  )
}

export default Color
