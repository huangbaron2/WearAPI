import React, {Component} from 'react';
import { TextInput, Button } from 'grommet'
import Header from './Header'
import './Product.css';

class Product extends Component{ 

    constructor(props) {
        super(props);
        this.state = {
            item: {}
        }
        this.retrieveInfo = this.retrieveInfo.bind(this)
      };

    componentDidMount () {
        this.setState({
            item: {}
        })
        this.retrieveInfo()
      }

    retrieveInfo () {
        fetch(`http://${process.env.REACT_APP_HOME_URL}/API/products/5fa0d77c72a9a632e00b4c64`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({item: result}, () => console.log("item", this.state.item))
                })
        console.log(this.props.match.params.id)
    }

    render(){
        if (JSON.parse(localStorage.getItem('loggedIn')) == 0){
            if (this.state.item.brand != undefined){
                return(
                    <div>
                        <Header/>
                        <div className = "productBox">
                                <img className = "productIMG"></img>
                                <div className = "productDes">
                                    <div><h1>{this.state.item.brand}</h1></div>
                                    <div><h1>{this.state.item.name}</h1></div>
                                    <div><h1>{this.state.item.color}</h1></div>
                                    <div><h1>Size {this.state.item.size}</h1></div>
                                    <div><h1>Condition: {this.state.item.condition}</h1></div>
                                    <div><h1>Price: ${this.state.item.price}</h1></div>
                                    <div><h1>{this.state.item.description}</h1></div>
                                </div>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <Header/>
                        
                    </div>
                )
            }
        }
        else{
            if (this.state.item.brand != undefined){
                return(
                    <div>
                        <Header/>
                        <div className = "productBox">
                                <img className = "productIMG"></img>
                                <div className = "productDes">
                                    <div><h1>{this.state.item.brand}</h1></div>
                                    <div><h1>{this.state.item.name}</h1></div>
                                    <div><h1>{this.state.item.color}</h1></div>
                                    <div><h1>Size {this.state.item.size}</h1></div>
                                    <div><h1>Condition: {this.state.item.condition}</h1></div>
                                    <div><h1>Price: ${this.state.item.price}</h1></div>
                                    <div><h1>{this.state.item.description}</h1></div>
                                    <div>
                                        <button>Add to Cart</button>
                                        <button>Add to Watchlist</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <Header/>
                        
                    </div>
                )
            }
        }
    }
}

export default Product;