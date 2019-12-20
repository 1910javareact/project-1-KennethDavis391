import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  LoginComponent  from './components/login-component/LoginContainer';
import { store } from './store';
import  SingleUserPageComponent  from './components/single-user-page-component/SingleUserPageContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/test' component={SingleUserPageComponent}></Route>
            <Route path='/login' component={LoginComponent}></Route>
            <Route path='/' component={LoginComponent}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
