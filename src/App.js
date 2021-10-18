import "./firebase";
import { Switch, BrowserRouter, Route, Redirect} from "react-router-dom";
import Topbar from './components/TopBar';
import Home from './routes/Home';
import Signup from "./routes/SignIn";
import Footer from './components/Footer'
import Auth from "./context/Auth";
import Admin from "./routes/Admin";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, cssTransition } from "react-toastify";

function App() {
  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
  });
  return (
    <>
      <BrowserRouter>
      <ToastContainer transition={bounce} />
      <Auth>
      <Topbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            <Signup/>
          </Route>
          <Route exact path="/admin">
            <Admin/>
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
