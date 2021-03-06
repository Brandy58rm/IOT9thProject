import './style.scss'
import React,{useEffect,useState} from 'react'
import Header from '../../components/Header/header'
import CardPatient from '../../components/CardPatient/cardPatient'
import AddPatient from '../../components/AddPatient/addPatient'
import config from '../../config'
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Home = () =>{
 
    const location = useLocation();
    const history = useHistory();
    
   
    const [patients,setPatients]=React.useState([])
    


    useEffect(() => {
        if (location.state == undefined){
            localStorage.removeItem('login');
            
        }
        
        const hasLogin = localStorage.getItem("login");
        

        if (!hasLogin) {
          history.push("/login");
        }
        console.log(location.pathname); // result: '/'
        console.log(location.state); // result: 'some_value'
    
        //Call to API
        try{

            
            var url = `${config.backendURL}carer/${location.state.user.id}/patients`;
            let h = new Headers();
            
            
            h.append('authorization', `Bearer ${location.state.token}`)
            console.log(h)
            
            let req= new Request(url,{
                method: 'GET',
                headers:h

                
            });

                fetch(req)
            .then((response)=>{
                response.json().then((data) => {
                    
                    setPatients(data.patients)
                    console.log(data)
                    console.log(patients)
                   
                    
                })
            })
            .catch((err)=>{
                console.log(err)
            })

        }
        catch(error) {
            
            console.error(error);
        }

    }, [location]);

    const goToAddPatient = () =>{
        history.push({
            pathname: '/addPatient',
            state: location.state // your data array of objects
        })
    }
    
    const viewInfo = (data) =>{
        
        history.push({
            pathname: '/view',
            state: {
                state : location.state,
                idPatient: data.id,
                patients:patients
            } // your data array of objects
        })
    }
    
    const goToDashboard = () =>{
        history.push({
            pathname: '/dashboard',
            state: {
                state : location.state,
                patients: patients
            } // your data array of objects
        })
    }

    const goToEditProfile = () =>{
        history.push({
            pathname: '/editProfile',
            state:location.state,
               
        
        })
    }
    return(
        <>
            <div className="homeContent">
                <Header onClickDashboard={goToDashboard} onClickEdit={goToEditProfile}/>
                <div className="sectionContent">
                    <div>
                        <h1>Patients</h1>
                    </div>
                    <div className="patientContent">
                    {patients ?  
                        patients.map((data)=>
                        
                            <CardPatient 
                            name={data.name +" "+ data.lastName}
                            key={data.id}
                            onClick={() => {viewInfo(data)}}
                            />
                       
                        )
                        :
                        null

                    }
                    <AddPatient onClick={goToAddPatient}/>
                     </div>
                </div>
            </div>
        </>

    )
}
export default Home