import { User } from "../models/user.model"

export async function signup(req, res){
    try {
        const {email, password, username} = req.body
        if(!email || !password || !username) {
            return res.status(400).json({success: false, message:"All fields are required"})
        }
        const emailRegEx=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(!emailRegEx.test(email)){
            return res.status(400).json({success: false, message:"invalid email"})
        }

        if(password.length<6){
            return res.status(400).json({success: false, message:"password must be atleast 6 character long"})
        }

        const existingUserByEmail = await User.findOne({email:email})

        if(existingUserByEmail){
            return res.status(400).json({success: false, message:"Email already exists"})
        }
        const existingUserByUsername = await User.findOne({username:username})
        
        if(existingUserByUsername){
            return res.status(400).json({success: false, message:"Username already exists"})
        }

        const PROFILE_PICS = ['/avtar1.png','/avtar2.png','/avtar3.png'];

        const image = PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)]
        const newUser = new User({
            email,
            password,
            username,
            image
        })

        await newUser.save();
    } catch (error) {
        console.log("Error in the signup controller" + error.message)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
export function login(req, res){

}
export function logout(req, res){

}


//  mongodb+srv://ronaksojitra1926_db_user:BPOnMA0dFNyIVpJQ@cluster0.osy8x8x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0