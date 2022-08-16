import { FaGithub, FaItchIo, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

function Footer() {
  const date = new Date()
  let year = date.getFullYear()
  return (
    <div className='footer'>
      <div className='sns'>
        <a
          href='https://www.youtube.com/channel/UCMDLPQ99Hp5o-ri25xYd0mA'
          target='_blank'
          rel='noreferrer'
        >
          <FaYoutube />
        </a>
        <a href='https://github.com/bellhwi' target='_blank' rel='noreferrer'>
          <FaGithub />
        </a>
        <a href='https://bellhwi.itch.io/' target='_blank' rel='noreferrer'>
          <FaItchIo />
        </a>
        <a
          href='https://www.linkedin.com/in/jonghwikim/'
          target='_blank'
          rel='noreferrer'
        >
          <FaLinkedinIn />
        </a>
      </div>
      <small>&copy; {year} Jonghwi Kim. All rights reserved. </small>
    </div>
  )
}

export default Footer
