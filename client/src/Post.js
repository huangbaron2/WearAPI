import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Form } from 'react-bootstrap'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = [
                    {brand:"Any"},
                    {model:"Any"},
                    {color:"Any"},
                    {article:"Any"},
                    {category:"Any"},
                    {image:"Any"}
                    ];
        this.brandChange = this.brandChange.bind(this)
        this.colorChange = this.colorChange.bind(this)
        this.articleChange = this.articleChange.bind(this)
        this.modelChange = this.modelChange.bind(this)
        this.categoryChange = this.categoryChange.bind(this)
        this.imageChange = this.imageChange.bind(this)
        this.submitPost = this.submitPost.bind(this)
        this.goatChange = this.goatChange.bind(this)
        this.submitLink = this.submitLink.bind(this)
    };

    brandChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({brand: (e.target.value.split(','))})
        }
        else{
            newL = [e.target.value]
            this.setState(this.state.brand = newL, console.log(this.state.brand))
        }
    }
    modelChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({model: (e.target.value.split(','))})
        }
        else{
            newL = [e.target.value]
            this.setState(this.state.model = newL, console.log(this.state.model))
        }
    }
    colorChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({color: e.target.value.split(',')})
        }
        else{
            newL = [e.target.value]
            this.setState(this.state.color = newL, console.log(this.state.color))
        }
    }
    articleChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({article: (e.target.value.split(','))})
        }
        else{
            newL = [e.target.value]
            this.setState(this.state.article = newL, console.log(this.state.article))
        }
    }
    categoryChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({category: (e.target.value.split(','))})
        }
        else{
            newL = [e.target.value]
            this.setState(this.state.category = newL, console.log(this.state.category))
        }
    }
    imageChange (e) {
        this.setState(
            {image: e.target.value},
            console.log(this.state.image)
        )
    }

    nextPost(clothing){
        fetch('http://localhost:9000/Post', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(clothing)
        })
    }

    submitPost (event) {
        event.preventDefault();
        const clothing = [{
            brand: this.state.brand,
            model: this.state.model,
            color: this.state.color,
            article: this.state.article,
            category: this.state.category,
            image: this.state.image
          }];
        this.nextPost(clothing)
    }

    goatChange (event) {
        console.log(event.target.value)
    }

    submitLink (event) {
        event.preventDefault()
        fetch('http://localhost:9000/Link', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({something: "More"})
        })
        console.log("Submit")
    }

    render(){
        return(
            <div className = 'postBox'>
                    <form className = 'postForm' onSubmit = { this.submitPost }>
                        Enter the brand <input type="text" id = "brandInput" placeholder = "Brand" onChange={ this.brandChange }/>
                        <br/>
                        Enter the model <input type="text" id = "modelInput" placeholder = "Model" onChange={ this.modelChange }/>
                        <br/>
                        Enter the color <input type="text" id = "colorInput" placeholder = "Color" onChange={ this.colorChange }/>
                        <br/>
                        Enter the article <input type="text" id = "articleInput" placeholder = "Article" onChange={ this.articleChange }/>
                        <br/>
                        Enter the category <input type="text" id = "categoryInput" placeholder = "Category" onChange={ this.categoryChange }/>
                        <br/>
                        Enter the image <input type="text" id = "imageInput" placeholder = "Image" onChange={ this.imageChange }/>
                        <button type = "submit" name = "submit">Submit</button>
                    </form>
                    <br/>
                    <form className = 'postForm' onSubmit = { this.submitLink }>
                        Or use a Goat link <input type="text" id = "goatInput" placeholder = "Link" onChange = { this.goatChange }/>
                        <button type = "submit" name = "submit">Submit</button>
                    </form>
                    <a href = "/"><button className = "postButton">Home</button></a>
            </div>
        );
    }
}

export default Post;