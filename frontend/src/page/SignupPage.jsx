import { useState } from 'react'
import { Link } from 'react-router-dom'
import {ChevronRight} from 'lucide-react'
const SignupPage = () => {
  const [email,setEmail] = useState("")
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")

  const handleSignUp = (e) =>{
    e.preventDefault()
    console.log(email,password,username)
  }
  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className='w-52 absolute left-5' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign up</h1>

          <form className='space-y-4'onSubmit={handleSignUp} >
            <div>
              <label htmlFor="email" className='text-sm font-medium text-gray-300 block mb-1'>
                Email
              </label>
              <input type="email" className='w-full px-3 py-2 mt-p border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
              placeholder='example@email.com' 
              id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label htmlFor="username" className='text-sm font-medium text-gray-300 block mb-1'>
                Username
              </label>
              <input type="text" className='w-full px-3 py-2 mt-p border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='johndoe' id='username' value={username} onChange={(e) => setUserName(e.target.value)}/>
            </div>

            <div>
              <label htmlFor="password" className='text-sm font-medium text-gray-300 block mb-1'>
                password
              </label>
              <input type="password" className='w-full px-3 py-2 mt-p border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='••••••••' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <button className='w-full py-2 text-white bg-red-700 rounded-lg hover:bg-red-600 transition-all font-semibold' type='submit'>
              Sign up
            </button>
          </form>

          <div className='text-center text-white'>
            Already Have an account?
            <Link to={"/login"} className='text-red-500 hover:underline block'>
            Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
