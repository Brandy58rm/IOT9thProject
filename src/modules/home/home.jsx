import './style.scss'
import React from 'react'
import Header from '../../components/Header/header'
import CardPatient from '../../components/CardPatient/cardPatient'
import AddPatient from '../../components/AddPatient/addPatient'
const Home = () =>{
    const state=[
        {
            name:"Brandon Rodriguez medina"
            
        },
        {
            name:"Johar javier"
            
        },
        {
            name:"Sergio Cortes"
            
        },
        {
            name:"DAvid Rodriguez"
            
        },
        {
            name:"Axel Rodriguez"
            
        },
        {
            name:"Misael Rodriguez"
            
        },
        {
            name:"Evelyn Rodriguez"
            
        }
    ]
    return(
        <>
            <div className="homeContent">
                <Header/>
                <div className="sectionContent">
                    <div>
                        <h1>Patients</h1>
                    </div>
                    <div className="patientContent">
                    {
                        state.map((data,i)=>
                        
                            <CardPatient name={data.name}/>
                       
                        )
                    

                    }
                    <AddPatient/>
                     </div>
                </div>
            </div>
        </>

    )
}
export default Home