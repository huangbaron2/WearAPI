import React, {Component} from 'react';
import Header from './Header'
import Filter from './Filter'
import './App.css';

class FirstPage extends Component{
  render(){
    return (
        <div className = "allBox">
            <Header/>
            <Filter/>
        </div>
    )}
}

export default FirstPage;
