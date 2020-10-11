const express = require('express');
const bodyParser = require('body-parser')
const router = require('./routes');
const app = express();
const Scrape = require('./webScrape')
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')
var Clothings = require('./models/clothings')
require('dotenv').config()
var cors = require('cors')

module.exports.brand = []
module.exports.model = []
module.exports.color = []
module.exports.article = []
module.exports.category = []

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
app.options('*', cors())

app.get('/', async (req, res) => {
    res.send("INDEX")
})

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
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
console.log(uri[14], uri[15], uri[16], uri[17], uri[18])
client.connect(err => {
    const collection = client.db("MyAPI").collection("Clothing");
    const mongoResult = collection.find().toArray()
    console.log("connected to MongoDB!", collection.find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result)
    }));
    // perform actions on the collection object
});


app.post('/Post', async (req, res) => {
    console.log("Post Arrived with ", req.body)
    await client.connect(err => {
        const data =  new Clothings({
            brand: req.body[0].brand,
            model: req.body[0].model,
            color: req.body[0].color,
            article: req.body[0].article,
            category: req.body[0].category,
            image: req.body[0].image
        })
        const collection = client.db("MyAPI").collection("Clothing");
        collection.insertOne(data)
        console.log("saved!")
    });
})

app.post('/Link', async (req, res) => {
    module.exports.link = [{link: "link"}]
    //Scrape.Scrape()
})

app.get('/all=brand', (req, res) => {
    
    //if (!this.brand.includes("Any")){
        //this.brand.unshift("Any")
    //}
    res.send(this.brand)
});

app.get('/all=model', (req, res) => {
    
    //if (!this.model.includes("Any")){
        //this.model.unshift("Any")
    //}
    res.send(this.model)
});

app.get('/all=color', (req, res) => {
    
    //if (!this.color.includes("Any")){
        //this.color.unshift("Any")
    //}
    res.send(this.color)
});
app.get('/all=article', (req, res) => {
    
    //if (!this.article.includes("Any")){
        //this.article.unshift("Any")
    //}
    res.send(this.article)
});
app.get('/all=category', (req, res) => {
    
    //if (!this.category.includes("Any")){
        //this.category.unshift("Any")
    //}
    res.send(this.category)
});

function removeAny(value){
    let newList = []
    for (let i = 0; i < value.length; i++){
        if (value[i] != "Any" && i == 0){
            newList.push(value[i])
        }
        if (value[i] != "Any" && i > 0){
            newList.push("+ " + value[i])
        }
    }
    return newList
}

app.get('/allDB', async (req, res) => {
    console.log("allDB arrived")
    await client.connect(err => {
        const collection = client.db("MyAPI").collection("Clothing");
        collection.find().toArray(function(err, result) {
            if (err) throw err;
            console.log("allDB result is ", result)
            res.send(result);
        });
    });
})

//http://localhost:9000/brand=Any&model=Any&color=Any&article=Any&category=Any?page=1&limit=5
app.get('/brand=:brands&model=:models&color=:colors&article=:articles&category=:categories', async (req, res) => {
    await client.connect(err => {
        const collection = client.db("MyAPI").collection("Clothing");
        collection.find().toArray(function(err, result) {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const results = {}
            if (err) {
            res.send(err);
            } 
            else {
                var clothingResult = []
                for (var i of result){
                    if (((i.brand.includes(req.params.brands) || req.params.brands == "Any") && (i.model.includes(req.params.models) || req.params.models == "Any") && (i.color.includes(req.params.colors) || req.params.colors == "Any") && (i.article.includes(req.params.articles) || req.params.articles == "Any") && (i.category.includes(req.params.categories) || req.params.categories == "Any"))){
                        clothingResult.push({brand: removeAny(Object.values(i.brand)), model: removeAny(Object.values(i.model)), color: removeAny(Object.values(i.color)), image: i.image});
                    }
                }
                const totalP = Math.ceil(clothingResult.length / limit)
                results.totalPages = totalP
                if (endIndex <= clothingResult.length + 7){
                    results.next = {
                        page: page + 1,
                        limit: limit
                    }
                }
                if (startIndex > 0){
                    results.prev = {
                        page: page - 1,
                        limit: limit
                    }
                }
                if (clothingResult.length == 0){
                    res.send(err)
                }
                else{
                    const slicedClothing = clothingResult.slice(startIndex, endIndex)
                    results.results = slicedClothing
                    res.send(results);
                }
            }
        }); 
    });
});


//const port = process.env.PORT || 9000;
app.listen(80 || process.env.PORT, 'localhost', () => console.log(`Listening on port 9000...`));
module.exports = express.router;