import "./firebase";
import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import Topbar from './components/TopBar';
import Home from './routes/Home';
import Signup from "./routes/Signup";
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
            <Signup/>
          </Route>
        </Switch>
        <Footer/>
        </Auth>
      </BrowserRouter>
    </>
  );
}

export default App;
