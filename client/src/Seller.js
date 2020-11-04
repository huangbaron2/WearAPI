import React, { Component } from 'react'
import Header from './Header'
import { TextInput } from 'grommet'
import './Seller.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { message, Button, Cascader, Select } from 'antd'
const { Option } = Select;

class Seller extends Component {
    constructor(props) {
        super(props);
        this.state = [
                    {name: ""},
                    {brand: []},
                    {color: ""},
                    {article: ""},
                    {size:""},
                    {description: ""},
                    {userID: ""},
                    {price: ""},
                    {condition: ""}
                    ];
        this.brandChange = this.brandChange.bind(this)
        this.colorChange = this.colorChange.bind(this)
        this.articleChange = this.articleChange.bind(this)
        this.nameChange= this.nameChange.bind(this)
        this.submitPost = this.submitPost.bind(this)
        this.sizeChange = this.sizeChange.bind(this)
        this.descriptionChange = this.descriptionChange.bind(this)
        this.priceChange = this.priceChange.bind(this)
        this.articleSelect = this.articleSelect.bind(this)
        this.conditionChange = this.conditionChange.bind(this)
        this.capitalize = this.capitalize.bind(this)
    };

    componentDidMount () {
        this.setState ({
            name: "", 
            brand: [],
            color: "",
            article: "",
            size: "",
            description: "",
            userID: "",
            price: ""
        })
        if (localStorage.getItem('loggedIn') == null || localStorage.getItem('user') == null){
            localStorage.setItem('loggedIn', JSON.stringify(0))
            localStorage.setItem('user', JSON.stringify(['none', 'none', 'none'])) // id, name, email
          }
        else if (JSON.parse(localStorage.getItem("loggedIn")) == 1){
            this.setState({userID: JSON.parse(localStorage.getItem("user"))[0]})
        }
    }
    capitalize (str) {
     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    brandChange (e) {
        if (e.target.value.includes(",")){
            var newL = []
            var brandNamed = (e.target.value.split(','))
            for (var i of brandNamed){
                newL.push(this.capitalize(i.trim()))
            }
            this.setState({brand: newL}, () => console.log(this.state.brand))
        }
        else{
            newL = [this.capitalize(e.target.value).trim()]
            this.setState({brand: newL}, console.log(this.state.brand))
        }
    }
    nameChange (e) {
        this.setState({name: (e.target.value).trim()})
    }
    colorChange (e) {
        this.setState({color: (e.target.value).trim()})
    }
    articleChange (e) {
        this.setState({article: e})
    }
    sizeChange (e) {
        this.setState(
            {size: e},
        )
    }
    descriptionChange (e) {
        this.setState(
            {description: (e.target.value).trim()},
        )
    }
    priceChange (e) {
        this.setState(
            {price: e.target.value},
        )
    }
    conditionChange (e) {
        this.setState(
            {condition: e},
        )
    }


    submitPost (e) {
        const product = {
            name: this.state.name,
            brand: this.state.brand,
            color: this.state.color,
            article: this.state.article,
            size: this.state.size,
            description: this.state.description,
            userID: this.state.userID,
            price: this.state.price,
            condition: this.state.condition
          };
          console.log(product)
          for (var i of Object.keys(product)){
              if (product[i] == undefined){
                  alert("Please enter valid information")
              }
          }
          fetch(`http://${process.env.REACT_APP_HOME_URL}/API/sell`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(product)
        })
        .then(res => res)
        .then(
            (result) => {
                //Going to link to the product page later
                this.props.history.push({
                    pathname: `/sell`,
                })
                message.success("Successfully added to database!", 2);
            },
            (err) => {
                message.error("Error, please try again later", 2);
            }
        )
    }

