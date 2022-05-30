import { useState } from 'react'
import Color from '../components/Color'
import Type from '../components/Type'
import Shape from '../components/Shape'
import Letter from '../components/Letter'
import FirstCharacter from '../components/FirstCharacter'
import LastCharacter from '../components/LastCharacter'

function Main() {
  const [questionCount, setQuestionCount] = useState(0)
  const questions = [
    { type: 'color', title: 'What is the closest color of your pokemon?' },
    {
      type: 'type',
      title: 'What is the type of your pokemon? If dual type, just pick one.',
    },
    {
      type: 'shape',
      title: 'What is the nearest shape of your pokemon?',
    },
    {
      type: 'letter',
      title: 'How many letters of your pokemon?',
    },
  ]
  const components = [
    <Color
      question={questions[0].title}
      setQuestionCount={setQuestionCount}
      toPascalCase={toPascalCase}
    />,
    <Type
      question={questions[1].title}
      setQuestionCount={setQuestionCount}
      toPascalCase={toPascalCase}
    />,
    <Shape
      question={questions[2].title}
      setQuestionCount={setQuestionCount}
      toPascalCase={toPascalCase}
    />,
    <Letter
      question={questions[3].title}
      setQuestionCount={setQuestionCount}
    />,
    <FirstCharacter setQuestionCount={setQuestionCount} />,
    <LastCharacter />,
  ]

  function toPascalCase(str) {
    return (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {
      return chr.toUpperCase()
    })
  }

  return (
    <div className='container'>
      <div className='main-bg'></div>
      <div className='main-img'></div>
      <div className='main-content'>{components[questionCount]}</div>
    </div>
  )
}

export default Main
