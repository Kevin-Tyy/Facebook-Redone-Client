import React from 'react'

import Login from "./pages/Auth/Login"
import HomePage from './pages/Homepage/HomePage'
import Register from './pages/Auth/Register'
import { BrowserRouter , Navigate, Route, Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound/NotFound"
import Posts from './components/Posts'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'
import { loggedInUser } from './redux/features/AuthSlice'
const App = () => {
  const { loggedIn } = useSelector(loggedInUser)
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={loggedIn ? <HomePage/> : <Navigate to="/login"/>}/>
          <Route path='/posts' element={loggedIn ? <Posts/> : <Navigate to="/login"/> }/>
          <Route path='/users/:id' element={loggedIn ? <Profile/> : <Navigate to="/login"/>}/>
          <Route path='/' element={loggedIn ? <Navigate to="/home"/> : <Navigate to="/login"/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App