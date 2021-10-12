import "./firebase";
import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import Topbar from './components/TopBar';
import Home from './routes/Home';
import Login from "./routes/Login";
import Footer from './components/Footer'
import Auth from "./context/Auth";
function App() {
  return (
    <>
      <BrowserRouter>
      <Auth>
      <Topbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
        <Footer/>
        </Auth>
      </BrowserRouter>
    </>
  );
}

export default App;
