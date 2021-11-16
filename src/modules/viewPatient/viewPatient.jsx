import './style.scss'
import React, { useEffect } from 'react'
import Header from '../../components/Header/header'
import Input from '../../components/Input/input'
import UserIcon from '../../assets/userIcon.png'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import config from '../../config'
import Schedule from '../../components/Schedule/schedule'


const ViewPatient = () =>{
    const history = useHistory()
    const location = useLocation()
    const [info,setInfo] = React.useState()
    const [schedule,setSchedule]=React.useState()
   

    useEffect(()=>{
        const hasLogin = localStorage.getItem("login");
        if (!hasLogin) {
          history.push("/login");
        }

      
        try{


            var url = `${config.backendURL}carer/${location.state.state.user.id}/patient/${location.state.idPatient}`;
            let h = new Headers();
            
            
            h.append('authorization', `Bearer ${location.state.state.token}`)
            console.log(h)
            
            let req= new Request(url,{
                method: 'GET',
                headers:h

                
            });

                fetch(req)
            .then((response)=>{
                response.json().then((data) => {
                    
                    setInfo(data)
                    setSchedule(data.patient.schedule)
                    
                    
                    
                })
            })
            .catch((err)=>{
                console.log(err)
            })

        }
        catch(error) {
            
            console.error(error);
        }



    },[location])

    const goToHome = () =>{
        history.push({
            pathname:"/",
            state:location.state.state
        })
    }

    
   

    console.log(schedule)
 
    return(
        <>
            <div className="viewContainer">
                <Header onClickHome={goToHome}/>
                <div className="generalContent">
                    <div className="leftContent">
                       
                        <div className="locationContent">
                            <div>
                                <h1>Current Location</h1>
                            </div>
                            <div className="patientLocation">
                            <Input style={{width:"80%", color:"#fff", background:"#40C4FF", fontSize: "20pt"}} value={"Tijuas, baja california, 220131, "}  />
                            </div>
                        </div>
                        <div className="profileContent">
                            <div>
                                <h1>Patient Profile</h1>
                            </div>
                            <div className="patientContent">
                                <div className="photoInfoContainer">
                                    <div className="imgContainer">
                                        <img src={UserIcon} alt="userIMG" />
                                    </div>
                                    <div className="infoContainer">
                                        {info ?
                                            <h2>{`${info.patient.name} ${info.patient.lastName}`}</h2>
                                            :
                                            <h2>Nombre Completo</h2>
                                        }
                                        <div className="ageGnreContainer">
                                            {info ?
                                            <h2>{`Age:${info.patient.age}`}</h2>
                                            :
                                            <h2>Age:?</h2>
                                            }
                                            {info ?
                                            <h2>{`Gender:${info.patient.gender}`}</h2>
                                            :
                                            <h2>Gender:? </h2>
                                            }
                                        </div>
                                        {info ?
                                            <h2>{`Date of Birth:${info.patient.dob}`}</h2>
                                            :
                                            <h2>Date of Birth:?</h2>
                                            }
                                            
                                    </div>
                                </div>
                                
                                <div className="generalContainerMedicine">
                                    <div className="titleMedicine"><h2>Medicine</h2></div>
                                    <div className="headerMedice">
                                        <h4>Name</h4>
                                        <h4>Every</h4>
                                        <h4>Next Medication Taking</h4>
                                    </div>
                                    <div className="scrolling">

                                        {schedule? schedule.map((s)=>
                                            <Schedule
                                            name={s.medication.name}
                                            takeEvery={s.takeEvery}
                                            nextDoseDate={s.nextDoseDate}
                                            key={s.id}
                                            ></Schedule>
                                        ):
                                        <div>No schedule</div>
                                            

                                        }
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        

                    </div>
                    <div className="rightContent">
                        <div className="right">Hola</div>
                    </div>

                </div>
            </div>
        </>

    )
}
export default ViewPatient