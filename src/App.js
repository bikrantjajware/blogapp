
import './App.css';
import Home from './Pages/Home/Home';
import Topbar from './Components/Topbar/Topbar';
import Write from './Pages/Write/Write';
import Settings from './Pages/Settings/Settings';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import Logout from './Pages/Logout/Logout';
import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Single from './Pages/Single/Single';
import { UserProivder,UserContext } from './Context/User/UserContext';
import { PostsProivder } from './Context/PostsContext/PostsContext';
import { GroupProvider } from './Context/GroupContext/GroupContext';
import Error from './Pages/Error/Error';


function App() {





  const [user,setUser] =  useContext(UserContext);
  return (
    <Router>
        <UserProivder>
          <PostsProivder>
            <GroupProvider>
                <Topbar />

        <Switch>
          <Route exact path="/">
            
            <Home/>
          </Route>
          <Route exact path="/register">
            {user ? <Home/> : <Register/>}
          </Route>
          <Route exact path="/login">
            {user? <Home/> : <Login/>}
          </Route>
          <Route exact path="/write">
            {user ? <Write/>: <Register/>}
          </Route>
          <Route exact path="/settings">
            {user ? <Settings/> : <Register/>}
          </Route>
          <Route exact path="/post/:slug">
            <Single />
          </Route>
          <Route exact path="/logout">
            <Logout/>
            </Route>
            <Route exact path="/error">
              <Error />
          </Route>

          </Switch>
        {/* <Home/> */}
        {/* <Write/> */}
        {/* <Settings/> */}
        {/* <Register /> */}
        </GroupProvider>
        </PostsProivder>
        </UserProivder>
    </Router>
     
    
  );
}

export default App;
