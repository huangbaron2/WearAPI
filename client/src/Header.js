import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ApiOutlined, ShoppingCartOutlined  } from '@ant-design/icons'
import { message } from 'antd'
import './Header.css'

class Header extends Component{
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.signOut = this.signOut.bind(this);
    this.updateChild = this.updateChild.bind(this)
  }

  updateChild(){
    this.setState({ logged: true})
  }

  componentDidMount () {
        if (localStorage.getItem('loggedIn') != 0){
            this.setState({logged: true})
        }
        else {
            this.setState({logged: false})
        }
  }

  signOut () {
    window.location.reload(); 
    localStorage.setItem('loggedIn', JSON.stringify(0))
    localStorage.setItem('user', JSON.stringify(['none', 'none', 'none'])) 
    message.success('Successfully signed out!')
    this.props.history.push({
      pathname: `/#`,
    })
  }

  render(){
    if (JSON.parse(localStorage.getItem('loggedIn')) == 0){
      return (
        <div>
          <div className = "headerBox">
              <a href = "/#"><button className = "logoBTN" >Baron's Market</button></a> 
              <input className = "searchBox" placeholder="Search Clothes" ></input>
              <div className = "directBox">
                <a href = "/#/API"><button className = "directBTN" ><ApiOutlined />API</button></a>
                <a href = "/#/Styles"><button className = "directBTN" >Browse</button></a> 
                <a href = "/#/Sell"><button className = "directBTN" >Sell</button></a> 
                <a href = "/#/Login"><button className = "logBTN" >LogIn</button></a> 
                <a href = "/#/Signup"><button className = "logBTN" >SignUp</button></a> 
              </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className = "headerBox">
              <a href = "/" ><button className = "logoBTN">Baron's Market</button></a>
              <input className = "searchBox" placeholder="Search Clothes" ></input>
              <div className = "directBox">
                <a href = "/API"><button className = "directBTN" ><ApiOutlined />API</button></a>
                <a href = "/Styles"><button className = "directBTN" >Browse</button></a> 
                <a href = "/Sell"><button className = "directBTN" >Sell</button></a> 
                <a ><button onClick = { () => (this.signOut()) }className = "logBTN" >Signout</button></a> 
                <a href = "/Profile"><button className = "logBTN" >Profile</button></a> 
                <a className = "shoppingBTN" href = "/#/Cart"><ShoppingCartOutlined className = "shoppingIcon"/></a> 
              </div>
          </div>
        </div>
      );
    }
  }
}

export default (Header);

 