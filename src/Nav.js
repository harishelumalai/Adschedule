import React from 'react'
import { Link } from 'react-router-dom'
import auth from './auth'

function Nav() {
  const navStyle = {
    color: 'white',
  }

  const handlelogout = () => {
    auth.logout(() => {})
  }

  return (
    <nav>
      <ul className='nav-links'>
        <Link style={navStyle} to='/manage_media'>
          <li>Manage Medias</li>
        </Link>
        <Link style={navStyle} to='/manage_clients'>
          <li>Manage Clients</li>
        </Link>
        <Link style={navStyle} to='/login' onClick={handlelogout}>
          <li>Logout</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
