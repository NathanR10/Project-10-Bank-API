import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import User from '../pages/User'
import NotFound from '../pages/NotFound'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../pages/Login'

/**
 * AppRouter is a React component that defines the routing configuration of the project.
 *
 * @returns {JSX.Element}
 */

function AppRouter () {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/login/" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/user/" element={<User />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      <Footer />
    </Router>
  )
}

export default AppRouter
