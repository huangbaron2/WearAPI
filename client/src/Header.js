import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
    render(){
        return(
            <div className = "headerBox">
                <ul className = "postList">
                    <li className = "postLi"><a href = "/#/Post"><button className = "postButton">Add to the database!</button></a></li>
                    <h1 style = {{color: "red", marginLeft: "80px", fontSize: "20px"}}>Under reinnovation, updated website coming soon!</h1> 
                </ul>
            </div>
        );
    }
}

export default Header;