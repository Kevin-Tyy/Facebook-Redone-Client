// import React from 'react'

import Login from "./pages/Auth/Login"
import Register from './pages/Auth/Register'
import { BrowserRouter , Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App