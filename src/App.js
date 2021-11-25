import React from 'react';
import './App.css';
import TopNav from './components/TopNav/TopNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import newHome from './pages/newHome';
import BurnPortal from './pages/burnPortal';

function App() {
  return (
    <Router>
      <TopNav />
      <Switch>
        <Route exact path='/' component={newHome} />
        <Route exact path='/burnPortal' component={BurnPortal} />
      </Switch>
    </Router>

  );
}

export default App;