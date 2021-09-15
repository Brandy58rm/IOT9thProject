import './App.css';
import Login from './modules/login/login';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from './modules/signUp/signUp';
import PaginaPruebas from './modules/paginapruebas/paginaPruebas';

function App() {
    return ( 
        <Router>
      
            <Switch>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/signup" exact component={SignUp}></Route>
              <Route path="/pruebas" exact component={PaginaPruebas}></Route>



            </Switch>  
        </Router>
        
    );
}

export default App;