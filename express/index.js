const express = require('express');
const bodyParser = require('body-parser')
const router = require('./routes');
const app = express();
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')
var Products = require('./models/products')
var Users = require('./models/users')
require('dotenv').config()
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use('/clothing', router)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const path = require('path');
const { url } = require('inspector');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const whitelist = ['http://localhost:3000', 'http://localhost:9000', 'https://shrouded-journey-38552.heroku...']
var corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions))

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("MyAPI").collection("Products");
    const mongoResult = collection.find().toArray()
    console.log("connected to MongoDB!")
    // perform actions on the collection object
});

app.get('/', async (req, res) => {
    res.send("Server's up")
})

app.post('/API/sell', async (req, res) => {
    console.log("Post Arrived with ", req.body)
    await client.connect((error, result) => {
        const data =  new Products({
            name: req.body.name,
            brand: req.body.brand,
            color: req.body.color,
            article: req.body.article,
            size: req.body.size,
            description: req.body.description,
            condition: req.body.condition,
            userID: req.body.userID,
            price: req.body.price
        })
        const collection = client.db("MyAPI").collection("Products");
        collection.insertOne(data)
        console.log("saved!")
        if (error){
            res.send(error)
        }
        else {
            res.send("OOO")
        }  
    });
})

function removeAny(value){
    let newList = []
    for (let i = 0; i < value.length; i++){
        if (value[i] != "Any" && i == 0){
            newList.push(value[i])
        }
        if (value[i] != "Any" && i > 0){
            newList.push(value[i])
        }
    }
    return newList
}

