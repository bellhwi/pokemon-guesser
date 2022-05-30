import { useSelector } from 'react-redux'

function Result() {
  const result = useSelector((state) => state.result)

  return (
    <div className='container'>
      <div className='result-bg'></div>
      <div className='result-img'></div>
      <div className='result-content'>
        <h4 className='result-title'>Your pokemon is...</h4>
        <div className='result-answer'>
          <img className='result-pokemon' src={result.spriteURL} />
          <p className='result-name'>{result.name.toUpperCase()}</p>
        </div>
        <button type='button' className='btn'>
          <a href='/'>Back To Home</a>
        </button>
      </div>
    </div>
  )
}

export default Result
