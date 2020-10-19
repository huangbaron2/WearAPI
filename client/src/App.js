import React from 'react';
import Home from './Home'
import Add from './Add'
import Styles from './Styles'
import API from './API'
import './App.css';
import { Route, HashRouter,  } from 'react-router-dom'

function App() {
  //basename={process.env.PUBLIC_URL}
  return (
    <div >
        <HashRouter>
          <Route path = '/' exact component = { Home }/>
          <Route path = "/Add" exact component = { Add }/>
          <Route path = '/Styles' exact component = { Styles }/>
          <Route path = '/API' exact component = { API }/>
        </HashRouter>
    </div>
  );
}

export default App;
