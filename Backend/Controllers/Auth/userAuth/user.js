import User from "../../../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSignUp = async (req,res) => {
    try {
        console.log(req.body);
        const payloadData = req.body;
 
        const hashPassword = await bcrypt.hash(req.body.userPassword, 10);
        payloadData.userPassword = hashPassword;
        const newUser = await User.create(payloadData);

        res.json(newUser);
    } catch (err) {
        res.send({msg:err})
        console.log(err);
    }
}

const userSignIn = async (req,res) => {
    try {
        const {userEmail,userPassword} = req.body;
        //console.log(userPassword)
        if(!userEmail || !userPassword) {
            return res.status(400).send({ msg: "Email and password are required" });
        }

        const findUserData = await User.findOne({ where : {userEmail}})
        //console.log(findUserData.userPassword)
        if (findUserData) {
             const isMatch = await bcrypt.compare(userPassword,findUserData.userPassword);

            if(isMatch) {
                const checkJWT = jwt.sign({email : userEmail},process.env.JWT_SECRET, { expiresIn: '1h' }) 
                res.send({
                    token : checkJWT
                })  
            } else {
                return res.send({msg:"Invalid email or password"})
            }
        } else {
            return res.send({msg:"Invalid email or password"})
        }
        
    } catch (err) {
        res.send({msg:err})
        console.log(err);
    }
}

export {userSignUp,userSignIn};