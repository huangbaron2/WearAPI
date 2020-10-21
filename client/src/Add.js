import React, { Component } from 'react'
import Header from './Header'
import { TextInput } from 'grommet'
import { Button } from 'antd';
import './Add.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = [
                    {brand:"Any"},
                    {model:"Any"},
                    {color:"Any"},
                    {article:"Any"},
                    {image:"Any"}
                    ];
        this.brandChange = this.brandChange.bind(this)
        this.colorChange = this.colorChange.bind(this)
        this.articleChange = this.articleChange.bind(this)
        this.modelChange = this.modelChange.bind(this)
        this.imageChange = this.imageChange.bind(this)
        this.submitPost = this.submitPost.bind(this)
        this.goatChange = this.goatChange.bind(this)
    };

    brandChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({brand: (e.target.value.split(','))})
        }
        else{
            newL = [e.target.value]
            this.setState({brand: newL}, console.log(this.state.brand))
        }
    }
    modelChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({model: (e.target.value.split(','))})
        }
        else{
            newL = [e.target.value]
            this.setState({model: newL}, console.log(this.state.model))
        }
    }
    colorChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({color: e.target.value.split(',')})
        }
        else{
            newL = [e.target.value]
            this.setState({color: newL}, console.log(this.state.color))
        }
    }
    articleChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            this.setState({article: (e.target.value.split(','))})
        }
        else{
            newL = [e.target.value]
            this.setState({article: newL}, console.log(this.state.article))
        }
    }
    imageChange (e) {
        this.setState(
            {image: e.target.value},
            console.log(this.state.image)
        )
    }

    nextPost(clothing){
        fetch('http://35.170.149.7:9000/Add', {
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
            image: this.state.image
          }];
        this.nextPost(clothing)
    }

    goatChange (event) {
        console.log(event.target.value)
    }

    render(){
        return(
            <div>
                <Header/>
                <div className = 'postBox'>
                    <form className = 'postForm' onSubmit = { this.submitPost }>
                        Enter the brand <TextInput placeholder="Brand" onChange = {this.brandChange }/>
                        <br/>
                        Enter the model <TextInput placeholder="Model" onChange = {this.modelChange }/>
                        <br/>
                        Enter the color <TextInput placeholder="Color" onChange = {this.colorChange }/>
                        <br/>
                        Enter the article <TextInput placeholder="Artice" onChange = {this.articleChange }/>
                        <br/>
                        Enter the image <TextInput placeholder="Image Link" onChange = {this.imageChange}/>
                        <br/>
                        <Button style = {{textAlign: "center", margin: "auto" }} type = "submit" name = "submit">Submit</Button>
                    </form>
                    <br/>
            </div>
            </div>
        );
    }
}

export default Add;
