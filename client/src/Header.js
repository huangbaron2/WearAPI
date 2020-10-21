import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ApiOutlined } from '@ant-design/icons'

class Header extends Component{
  render(){
    return (
      <div>
        <div className={this.root}>
        <AppBar style = {{height: "9vh"}} color="#4b00ed" position="static">
            <Toolbar>
            <a href = "/#" ><button className = "logoBTN">WearAPI</button></a>
            <div className = "directBox">
            <a href = "/#/API"><button className = "directBTN" ><ApiOutlined />API</button></a>
            <a href = "/#/Styles"><button className = "directBTN" >Check out the styles!</button></a> 
            <a href = "/#/Login"><button button className = "directBTN" style = {{border: "solid 2px red"}}> [In progress]</button></a>
            </div>
            </Toolbar>
        </AppBar>
        </div>
      </div>
    );
  }
}

export default Header;

 