import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editUserName, getUserData } from '../reducers/authSlice';

export default function User () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const firstName = useSelector(state => state.auth.firstName)
  const lastName = useSelector(state => state.auth.lastName)

  const [showEdit, setShowEdit] = useState(false)
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')

  const handleChangeNewFirstName = (e) => {
    setNewFirstName(e.target.value)
  };

  const handleChangeNewLastName = (e) => {
    setNewLastName(e.target.value)
  };

  useEffect(() => {
    dispatch(getUserData())
      .then((res) => {
        if (res.payload.succes === false) {
          return navigate('/login')
        }
      })
  }, [])
  
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
        {showEdit
        ? <div className='edit-button-gap'>
            <input
              className="edit-button-name"
              type="text"
              placeholder={firstName}
              value={newFirstName} onChange={handleChangeNewFirstName}
            />
            <input
              className="edit-button-name"
              type="text"
              placeholder={lastName}
              value={newLastName} onChange={handleChangeNewLastName}
            />
          </div>
        : <div>
            <span className='user-name'>{firstName}</span>
            &nbsp;
            <span className='user-name'>{lastName}{lastName ? '!' : '...'}</span>
          </div>}
        </h1>
        {showEdit
        ? <div className='edit-button-gap'>
            <button
              onClick={() => {
                setShowEdit(false)
                dispatch(editUserName({ firstName: newFirstName, lastName: newLastName }))
              }}
              className="edit-button"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowEdit(false)
                setNewFirstName('')
                setNewLastName('')
              }}
              className="edit-button"
            >
              Cancel
            </button>
          </div>
        : <button onClick={() => {setShowEdit(true)}} className="edit-button">Edit Name</button>}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}