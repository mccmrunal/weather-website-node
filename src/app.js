const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { request } = require('http');

const app = express();
const publicDir = path.join(__dirname,"..","/public/");
const port = process.env.PORT || 3000;

//define paths for Express config
const viewsPath = path.join(__dirname,"../src/templates/views")
const partialsPath = path.join(__dirname,"../src/templates/partials")

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Mrunal"
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Jett",
        name:"Mrunal Chaudhari"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Welcome to Help Page",
        name:"Mrunal Chaudhari"
    })
})


            
app.use(express.static(publicDir))


app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error:"must provide search term"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"address is needed"
        })
    }
    geocode(req.query.address,(error,{lat,long,place}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(lat,long,(error,response,img)=>{
            if(error){
                return res.send({error});
            }
            return res.send({
                forecast:response,
                place:place,
                address:req.query.address,
                img
            })
        }) 
        return
    })

    // res.send([{
    //     location:req.query.address,
    //     forecast:[{
    //         temp:20,
    //         type:"cool"
    //     }]
    // }])
})

app.get("/help/*",(req,res)=>{
    res.send("article not found")
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"SORRY WRONG PAGE",
        name:"Mrunal Chaudhari"
    })
})

//server starts here
app.listen(port,()=>{
    console.log("server is up on port !" + port)
})