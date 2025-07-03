const usermodel = require('../models/user_model')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}=require ('../utilities/config')

 //#region new user
const newuser = async(req,res) => {
    try{
        const user = req.body;
        if(!user){
            return res.status(404).json({status:false, data:{message:'all field mandatory'}});
        }

        const dbuser = new usermodel({name:user.name, email:user.email, password:user.password})
        await dbuser.save()
        return res.status(200).json({status:true, data:{message:"user created successfully.", data:dbuser}})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false, data:{message:"Internal server error", data:error}})
    }
}
//#endregion


const userget = async(req, res) => {
    try{
        const ali = await usermodel.find()
        return res.status(200).json({status:true, data:{message:"all data received", data:ali}})


    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false, data:{message:"Internal server error", data:error}})
        
    }
    
}

const edituser = async(req, res) => {
    
    
    try{

        const userid = req.params.id
        const user = req.body;
        
        if(!userid && user){
            return res.status(404).json({status:false, data:{message:'userid and user is not null.'}})
        }

        const dbuser = await usermodel.updateOne({_id:userid},{name:user.name,email:user.email, password:user.password})
        return res.status(200).json({status:true, data:{message:'Update successfully'}})

    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false, data:{message:"Internal server error", data:error}})
       
    }
}

const deleteuser = async(req, res) => {
    try{
        const userid = req.params.id
        await usermodel.deleteOne({_id:userid})
        return res.status(200).json({status:true, data:{message:'Delete successfully'}})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false, data:{message:"Internal server error", data:error}})
    }
}

     const login = async (req, res) => {
       try {
         const user = req.body;
         const dbuser = await usermodel.findOne({ email: user.email });

         if (!dbuser) {
           return res
             .status(404)
             .json({ status: false, data: { message: "Email not found" } });
         }

         
         if (user.password === dbuser.password) {
           const token = jwt.sign({ id: dbuser._id }, JWT_SECRET);

           dbuser.password = undefined;

           return res.status(200).json({
             status: true,
             data: {
               message: "Login successfully",
               data: dbuser,
               token: token,
             },
           });
         } else {
           return res
             .status(404)
             .json({ status: false, data: { message: "Incorrect password" } });
         }
       } catch (error) {
         console.log(error);
         return res.status(500).json({
           status: false,
           data: { message: "Internal server error", data: error },
         });
       }
     };
        const Authverify = (req, res) => {
        return res
            .status(200)
            .json({ status: true, data: { message: "Auth Success", data: req.ray } });
        };


module.exports = {newuser, userget, edituser, deleteuser,login,Authverify}
