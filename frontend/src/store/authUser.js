import axios from "axios"
import { create } from "zustand"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth:true,
    isLoggingOut:false,
    signup: async (credentials) => {
        set({ isSigningUp: true })
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials) // we set the proxy target in the vite.config so whenever there is /api postfix it will add localhost part as the prefix by it self
            set({ user: response.data.user,isSigningUp: false })
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "An error occured") // comes from backend check
            set({isSigningUp:false,user:null})
        }
    },
    login: async () => {

    },
    logout: async () => {
        set({isLoggingOut:true})
        try {
            await axios.post("/api/v1/auth/logout")
            set({user:null, isLoggingOut:false})
            toast.success("Logged out successfully")
        } catch (error) {
            set({isLoggingOut:false})
            toast.error(error.response.data.message || "Logout Failed")
        }
    },
    authCheck: async () => {
        set({isCheckingAuth: true})
        try {
            const response= await axios.get("/api/v1/auth/authCheck")
            set({user:response.data.user, isCheckingAuth:false})
        } catch (error) {
            set({isCheckingAuth:false, user:null})
    
        }
    },
}))