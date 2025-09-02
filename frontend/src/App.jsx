import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './page/LoginPage'
import HomePage from './page/home/HomePage'
import SignupPage from './page/SignupPage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'

function App() {
  const {user, isCheckingAuth,authCheck} = useAuthStore()
  console.log("auth user is here",user)

  useEffect(()=>{
    authCheck()
  },[])
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