    articleSelect() {
        if (this.state.article == "Top"){
            return (
                <div>
                    <Select onChange={this.sizeChange } placeholder = "Sizes" style={{ borderRadius: "3px", width: 367, marginTop: "7px", paddingTop: "2px", paddingBottom: "2px", border: "solid 1px black"}} >
                        <Option value="XS">XS</Option>
                        <Option value="S">S</Option>
                        <Option value="M">M</Option>
                        <Option value="L">L</Option>
                        <Option value="XL">XL</Option>
                    </Select> 
                </div> 
                )
        }
        else if (this.state.article == "Bottom"){
            let rows = []
            for (let i = 25; i < 46; i++) {
                rows.push(<Option value= {i}>{i}</Option>);
              }
            return (
                <div>
                    <Select onChange={this.sizeChange } placeholder = "Sizes" style={{ borderRadius: "3px", width: 367, marginTop: "7px", paddingTop: "2px", paddingBottom: "2px", border: "solid 1px black"}} >
                        {rows}
                    </Select> 
                </div> 
                )
        }
        else if (this.state.article == "Footwear"){
            let rows = []
            for (let i = 5; i < 16; i++) {
                rows.push(<Option value= {i}>US {i}</Option>);
              }
            return (
                <div>
                    <Select onChange={this.sizeChange } placeholder = "Sizes" style={{ borderRadius: "3px", width: 367, marginTop: "7px", paddingTop: "2px", paddingBottom: "2px", border: "solid 1px black"}} >
                        {rows}
                    </Select> 
                </div> 
                )
        }
        else if (this.state.article == "Accessory"){
            return (
                <div>
                    <Select placeholder = "Please write any sizing in the desciption" style={{borderRadius: "3px", width: 367, marginTop: "7px", paddingTop: "2px", paddingBottom: "2px", border: "solid 1px black"}} >
                        
                    </Select> 
                </div> 
                )
        }
        else if (this.state.article == ""){
            return ( 
                <div>
                <Select onChange={this.sizeChange } placeholder = "Please select the article first" style={{ borderRadius: "3px", width: 367, marginTop: "7.5px", paddingTop: "1px", paddingBottom: "1px", border: "solid 1px black"}} >
                    <Option disabled = "true" value="a">Please select the article first</Option>
                </Select> 
                </div> 
            )
        }                        
    }

    render(){
        if (JSON.parse(localStorage.getItem('loggedIn')) != 0){
            return(
                <div>
                    <Header/>
                    <div className = 'postBox'>
                        <form id = "sellForm" className = 'postForm' onSubmit = { (e) => this.submitPost (e) }>
                            <h4 style = {{fontWeight: "bold"}}>Add a new product</h4>
                            <h4 style = {{fontSize: "19px"}}>Product Details</h4>
                            <div className = "productSell">
                                <div><input type = "text" className = "productInput" placeholder="Brand (Seperated by comma for multiple designers)" onChange = {this.brandChange }  required/></div>
                            
                                <div><input type = "text" className = "productInput" placeholder="Name" onChange = {this.nameChange }  required/></div>
                            
                                <div><input type = "text" className = "productInput" placeholder="Color" onChange = {this.colorChange }  required/></div>
                            
                                <div>
                                    <Select onChange={ this.conditionChange } placeholder = "Condition" style={{ color: "black", borderRadius: "3px", width: 367, marginTop: "7.5px", paddingTop: "1px", paddingBottom: "1px", border: "solid 1px black"}} >
                                    <Option value="New">New</Option>
                                    <Option value="Used">Used</Option>
                                    </Select> 
                                </div> 

                                <div>
                                    <Select onChange={this.articleChange } placeholder = "Article" style={{ color: "black", borderRadius: "3px", width: 367, marginTop: "7.5px", paddingTop: "1px", paddingBottom: "1px", border: "solid 1px black"}} >
                                    <Option value="Top">Top</Option>
                                    <Option value="Bottom">Bottom</Option>
                                    <Option value="Footwear">Footwear</Option>
                                    <Option value="Accessory">Accessory</Option>
                                    </Select> 
                                </div> 

                                <div> {this.articleSelect()} </div>
                                
                            </div>
                            <br/>
                            <h4 style = {{fontSize: "19px"}}>Price</h4>
                            <div className = "productSell">
                            <div><input  min="0.00" max="999999.99" type = "number" className = "productInput" placeholder="Price (USD)" onChange = {this.priceChange }  pattern="^\d*(\.\d{0,2})?$" step="0.01" required/></div>
                            <div><input type = "text" style = {{visibility: "hidden"}} className = "productInput" placeholder="Size"/></div>
                            </div>
                            <br/>
                            <div>
                                <h4 style = {{fontSize: "19px"}}>Description:</h4>
                                <br/>
                                <div><textarea type = "text" style = {{height: "80px", width: "830px", marginLeft: "50px"}} className = "productInput" placeholder="Description" onChange = {this.descriptionChange }  required/></div>
                            </div>
                            <br/>
                            <div style = {{left: "0", height:"50px", bottom: "0px", width: "100%", position: "fixed", backgroundColor: "black"}}><button form = "sellForm" className = "submitBTN" type="submit" onSubmit = {(e) => this.submitPost(e)}>Submit</button></div>
                        </form>
                        <br/>
                </div>
                </div>
            );
        }
        else{
            return (
                <div>
                    <Header/>
                    <h1>Please log in</h1>
                </div>

            );
        }
    }
}

export default Seller;