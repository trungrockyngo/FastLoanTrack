import './App.css';
import {Route, Switch, Link, BrowserRouter} from "react-router-dom";
import Home from './components/Home';
import BorrowerComp from './components/BorrowerComp';
import LenderComp from './components/LenderComp';
import SuperValidatorComp from './components/SuperValidatorComp';

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
