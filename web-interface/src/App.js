import './App.css';
import {Route, Switch, Link, BrowserRouter} from "react-router-dom";
import Home from './components/HomePage';
import BorrowerComp from './components/Borrower';
import LenderComp from './components/Lender';
import SuperValidatorComp from './components/SuperValidator';

function App() {
  return (
    <>
      <Home />
      <BrowserRouter>
        <center>
          <ul>
            <li>
              <Link to="/borrower">Borrower</Link>
              <br></br>
              <Link to="/lender">Lender</Link>
              <br></br>
              <Link to="/supervalidator">Super Validator</Link>
            </li>
          </ul>  
          <Switch>
              <Route path="/borrower" component={BorrowerComp} />
              <Route path="/lender" component={LenderComp} />
              <Route path="/supervalidator" component={SuperValidatorComp} />
          </Switch>
        </center>
      </BrowserRouter>
    </>
  );
}

export default App;
