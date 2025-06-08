const User = require('../Models/User.js')
// const User = require('/Models/User.js')

const loginController = async(req,res) =>{

    try {
        const {userId,password} = req.body;
        console.log(userId,password);
        const user = await User.findOne({userId});
        if(!user){
            
            return res.status(404).json({msg:"Plz Enter Valid Credentials"});
        }
        if(user.password !== password){
            return res.status(201).json({msg:"Plz Enter Valid Credentials2"});
        }
        // console.log(user)
        return res.status(200).json({msg:"Login Successfull!!!",user});
        
    } catch (error) {
        console.log(error)
        res.send("error" );
    }
}


const signupController = async(req,res) =>{

    try {
        const {userId,password} = req.body;
        // console.log(userId,password);
        const user = await User.findOne({userId:userId});
        if(user){
            return res.status(201).json({msg:"User Id Alerady Exists"});
        }
        const newUser = new User({userId,password});
        await newUser.save();
        return res.status(200).json({msg:"Signup Successfull!!!",newUser});
        
    } catch (error) {
        console.log(error)
        res.send("error" );
    }

}

module.exports = {loginController,signupController};