import React from 'react'

import Login from "./pages/Auth/Login"
import HomePage from './pages/Homepage/HomePage'
import Register from './pages/Auth/Register'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound/NotFound"
import Posts from './components/Posts/Posts'

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App