import axios from 'axios'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setResult } from '../store'

function LastCharacter() {
  const pokemonLetter = useSelector((state) => state.pokemonLetter)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [alertOn, setAlertOn] = useState('')
  const [isDefault, setIsDefault] = useState(true)
  const lastCharacterArr = pokemonLetter.map((name) => {
    return name.slice(-1)
  })
  const [lastCharacterIndex, setLastCharacterIndex] = useState(0)
  const [radioYes, setRadioYes] = useState(false)

  return (
    <>
      <h4 className='main-question'>
        Is alphabet&nbsp;
        <span className='last-character'>
          '{lastCharacterArr[lastCharacterIndex].toUpperCase()}'
        </span>
        &nbsp;the last character of your pokemon?
      </h4>
      <div className='main-answer'>
        <div className='radio-container'>
          <input
            type='radio'
            id='yes'
            name='answer'
            onClick={() => {
              setIsDefault(false)
              setRadioYes(true)

              axios
                .get(
                  `https://pokeapi.co/api/v2/pokemon/${pokemonLetter[lastCharacterIndex]}`
                )
                .then((res) => {
                  const data = res.data
                  const searchedPokemon = {
                    name: data.name,
                    spriteURL: data.sprites.front_default,
                  }

                  dispatch(setResult(searchedPokemon))
                })
            }}
          />
          <label htmlFor='yes'> Yes</label>
        </div>
        <div className='radio-container'>
          <input
            type='radio'
            id='no'
            name='answer'
            onClick={() => {
              setIsDefault(false)
              setRadioYes(false)
              dispatch(setResult({}))
            }}
          />
          <label htmlFor='no'> No</label>
        </div>
      </div>
      <div className={`alert ${alertOn}`}>
        <small>! Select an answer</small>
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
              if (radioYes) {
                navigate('/result')
              } else {
                pokemonLetter.length <= lastCharacterIndex + 1
                  ? navigate('/notfound')
                  : setLastCharacterIndex((prev) => prev + 1)
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

export default LastCharacter
