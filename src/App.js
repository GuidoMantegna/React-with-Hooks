import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Fridge from './pages/Fridge';
import Market from './pages/Market';
import Tips from './pages/Tips';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/fridge" component={Fridge}/>
              <Route exact path="/market" component={Market}/>
              <Route exact path="/tips" component={Tips}/>
              <Route exact path="/contact" component={Contact}/>
              <Route component={NotFound}/>
          </Switch>
      </Layout>            
    </BrowserRouter>
  );
}

export default App;
