import { LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authUser'
const HomeScreen = () => {
    const {logout} = useAuthStore()
    return (
        <div>
            Homescreen
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default HomeScreen