app.get('/API/allProducts', async (req, res) => {
    await client.connect(err => {
        const collection = client.db("MyAPI").collection("Products");
        collection.find().toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
})
var ObjectId = require('mongodb').ObjectID;
app.get('/API/products/:id', async (req, res) => {
    await client.connect(err => {
        const collection = client.db("MyAPI").collection("Products");
        collection.findOne({ _id: ObjectId(req.params.id) }, (function(err, result) {
            if (err) throw err;
            else {
                res.send(result)
            }
        }));
    });
})

/*
app.get('/API/popular', async (req, res) => {
    await client.connect(err => {
        const collection = client.db("MyAPI").collection("Products");
        console.log(collection.aggregate([
            {
                $group: {
                    _id: '$color',
                    count: { $sum: 1 }
                }
            }
        ])), function(err, result) {
            if (err){console.log(err)}
            console.log(result)
        }
    })
})
*/

function capitalize(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

app.post('/API/products', async (req, res) => {
    console.log("TOGGLE Post Arrived with ", req.body, "\n")
    await client.connect(err => {
        const data = {
            brand: req.body.brand,  //["nike", "adidas"]
            article: req.body.article,  //["footwear", "top"]
            price: req.body.price,  //["0", "50"]
            condition: req.body.condition,  //["used", "new"]
            size: req.body.size, //["m", "s"]
            limit: req.body.limit
        }
        console.log("DATA\n", data)
        const collection = client.db("MyAPI").collection("Products");
        collection.find().toArray(function(err, result) {
            results = []
            if (data.brand.length == 0 && data.article.length == 0 && data.condition.length == 0 && data.size.length == 0){
                for (var i of result){
                    if (i.price >= data.price[0] && i.price <= data.price[1]){
                        results.push(i)
                    }
                }
            }
            else{
                for (var i of result){
                    if ((i.brand).some(v => data.brand.includes(v)) || data.brand.length == 0){
                        if ((i.price >= data.price[0] && i.price <= data.price[1]) && (data.article.includes(i.article) || data.article.length == 0) && (data.condition.includes(i.condition) || data.condition.length == 0) && (data.size.includes(i.size) || data.size.length == 0)){
                            results.push(i)
                        }
                    }
                }
            }
            allBrands = {}
            allArticles = {"Top": 0, "Bottom": 0, "Footwear": 0, "Accessory": 0}
            for (var i of result){
                for (var o of i.brand) {
                    if (!(Object.keys(allBrands).includes(capitalize(o)))){
                        allBrands[capitalize(o)] = 1
                    }
                    else{
                        allBrands[capitalize(o)] = allBrands[capitalize(o)] += 1
                    }
                }
            }
            for (var i of results){
                if (Object.keys(allArticles).includes(capitalize(i.article))){
                    allArticles[capitalize(i.article)] = allArticles[capitalize(i.article)] += 1
                }
            }
            adItems = results
            slicedClothing = {}
            allSliced = []
            allItems = []
            var totalPages = Math.ceil(results.length / data.limit)
            for (var pages = 1; pages < totalPages + 1; pages ++){
                slicedClothing[String(pages)] = []   
            }
            var pageIndex = 1;
            for (var count = 0; count < results.length; count ++){
                if ((count % data.limit) == 0 && count != 0){
                    pageIndex += 1
                    slicedClothing[String(pageIndex)].push(results[count])
                    allItems.push(results[count])
                }
                else{
                    slicedClothing[String(pageIndex)].push(results[count])
                    allItems.push(results[count])
                }
            }
            pageList = []
            for (var ind = 1; ind <= totalPages; ind ++){
                pageList.push(ind)
            }
            resulting = {}
            resulting.totalPages = totalPages
            resulting.totalItems = allItems.length
            resulting.allItems = allItems
            resulting.pageItems = slicedClothing
            resulting.allBrands = allBrands
            resulting.allArticles = allArticles
            resulting.pageList = pageList
            res.send(resulting)
        })
    })
})

app.post('/API/login', async (req, res) => {
    console.log("LOGIN Post Arrived with ", req.body)
    var response = {}
    await client.connect(err => {
        const payLoad = new Users({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            watchList: {},
            cart: [],
            sold: {},
            bought: {},
            history: [],
            joined: ""
        })
        const users = client.db("MyAPI").collection("Users");
        users.find().toArray(function(err, result) {
            var userExists = false
            for (var i of result){
                if (i.email == payLoad.email && i.password == payLoad.password){
                    userExists = true
                    var userName = i.userName
                    var userEmail = i.email
                    var userID = i._id
                }
            }
            if (!payLoad.email.includes("@") || !payLoad.email.includes(".") || payLoad.email.length < 6 || payLoad.password.length < 5) {
                if (req.body.mode == "signup"){
                    response.signup = false
                }
                else {
                    response.login = false
                }
                response.message = "Invalid email or password, please try again."
                res.send(response)
            }
            else if (req.body.mode == "signup") {
                if (userExists){
                    response.signup = false
                    response.message = "Signup failed, user already exists."
                    res.send(response)
                }
                else {
                    response.signup = true
                    response.message = "Signup successful, you may now login. \nWelcome to WearAPI!"
                    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var d = new Date();
                    var docId = 0;
                    payLoad.joined = months[d.getMonth()] + " " +d.getDate() + ", " + d.getFullYear()
                    users.insertOne(payLoad, function(err,docsInserted){
                        docId = docsInserted['insertedId'].toString();
                        response.id = docId
                        response.userName = payLoad.userName
                        response.email = payLoad.email
                        res.send(response)
                    });
                }
            }
            else if (req.body.mode == "login"){
                if (userExists){
                    response.login = true
                    response.userName = userName
                    response.email = userEmail
                    response.id = userID
                    response.message = "Loging you in, please wait."
                    res.send(response)
                }
                else {
                    response.login = false
                    response.message = "Login failed, user not found."
                    res.send(response)
                }
            }
        })
    })
})


/*
            for (var i of results){
                if (i.brand.length > 0){
                    if (!(allBrands.includes(i.brand[0]))){
                        allBrands.push(i.brand[0].trim())
                    }
                }
                if (i.model.length > 0){
                    if (!(allModels.includes(i.model[1]))){
                        allModels.push(i.model[0].trim())
                    }
                }
                if (i.color.length > 0){
                    if (!allColors.includes(i.color[1])){
                        allColors.push(i.color[0].trim())
                    }
                }
                if (i.article.length > 0){
                    if (!allArticles.includes(i.article[1])){
                        allArticles.push(i.article[0].trim())
                    }
                }
            }

*/

//const port = process.env.PORT || 9000;
app.listen(9000, () => console.log(`Listening on port 9000...`));
module.exports = express.router;
