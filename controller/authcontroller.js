const admin =require("../model/Adminmodel");

const createuser = async(req,res)=>{
    username= req.body.username;
    password= req.body.password;
    const find_user = await admin.findOne({username:username});
    if(!find_user){
        const newuser= await admin.create({
            username:username,
            password:password
        })
        res.json(newuser)
    }
    else{
        res.send("user already exist")
    }
}
const getuser = async(req,res)=>{
    username= req.body.username;
    password= req.body.password;
    const find_user = await admin.findOne({username:username,password:password});
    if(!find_user){
        res.status(401).json({
            message:"invalid user",
        })
    }
    else{
        res.status(200).json({
            message:"valid user",
            find_user
        })
    }
}
module.exports ={createuser,getuser};