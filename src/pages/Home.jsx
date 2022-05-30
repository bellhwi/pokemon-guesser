import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <div className='home-bg'></div>
      <div className='home-content'>
        <h1 className='home-title'>Pokemon Guesser</h1>
        <p className='home-subtitle'>
          Think anyone out of
          <span className='home-number'> 1100+ Pokemon</span>
          <br></br>
          We'll guess what it is!
        </p>
        <button
          type='button'
          className='btn'
          onClick={() => {
            navigate('/main')
          }}
        >
          START
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Home
