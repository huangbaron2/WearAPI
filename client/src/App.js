import React from 'react';
import FirstPage from './FirstPage'
import Post from './Post'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  //basename={process.env.PUBLIC_URL}
  return (
    <div >
        <Router>
          <Route exact path = "/" component = { FirstPage }/>
          <Route exact path = "/Post" component = { Post }/>
        </Router>
    </div>
  );
}

export default App;
