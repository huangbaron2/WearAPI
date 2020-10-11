import React, { Component } from 'react'
import Post from "./Post"; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router , Route, Switch } from "react-router-dom";

class Header extends Component {
    render(){
        return(
            <div className = "headerBox">
                <ul className = "postList">
                    <li className = "postLi"><a href = "/#/Post"><button className = "postButton">Add to the database!</button></a></li>
                </ul>
            </div>
        );
    }
}

export default Header;