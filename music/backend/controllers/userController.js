const User=require("../models/userModel")
const {v4:uuidv4}=require('uuid')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.login=async(req,res)=>{
    const {email,password,role}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json('Invalid mail/password')
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json("Invalid pw")
        }
        const token=jwt.sign({user_id:user._id,  role: user.role},"secret_token_key",{
            //here user._id is the mongodb id..
            expiresIn:"48h",
        });
        return res.status(200).json({token, user: {
            name: user.name,
            email: user.email,
            role: user.role,
        }});
    }catch(e){console.log(e);}
}

exports.getUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.send(users);
    }catch(e){
        console.log(e);
    }
}

exports.signup=async(req,res)=>{
    const {name,email,password,role}=req.body;
    
    try{
        const newUser=new User({
            name,email,password,role
        })
     await  newUser.save()
     return res.status(200).json('User registered successfully')
    }catch(e) {console.log(e);}
}

exports.updateUser=async(req,res)=>{
    const {id}=req.params;
    const {name,email,password}=req.body;
    try{
        const updatedUser=await User.findOneAndUpdate(
           {id:id},
           {name ,email,password},
           {new:true}
        );
        if(!updatedUser) return res.status(404).json('User not found');
        return res.status(200).json('User updated');
    }catch(e){console.log(e);}
}

exports.deleteUser=async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedUser=await User.findOneAndDelete(
            {id:id}
        );

    if(!deletedUser) return res.status(404).json('User not found');
    res.status(500).json('User deleted');
    }catch(e){console.log(e);}
}