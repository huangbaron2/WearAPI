import React from 'react';
import Home from './Home'
import Post from './Post'
import Styles from './Styles'
import './App.css';
import { Route, HashRouter,  } from 'react-router-dom'
import FilterMenu from './filterMenu'

function App() {
  //basename={process.env.PUBLIC_URL}
  return (
    <div >
        <HashRouter>
          <Route path = '/' exact component = { Home }/>
          <Route path = '/Styles' exact component = { FilterMenu }/>
          <Route path = "/Post" exact component = { Post }/>
        </HashRouter>
    </div>
  );
}

export default App;
