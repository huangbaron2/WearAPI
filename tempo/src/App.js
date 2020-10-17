import React from 'react';
import Home from './Home'
import Post from './Post'
import './App.css';
import { Route, HashRouter,  } from 'react-router-dom'

function App() {
  //basename={process.env.PUBLIC_URL}
  return (
    <div >
        <HashRouter>
          <Route path = '/' exact component = { Home }/>
          <Route path = "/Post" exact component = { Post }/>
        </HashRouter>
    </div>
  );
}

export default App;
