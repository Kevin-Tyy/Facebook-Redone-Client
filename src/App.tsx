// import React from 'react'

import Login from "./pages/Auth/Login"
import HomePage from './pages/Homepage/HomePage'
import Register from './pages/Auth/Register'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound/NotFound"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App