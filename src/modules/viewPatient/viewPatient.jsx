import './style.scss'
import React from 'react'
import Header from '../../components/Header/header'
import Input from '../../components/Input/input'
import UserIcon from '../../assets/userIcon.png'
const ViewPatient = () =>{
    return(
        <>
            <div className="viewContainer">
                <Header/>
                <div className="generalContent">
                    <div className="leftContent">
                       
                        <div className="locationContent">
                            <div>
                                <h1>Current Location</h1>
                            </div>
                            <div className="patientLocation">
                            <Input style={{width:"80%", color:"#fff", background:"#40C4FF", fontSize: "20pt"}} value={"Tijuas, baja california, 220131, "} />
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
                                        <h2>Nombre Completo</h2>
                                        <div className="ageGnreContainer">
                                            <h2>Age:? </h2>
                                            <h2>Genere:? </h2>
                                        </div>
                                        <h2>Date of Birth:?</h2>
                                    </div>
                                </div>
                                <div className="medicineContainer">
                                    
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