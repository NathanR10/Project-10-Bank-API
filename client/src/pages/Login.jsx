import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from '../reducers/authSlice';

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogged = JSON.parse(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token'))

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [warningLogin, setWarningLogin] = useState(null)

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  };

  const handleChangeRememberMe = (e) => {
    setRemember(e.target.checked)
  };

  const connect = (e) => {
    e.preventDefault()

    dispatch(getToken({ username, password, remember }))
      .then((res) => {
        if (res.payload.succes) {
          setWarningLogin(null)
          navigate('/user')
        } else {
          setWarningLogin(<div className='warningLogin'>Nom d&apos;utilisateur ou mot de passe incorrect.</div>)
        }
      })
  };

  useEffect(() => {
    isLogged && navigate('/user')
  }, [])

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        {warningLogin}
        <form onSubmit={connect}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required value={username} onChange={handleChangeUsername} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required value={password} onChange={handleChangePassword} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={remember} onChange={handleChangeRememberMe} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}
