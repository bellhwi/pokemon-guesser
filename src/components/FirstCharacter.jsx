import axios from 'axios'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPokemonLetter, setResult } from '../store'

function FirstCharacter({ setQuestionCount }) {
  const state = useSelector((state) => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [alertOn, setAlertOn] = useState('')
  const [isDefault, setIsDefault] = useState(true)
  const [searchedPokemonArr, setSearchedPokemonArr] = useState([])
  const firstCharacterArr = state.pokemonLetter.map((name) => {
    return name[0]
  })
  const [firstCharacterIndex, setFirstCharacterIndex] = useState(0)
  const [radioYes, setRadioYes] = useState(false)
  let firstLetterMatchedArr = []

  return (
    <>
      <h4 className='main-question'>
        Is alphabet&nbsp;
        <span className='first-character'>
          '{firstCharacterArr[firstCharacterIndex].toUpperCase()}'
        </span>
        &nbsp;the first character of your pokemon?
      </h4>
      <div className='main-answer'>
        <div className='radio-container'>
          <input
            type='radio'
            id='yes'
            name='answer'
            onClick={() => {
              const firstCharacter = firstCharacterArr[firstCharacterIndex]
              setIsDefault(false)
              setRadioYes(true)

              state.pokemonLetter.forEach((pkm) => {
                if (pkm[0] == firstCharacter[0]) {
                  firstLetterMatchedArr.push(pkm)
                }
              })
              firstLetterMatchedArr = new Set(firstLetterMatchedArr)
              firstLetterMatchedArr = Array.from(firstLetterMatchedArr)

              setSearchedPokemonArr(firstLetterMatchedArr)
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
        <small>! Please select an answer</small>
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
                if (searchedPokemonArr.length == 1) {
                  axios
                    .get(
                      `https://pokeapi.co/api/v2/pokemon/${searchedPokemonArr[0]}`
                    )
                    .then((res) => {
                      const data = res.data
                      const searchedPokemon = {
                        name: data.name,
                        spriteURL: data.sprites.front_default,
                      }

                      dispatch(setResult(searchedPokemon))
                    })
                    .then(() => navigate('/result'))
                } else {
                  setQuestionCount((prev) => prev + 1)
                }
              } else {
                state.pokemonLetter.length <= firstCharacterIndex + 1
                  ? navigate('/notfound')
                  : setFirstCharacterIndex((prev) => prev + 1)
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

export default FirstCharacter
