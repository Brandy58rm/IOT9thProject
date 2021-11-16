import React from 'react'
import './style.scss'
const Schedule = (props) =>{

    return(
        <>
            
            <div className="medicineContainer">
                <h4>{props.name}</h4>
                <h4>{`${props.takeEvery} hrs`}</h4>
                <h4>{props.nextDoseDate}</h4>
            </div>
               
        </>
    )
}

export default Schedule