import './App.css';
import Login from './modules/login/login';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from './modules/signUp/signUp';
import PaginaPruebas from './modules/paginapruebas/paginaPruebas';
import Home from './modules/home/home'
import ViewPatient from './modules/viewPatient/viewPatient';
function App() {
    return ( 
        <Router>
      
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path="/signup" exact component={SignUp}></Route>
              <Route path="/home" exact component={Home}></Route>
              <Route path="/view" exact component={ViewPatient}></Route>


              <Route path="/pruebas" exact component={PaginaPruebas}></Route>



            </Switch>  
        </Router>
        
    );
}

export default App;