import { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import LoginPage from './page/LoginPage'
import HomePage from './page/home/HomePage'
import SignupPage from './page/SignupPage'
import WatchPage from './page/WatchPage'
import Footer from './components/Footer'
import SearchPage from './page/SearchPage'
import SearchHistoryPage from './page/SearchHistoryPage'

import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { Loader } from 'lucide-react'

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()
  console.log("auth user is here", user)

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black/45 h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
