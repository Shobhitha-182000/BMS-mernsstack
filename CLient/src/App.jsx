import { useState } from 'react'
import Home from './components/Home/Home'
import {BrowserRouter,Routes,Route, Router} from 'react-router-dom'
import Signup from './components/Pages/Signup'
import Login from './components/Pages/Login'
import Dashboard from './components/MainPage/Dashboard/Dashboard'
 
 

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='//user/dashboard' element={<Dashboard/>}/>
         
      </Routes>
    </BrowserRouter>
  )
}

export default App
