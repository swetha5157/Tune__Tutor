const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
   name:{type:String,required:[true,"Name is required"]},
   email:{type:String,required:[true,"Email is required"],unique:true},
   password:{type:String,required:[true,"Password is required"],unique:true}
})

userSchema.pre("save",async function(next){
    //if there is no change in pw..returns next
    //isModified is a default ftn in bcrypt
    if(!this.isModified("password")){
        return next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()
})
const User=mongoose.model('User',userSchema);
module.exports=User;