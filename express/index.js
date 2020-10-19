const express = require('express');
const bodyParser = require('body-parser')
const router = require('./routes');
const app = express();
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')
var Clothings = require('./models/clothings')
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
var corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions))

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("MyAPI").collection("Clothing");
    const mongoResult = collection.find().toArray()
    console.log("connected to MongoDB!", collection.find().toArray(function(err, result) {
        if (err) throw err;
    }));
    // perform actions on the collection object
});


app.post('/add', async (req, res) => {
    console.log("Post Arrived with ", req.body)
    await client.connect(err => {
        const data =  new Clothings({
            brand: req.body[0].brand,
            model: req.body[0].model,
            color: req.body[0].color,
            article: req.body[0].article,
            image: req.body[0].image
        })
        const collection = client.db("MyAPI").collection("Clothing");
        collection.insertOne(data)
        console.log("saved!")
    });
})

app.post('/Link', async (req, res) => {
    module.exports.link = [{link: "link"}]
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

app.get('/allDB', async (req, res) => {
    await client.connect(err => {
        const collection = client.db("MyAPI").collection("Clothing");
        collection.find().toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
})

//http://localhost:9000/brand=Any&model=Any&color=Any&article=Any&?page=1&limit=5
app.get('/brand=:brands&model=:models&color=:colors&article=:articles', async (req, res) => {
    await client.connect(err => {
        const collection = client.db("MyAPI").collection("Clothing");
        collection.find().toArray(function(err, result) {
            const limit = parseInt(req.query.limit)
            if (err) {
            res.send(err);
            } 
            else {
                var clothingResult = []
                for (var i of result){
                    if (((i.brand.includes(req.params.brands) || req.params.brands == "Any") && (i.model.includes(req.params.models) || req.params.models == "Any") && (i.color.includes(req.params.colors) || req.params.colors == "Any") && (i.article.includes(req.params.articles) || req.params.articles == "Any"))){
                        clothingResult.push({brand: removeAny(Object.values(i.brand)), model: removeAny(Object.values(i.model)), color: removeAny(Object.values(i.color)), article: removeAny(Object.values(i.article)), image: i.image});
                    }
                }
                if (clothingResult.length == 0){
                    res.send(err)
                }
                else{
                    adItems = clothingResult
                    var allBrands = []
                    var allModels = []
                    var allColors = []
                    var allArticles = []
                    for (var i of clothingResult){
                        if (!(allBrands.includes(i.brand[0]))){
                            allBrands.push(i.brand[0].trim())
                        }
                        if (!(allModels.includes(i.model[0]))){
                            allModels.push(i.model[0].trim())
                        }
                        if (!allColors.includes(i.color[0])){
                            allColors.push(i.color[0].trim())
                        }
                        if (!allArticles.includes(i.article[0])){
                            allArticles.push(i.article[0].trim())
                        }
                    }
                    var slicedClothing = {}
                    var totalPages = Math.ceil(clothingResult.length / limit)
                    for (var pages = 1; pages < totalPages + 1; pages ++){
                        slicedClothing[String(pages)] = []   
                    }
                    var pageIndex = 0;
                    for (var count = 0; count < clothingResult.length; count ++){
                        if ((count % limit) == 0){
                            pageIndex += 1
                            slicedClothing[String(pageIndex)].push(clothingResult[count])
                        }
                        else{
                            slicedClothing[String(pageIndex)].push(clothingResult[count])
                        }
                    }
                    var pageList = []
                    for (var ind = 1; ind <= totalPages; ind ++){
                        pageList.push(ind)
                    }
                    results = {}
                    results.results = slicedClothing
                    results.allBrands = [...new Set(allBrands)]
                    results.allModels = [...new Set(allModels)]
                    results.allColors = [...new Set(allColors)]
                    results.allArticles = [...new Set(allArticles)]
                    results.totalPages = totalPages
                    results.pageList = pageList
                    resulting.adItems = adItems
                    res.send(results);
                }
            }
        }); 
    });
});

app.post('/toggle', async (req, res) => {
    console.log("Post Arrived with ", req.body)
    await client.connect(err => {
        const data = {
            brand: req.body[0].brand,
            model: req.body[0].model,
            color: req.body[0].color,
            article: req.body[0].article,
        }
        const collection = client.db("MyAPI").collection("Clothing");
        collection.find().toArray(function(err, result) {
            results = []
            if (data.brand.length == 0 && data.model.length == 0 && data.color.length == 0 && data.article.length == 0){
                results = result
            }
            else{
                for (var i of result){
                    for (var o of data.brand){
                        if (i.brand.includes(o) && o != undefined){
                            results.push(i)
                        }
                    }
                }
                for (var i of result){
                    for (var o of data.model){
                        if (i.brand.includes(o) && o != undefined){
                            results.push(i)
                        }
                    }
                }
                for (var i of result){
                    for (var o of data.color){
                        if (i.brand.includes(o) && o != undefined){
                            results.push(i)
                        }
                    }
                }
                for (var i of result){
                    for (var o of data.article){
                        if (i.brand.includes(o) && o != undefined){
                            results.push(i)
                        }
                    }
                }
            }
            results = [...new Set(results)]
            displayBrands = []
            displayModels = []
            displayColors = []
            displayArticles = []
            for (var i of results){
                displayBrands.push(i.brand[0])
                displayModels.push(i.model[0])
                displayColors.push(i.color[0])
                displayArticles.push(i.article[0])
            }
            adItems = results
            allBrands = []
            allModels = []
            allColors = []
            allArticles = []
            for (var i of result){
                allBrands.push(i.brand[0])
                allModels.push(i.model[0])
                allColors.push(i.color[0])
                allArticles.push(i.article[0])
            }
            slicedClothing = {}
            allItems = []
            const limit = parseInt(req.query.limit)
            var totalPages = Math.ceil(results.length / limit)
            for (var pages = 1; pages < totalPages + 1; pages ++){
                slicedClothing[String(pages)] = []   
            }
            var pageIndex = 0;
            for (var count = 0; count < results.length; count ++){
                if ((count % limit) == 0){
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
            console.log(result)
            resulting.allItems = allItems
            resulting.totalPages = totalPages
            resulting.results = slicedClothing
            resulting.adItems = slicedClothing
            resulting.allBrands = [...new Set(allBrands)]
            resulting.allModels = [...new Set(allModels)]
            resulting.allColors = [...new Set(allColors)]
            resulting.allArticles = [...new Set(allArticles)]
            resulting.displayBrands = [...new Set(displayBrands)]
            resulting.displayModels = [...new Set(displayModels)]
            resulting.displayColors = [...new Set(displayColors)]
            resulting.displayArticles = [...new Set(displayArticles)]
            resulting.pageList = pageList
            res.send(resulting)
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
