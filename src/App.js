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
import Applicant from "./routes/Applicant";
import MyApplication from "./routes/MyApplication";
import Request from "./routes/Request";
import UserRequest from "./routes/UserRequest";
import Index from "./context/Index";
import Case from "./routes/Case"

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
        <Index>
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
          <Route exact path="/applicant">
            <Applicant/>
          </Route>

          <Route exact path="/requests">
            <Request/>
          </Route>

          <Route exact path="/myapplication">
            <MyApplication/>
          </Route>

          <Route exact path="/case">
            <Case/>
          </Route>

          <Route exact path="/request/:id">
            <UserRequest/>
          </Route>
          <Redirect to="/"/>
        </Switch>
        <Footer/>
        </Index>
        </Auth>
      </BrowserRouter>
    </>
  );
}

export default App;
