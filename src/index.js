import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Routes from './route/route.js';
import Day from './day/day.js';
import Stopwatch from './stopwatch/stopwatch';
import Timer from './timer/timer';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <div className='container'>
      <BrowserRouter>
        <Routes/>
        <div className="content">
          <Switch>
            <Route exact path='/' component={Day}/>
            <Route exact path='/stopwatch' component={Stopwatch}/>
            <Route exact path='/timer' component={Timer}/>
          </Switch>
        </div>        
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);