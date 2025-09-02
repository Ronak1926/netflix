import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { genTokenAndSetCookie } from "../utils/generateToken.js"
import { ENV_VARS } from "../config/envVars.js"
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!emailRegEx.test(email)) {
            return res.status(400).json({ success: false, message: "invalid email" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password must be atleast 6 character long" })
        }

        const existingUserByEmail = await User.findOne({ email: email })

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }
        const existingUserByUsername = await User.findOne({ username: username })

        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" })
        }
        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)


        const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        })


        genTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: ""
            }
        })

    } catch (error) {
        console.log("Error in the signup controller" + error.message)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function login(req, res) {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const user = await User.findOne({email:email})

        if(!user) {
            return res.status(404).json({success:false,message:"No such user!"})
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(404).json({success:false,message:"invalid Password!"})
        }

        genTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            user:{
                ...user._doc,
                password: ""
            }
        })

    } catch (error) {
        console.log("Errro in login controller",error.message)
        res.status(500).json({success:false, message:"internal server error"})
    }
}
export function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix", {
            httpOnly: true,
            sameSite: "strict",
            secure: ENV_VARS.NODE_ENV !== "development",
        })
        res.status(200).json({success: true, message: "logged out successfuly"})
    } catch (error) {
        console.log("Error in the logout controller", error.message)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}


export async function authCheck(req, res) {
    try {
        res.status(200).json({success:true, user:req.user})
    } catch (error) {
        console.log("Error in authCheck controller", error.message)
        res.status(500).json({success:false, message: "internal server error"})
    }
}