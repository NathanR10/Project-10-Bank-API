import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation  } from 'react-router-dom'
import { logoutSuccess } from '../reducers/authSlice'

export default function Header () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const token = useSelector((state) => state.auth.token)

  const handleLogout = () => {
    dispatch(logoutSuccess())
    // remove localStorage
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
        !token
        ? <Link className="main-nav-item" to="/login">
            <span><i className="fa fa-user-circle"></i> Sign In</span>
          </Link>
        : location.pathname === '/user'
          ? <div className="main-nav-item" onClick={handleLogout}>
              <span><i className="fa fa-user-circle"></i> Sign Out</span>
            </div>
          : <Link className="main-nav-item" to="/user">
              <span><i className="fa fa-user-circle"></i> My Account</span>
            </Link>
      }
    </div>
  </nav>
  )
}
