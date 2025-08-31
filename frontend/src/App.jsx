import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './page/LoginPage'
import HomePage from './page/home/HomePage'
import SignupPage from './page/SignupPage'
import Footer from './components/Footer'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
