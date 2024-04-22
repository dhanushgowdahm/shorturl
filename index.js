const express = require("express");
const path  = require('path');

const {connectToMongoDB } = require("./connect")

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const URL =require("./models/url")

const app = express();

const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongodb connected"))


app.set("view engine","ejs");
app.set("views", path.resolve("views"));


app.use(express.json()); //middleware which parse incomming request
app.use(express.urlencoded({extended:false})); //it supports both json and form
app.use("/test", async(req,res)=>{
    const allUrls = await URL.find({});
   
    return res.render('home',{
        urls:allUrls,
    });
    
});

app.use("/url",urlRoute)

app.use("/",staticRoute);

app.get('/url/:shortId',async(req, res)=> {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamps: Date.now(),
        },
    },
}
);
res.redirect(entry.redirectURL)

})

app.listen(PORT,()=> console.log(`server started at ${PORT}`))



/*



// Generating Random Short Id in Node.js
// Importing the express & shortId module
const express = require('express');


// Initializing the express and port number
var app = express();

// Initializing the router from express
var router = express.Router();
var PORT = 3000;
app.get('/api' , (req , res)=>{
   // generating short random Id
   const url="hiiii";
   const newr= short(url);
   res.send(newr);
})
// App listening on the below port
app.listen(PORT, function(err){
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});   */