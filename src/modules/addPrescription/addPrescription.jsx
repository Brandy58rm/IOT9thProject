import React,{createFactory, useEffect, useState} from 'react'
import './addPrescription.scss'
import Input from '../../components/Input/input'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import SelectImage from '../../components/SelectImage/selectImage';
import Button from '../../components/Button/button'
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import config from '../../config'
import { integerPropType } from '@mui/utils';



const AddPrescription = () =>{
    const history = useHistory();
    const location = useLocation()
    const IDCARER = location.data.user.id
    const IDPATIENT = location.state.patient.id
    const [form,setForm]=React.useState({
        medication:" ", 
        dose:" ", 
        takeEvery:0, 
        numberDosis:0, 
        photo:" ",         
        notes:"null", 
        startingOn:new Date(), 
        
    })
    const [error, setError] = React.useState(undefined);

   ///////////////////////////

  
   

   const years = range(2021, getYear(new Date()) + 5, 1);
   const months = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December",
   ];

   ////////////////////////
    
    

    useEffect(()=>{
        var isLoggued = localStorage.getItem("login")
        console.log(isLoggued)
        if(!isLoggued){
            history.push("/")
        }
        console.log(location)
        

    },[])
    

    const handleOnChange = (e) => {
        
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    
    console.log(form)
   
    const addPrescriptionButton = async (e) =>{
        
        //Avoid html default submit
        e.preventDefault();
        if (!form.medication || !form.dose || !form.takeEvery || !form.numberDosis || !form.photo || !form.notes || !form.startingOn) {
        setError("No se permiten campos vacios");
        return;
        }
        ///////
       
        
        
        //Call to API
        try{
            
            console.log(IDCARER);
            console.log(IDPATIENT); 

            var url = `${config.backendURL}carer/${IDCARER}/addprescription/${IDPATIENT}`;
            let h = new Headers();
            h.append('authorization', `Bearer ${location.data.token}`)
            h.append('Accept', 'application/json, text/plain, /')
            h.append('Content-Type', 'application/json')
            
            
            const b = {
                "dose" : form.dose, 
                "takeEvery" : parseInt(form.takeEvery), 
                "numberDosis" : parseInt(form.numberDosis),        
                "notes" : form.notes, 
                "medication" : form.medication, 
                
            }
            console.log(form)
            console.log(b)
            let req= new Request(url,{
                method: 'POST',
                headers: h,
                body: JSON.stringify(b)
                
            });
    
            await fetch(req)
            .then((response)=>{
                response.json().then((data) => {
                    console.log(data)
                    if(data.Status==0){
                        history.push({
                            pathname:"/view",
                            state:{
                                state:location.data,
                                idPatient:location.state.patient.id
                            }
                        })
                    }
                    
                   
                    
                    
                })
            })
            .catch((err)=>{
                console.log(err)
            })

        }
        catch(error) {
            setError("Error de red. Vuelva a intentarlo más tarde");
            console.error(error);
        }

    }
  
    const bottonCancel = () =>{
        console.log(location)
        history.push(
            {
                pathname:"/view",
                state:{
                    state:location.data,
                    idPatient:location.state.patient.id
                }
            }
        )
    }
    
    return(
        <>
            <div className="container">
                <div className="container-register">
                    <div className="title-register">
                        <h2>Add Prescription</h2>                        
                    </div>
                    <div className="medication-dose-container">
                        <div className="medication-container">
                            <label>Medication</label>
                            <Input name="medication" onChange={handleOnChange} style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                        <div className="dose-container">
                            <label>Dose</label>
                            <Input name="dose" onChange={handleOnChange} style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                    </div>
                    <div className="take-numdosis-container">
                        <div className="take-container">
                            <label>Take every</label>
                            <Input name="takeEvery" onChange={handleOnChange} style={{width: "90%",height: "40px"}} type="number" />
                        </div>
                        <div className="num-dosis-container">
                            <label>Number Dosis</label>
                            <Input name="numberDosis" onChange={handleOnChange} style={{width: "90%",height: "40px"}} type="number" />
                        </div>
                    </div>
                    <div className="starting-note-container">
                        <div className="date-container">
                            <label>Starting on</label>
                            <DatePicker
                                readOnly={true}
                                name="startingOn"
                                renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
                                    <div
                                    style={{
                                        margin: 10,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    >
                                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                        {"<"}
                                    </button>
                                    <select
                                        value={getYear(date)}
                                        onChange={({ target: { value } }) => changeYear(value)}
                                    >
                                        {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                        ))}
                                    </select>

                                    <select
                                        value={months[getMonth(date)]}
                                        onChange={({ target: { value } }) =>
                                        changeMonth(months.indexOf(value))
                                        }
                                    >
                                        {months.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                        ))}
                                    </select>

                                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                        {">"}
                                    </button>
                                    </div>
                                )}
                                selected={form.startingOn}
                                
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <div className="note-container">
                            <label>Notes</label>
                            <Input name="notes" onChange={handleOnChange}style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                    </div>
                    <div className="profilePicture-buttons-container">
                        <div className="profileContainer">
                        <SelectImage name="photo"/>
                        </div>
                        <div className="buttonsContainer">
                            <Button onClick={bottonCancel} className="buttonCancel">Cancel</Button>
                            <Button onClick={addPrescriptionButton} className="buttonCreate">Add Prescription</Button>

                        </div>
                    </div>
                    

                </div>
            </div>
        </>
    )
}
export default AddPrescription