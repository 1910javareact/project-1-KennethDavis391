import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  LoginComponent  from './components/login-component/LoginContainer';
import { store } from './store';
import  AllUsersPageComponent  from './components/all-users-page-component/AllUsersPageContainer';
import  SingleUserPageComponent  from './components/single-user-page-component/SingleUserPageContainer';
import { SubmitReimbursementPageComponent } from './components/submit-reimbursement-page-component/SubmitReimbursementPageComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/test' component={AllUsersPageComponent}></Route>
            <Route path='/reimbursements/submit' component={SubmitReimbursementPageComponent}></Route>
            <Route path='/users/userid/:userid' component={SingleUserPageComponent}></Route>
            <Route path='/login' component={LoginComponent}></Route>
            <Route path='/users' component={AllUsersPageComponent}></Route>
            <Route path='/' component={LoginComponent}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
