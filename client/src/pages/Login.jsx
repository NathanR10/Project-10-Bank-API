import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../reducers/authSlice'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const token = useSelector((state) => state.auth.token)
  const rememberMe = useSelector((state) => state.auth.rememberMe)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warningLogin, setWarningLogin] = useState(null)

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const connect = (e) => {
    // Disable default submiting reaction of form html element.
    e.preventDefault();

    axios.post('http://localhost:3001/api/v1/user/login', {
        email: username,
        password: password
    })
    .then((res) => {
      setWarningLogin(null)
      const token = res.data.body.token;
      // TODO: si rememberMe est TRUE, alors garder le token dans le localStorage, et lors de la déconnexion, vider le localStorage
      const rememberMe = true;
      dispatch(loginSuccess({ token, rememberMe }));
      return navigate('/user')
    })
    .catch((err) => {
      setWarningLogin(<div className='warningLogin'>Nom d&apos;utilisateur ou mot de passe incorrect.</div>)
      console.log('Connection failed: ' + err);
    })
  }

  useEffect(() => {
    if (rememberMe) {
      axios.post('http://localhost:3001/api/v1/user/profile', null, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        return navigate('/user')
      })
      .catch((err) => {
        console.log('Invalid token: ' + err);
        return navigate('/login')
      })
    }
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
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* PLACEHOLDER DUE TO STATIC SITE */}
          <button type="submit" className="sign-in-button">Sign In</button>
          {/* SHOULD BE THE BUTTON BELOW */}
          {/* <button className="sign-in-button">Sign In</button> */}
        </form>
      </section>
    </main>
  );
}
