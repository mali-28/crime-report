import "./firebase";
import { Switch, BrowserRouter, Route, Redirect} from "react-router-dom";
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
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Redirect to="/"/>
        </Switch>
        <Footer/>
        </Auth>
      </BrowserRouter>
    </>
  );
}

export default App;
