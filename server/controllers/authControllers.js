import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , { expiresIn : "7d" });
}

export const register = async ( req , res ) => {
    try {
        const{ Name , email , password } = req.body

        if( !Name || !email || !password ){
            return res.status(400).json({message : "All fields are required"});
        }

        const existeingUser = await User.findOne({ email });
        if( existeingUser ){
            return res.status(400).json({ message : "This user already exist"});
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await User.create({ Name , email, password : hashedPassword });

        res.status(201).json({
            _id : user._id ,
            Name : user.Name , 
            email : user.email ,
            token : generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}


export const login = async ( req , res ) => {
    try {
        const { email , password } = req.body ;

        const user = await User.findOne({ email });

        if( user && ( await bcrypt.compare(password , user.password ))){
            return res.status(201).json({
                _id : user._id ,
                Name : user.Name ,
                email : user.email ,
                token : generateToken(user._id)
            })
        }else {
            res.status(401).json({ message : "Invalid email or password"});
        }

    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}