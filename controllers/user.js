const { v4: uuidv4 } = require('uuid');

const User = require("../models/user")
const {setUser}= require("../service/auth")
async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,

    });

    
    return res.render("home");
};

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({ email,password });
    console.log(user);
    if(!user) return res.render('login',{
        error: "invalid username or password"
    });

    const sessionId = uuidv4();
    setUser(sessionId, user)
    res.cookie("uid",sessionId);
    return res.redirect("/");
};


module.exports={
    handleUserSignup,
    handleUserLogin,
};