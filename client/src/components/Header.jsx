import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation  } from 'react-router-dom'
import { logout } from '../reducers/authSlice'

export default function Header () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isLogged = JSON.parse(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token'))
  const firstName = useSelector(state => state.auth.firstName)

  const handleLogout = () => {
    dispatch(logout())
    return navigate('/')
  }

  return (
    <nav className="main-nav">
    <Link className="main-nav-logo" href="./index.html" to="/">
      <img
        className="main-nav-logo-image"
        src="/assets/argentBankLogo.png"
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
    <div className="main-nav-item">
      {
        !isLogged
        ? <Link className="main-nav-item" to="/login">
            <span><i className="fa fa-user-circle"></i> Sign In</span>
          </Link>
        : location.pathname === '/user'
          ? <div className="main-nav-item">
              <span><i className="fa fa-user-circle"></i> {firstName}</span>
              <span onClick={handleLogout} className='main-nav-item__hover'><i className="fa fa-sign-out"></i> Sign Out</span>
            </div>
          : <Link className="main-nav-item" to="/user">
              <span><i className="fa fa-user-circle"></i> My Account</span>
            </Link>
      }
    </div>
  </nav>
  )
}
