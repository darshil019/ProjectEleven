import ADMIN from "../../../Models/Admin.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSignUp = async (req,res) => {
    try {
        
        const payloadData = req.body;

        const hashPassword = await bcrypt.hash(req.body.adminPassword, 10);

        payloadData.adminPassword = hashPassword;

        const newAdmin = await ADMIN.create(payloadData);

        res.json(newAdmin);

    } catch (err) {

        res.send({msg:err})
        console.log(err);

    } 
}

const adminSignIn = async (req,res) => {
    try {
        const {adminEmail,adminPassword} = req.body;

        //console.log(adminPassword)
        
        if(!adminEmail || !adminPassword) {
            return res.status(400).send({ msg: "Email and password are required" });
        }

        const findUserData = await ADMIN.findOne({ where : {adminEmail}})

        //console.log(findUserData.adminPassword)

        if (findUserData) {
             const isMatch = await bcrypt.compare(adminPassword,findUserData.adminPassword);

            if(isMatch) {
                const checkJWT = jwt.sign({email : adminEmail},process.env.JWT_SECRET, { expiresIn: '1h' }) 
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

export {adminSignUp,adminSignIn}