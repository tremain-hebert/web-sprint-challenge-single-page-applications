import React from "react";
import {Switch, Route, Router} from 'react-router-dom';
import PizzaForm from './Components/PizzaForm';

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <Switch>
        <Route exact path="/" />
        <Route path='/PizzaForm.js'>
          <PizzaForm />
        </Route>
      </Switch>
    </>
  );
};
export default App;
