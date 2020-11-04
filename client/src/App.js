import React from 'react';
import Home from './Home'
import Seller from './Seller'
import Styles from './Styles'
import API from './API'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import Product from './Product'
import Cart from './Cart'
import './App.css';
import { Route, HashRouter, BrowserRouter} from 'react-router-dom'




class App extends React.Component {

  componentDidMount() {
    console.log("StateofLoggedIn", localStorage.getItem('loggedIn'))
    if (localStorage.getItem('loggedIn') == null || localStorage.getItem('user') == null){
      localStorage.setItem('loggedIn', JSON.stringify(0))
      localStorage.setItem('user', JSON.stringify(['none', 'none', 'none'])) // id, name, email
    }
  } 
  render() {
  return (
    <div className = "allBox">

        <BrowserRouter>
          <Route path = '/' exact component = { Home }/>
          <Route path = "/Sell" exact component = { Seller }/>
          <Route path = '/Styles' exact component = { Styles }/>
          <Route path = '/Styles/:id' exact component = { Product }/>
          <Route path = '/API' exact component = { API }/>
          <Route path = '/Login' exact component = { Login }/>
          <Route path = '/Signup' exact component = { Signup }/>
          <Route path = '/Profile' exact component = { Profile }/>
          <Route path = '/Cart' exact component = { Cart }/>
        </BrowserRouter>

    </div>
  );
  }
}

export default App;
