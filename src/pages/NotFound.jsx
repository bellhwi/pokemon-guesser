import Footer from '../components/Footer'

function NotFound() {
  return (
    <div className='container'>
      <div className='notfound-bg'></div>
      <div className='notfound-content'>
        <h1 className='notfound-title'>Not Found...</h1>
        <p className='notfound-subtitle'>
          Sorry, we couldn't find your pokemon. <br></br>Please check your
          information correct and try again.
        </p>

        <a href='/main'>
          <button type='button' className='btn'>
            Try Again
          </button>
        </a>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound
