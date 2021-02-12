import logo from './logo.svg';
import './App.css';
import {Route, Switch, Link, BrowserRouter} from "react-router-dom";
import Home from './components/Home';
import BorrowerComp from './components/BorrowerComp';
import LenderComp from './components/LenderComp';

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
            </li>
          </ul>  
          <Switch>
              <Route path="/borrower" component={BorrowerComp} />
              <Route path="/lender" component={LenderComp} />
          </Switch>
        </center>
      </BrowserRouter>
    </>
  );
}

export default App;
