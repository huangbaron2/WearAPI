import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

class Header extends Component{
  render(){
    return (
      <div>
        <div className={this.root}>
        <AppBar color="#4b00ed" position="static">
            <Toolbar>
            <IconButton edge="start" className={this.menuButton} color="#4b00ed" aria-label="menu">

            </IconButton>
            <Typography variant="h6" className={this.title}>
              <a href = "/" style = {{fontWeight: "bold", color: "purple", padding: "30px", fontSize: "30px"}}>WearAPI</a>
            </Typography>
            <a href = "/#/Styles" style = {{marginLeft: "58%"}}><button className = "directBTN" >Check out the styles!</button></a>
            <a href = "/#/Post"><button button className = "directBTN">Contribute to the database [In Progress]</button></a>
            </Toolbar>
        </AppBar>
        </div>
      </div>
    );
  }
}

export default Header;

 