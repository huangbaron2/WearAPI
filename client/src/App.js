import React from 'react';
import FirstPage from './FirstPage'
import Post from './Post'
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter,  } from 'react-router-dom'

function App() {
  //basename={process.env.PUBLIC_URL}
  return (
    <div >
        <HashRouter>
          <Route path = '/' exact component = { FirstPage }/>
          <Route path = "/Post" exact component = { Post }/>
        </HashRouter>
    </div>
  );
}

export default App;
