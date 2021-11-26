import './App.css';
import Login from './modules/login/login';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from './modules/signUp/signUp';
import PaginaPruebas from './modules/paginapruebas/paginaPruebas';
import Home from './modules/home/home'
import ViewPatient from './modules/viewPatient/viewPatient';
import AddPatient from './modules/addPatient/PatientAdd';
import AddPrescription from './modules/addPrescription/addPrescription';
import MapGoogle from './components/Map/map';
function App() {
    return ( 
        <Router>
                   
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/signup" exact component={SignUp}></Route>
                <Route path="/view" exact component={ViewPatient}></Route>
                <Route path="/addPatient" exact component={AddPatient}></Route>
                <Route path="/pruebas" exact component={PaginaPruebas}></Route>
                <Route path="/addPrescription" exact component={AddPrescription}></Route>
                <Route path="/map" exact component={MapGoogle}></Route>



            </Switch> 
           
        
        </Router>
        
    );
}

export default App;