import { Comparepassword, hashpassword } from "../Helper/AuthHelper.js";
import UserModel from "../Models/UserModel.js"
import jwt from "jsonwebtoken";

// Register Controller 
export const RegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).send({
                success: false,
                message: "All Fields Are Required."
            })
        }

        //  Check Existing User 

        const Existing = await UserModel.findOne({ email: email })
        if (Existing) {
            return res.status(200).send({
                success: false,
                message: "User Allready Register."
            })
        }

        const hashedpassword = await hashpassword(password);

        // Register New User 
        const user = await UserModel({ name, email, password: hashedpassword }).save()
        return res.status(201).send({
            success: true,
            message: "Register successfuly.",
            user,

        })

    } catch (error) {
        console.log(error)
    }
}

// Login Controller 
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({
                success: false,
                message: "All Fields are Required."
            })
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "User Not Registred.Please Register."
            })
        }

        const match = Comparepassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password."
            })
        }

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_Secret, { expiresIn: '7d' })
        res.status(201).send({
            success: true,
            message: "Login Successfuly.",
            user: {
                name: user.name,
                email: user.email,
                Role: user.Role
            },
            token,
        })

    } catch (error) {
        console.log(error)
    }

}

