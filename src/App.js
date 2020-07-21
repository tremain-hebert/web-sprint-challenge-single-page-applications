import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import PizzaForm from './PizzaForm';

const App = () => {
  return (
    <div className="App"> 
      <Router>
        <nav className='nav-Section'>
          <h1 className="header">Lambda Eats</h1>
          <div className="navbar">
            <Link to='/'>Home</Link><br/>
            <Link to='/order'>Pizza?</Link>
          </div>
        </nav>
        <Switch>
          <Route path="/order">
            <PizzaForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
