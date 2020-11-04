import React, {Component} from 'react';
import { TextInput, Button } from 'grommet'
import Header from './Header'
import './Cart.css';

class Cart extends Component{ 

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
            return(
                <div>
                    <Header/>
                    <div className = "cartBox">
                        <h1>Shopping Cart</h1>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div>
                    <Header/>
                    <div className = "cartBox">
                        <h1>Shopping Cart</h1>
                    </div>
                </div>
            );
        }
    }
}

export default Cart;