import React,{createFactory, useEffect, useState} from 'react'
import './signUp.scss'
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



const SignUp = () =>{
    const history = useHistory();
    
    const [form,setForm]=React.useState({
        email:" ", 
        password:" ", 
        photo:"null", 
        name:" ", 
        lastname:" ",         
        phonenumber:0, 
        dob:new Date(), 
        genre:"Select Genere"
    })
    const [error, setError] = React.useState(undefined);

   ///////////////////////////

  
   

   const years = range(1940, getYear(new Date()) + 1, 1);
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
        if(isLoggued){
            history.push("/")
        }
    },[])
    

    const handleOnChange = (e) => {
        
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    
    console.log(form)
   
    const createAccount = async (e) =>{
        //Avoid html default submit
        e.preventDefault();
        if (!form.email || !form.password) {
        setError("No se permiten campos vacios");
        return;
        }
        ///////
        const start= form.dob.getFullYear()+'-' + (form.dob.getMonth()+1) + '-'+form.dob.getDate()

        //Call to API
        try{
            

            var url = `${config.backendURL}carer/`;
            let h = new Headers();
            
            h.append('Accept', 'application/json, text/plain, /')
            h.append('Content-Type', 'application/json')

            const b = {
            "email":form.email, 
            "password":form.password, 
            "photo":form.photo, 
            "name":form.name, 
            "lastname":form.lastname,         
            "phonenumber":form.phonenumber, 
            "dob":start, 
            "genre":form.genre} 
           
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
                    // console.log(data.Status)
                    // if(data.Status==0){
                    //     history.push({
                    //         pathname:"/addPatient",
                    //         state:form
                    //     })
                    // }
                    if(data.Status==0){

                        try{
    
    
                            var url = `${config.backendURL}carer/login/`;
                            let h = new Headers();
                            
                            h.append('email',`${form.email}`)
                            h.append('password',`${form.password}`)
                           
                           
                            let req= new Request(url,{
                                method: 'GET',
                                headers: h,
                    
                                
                            });
                
                            fetch(req)
                            .then((response)=>{
                                response.json().then((data) => {
                                    console.log(data);
                                    if (data.Status!==0) {
                                        setError("Usuario o contraseña invalidos");
                                    } else {
                                        console.log(data);
                                      
                                        const base64Login = btoa(data.token);
                                        localStorage.setItem("login", base64Login);
                                        history.push({
                                            pathname: '/addPatient',
                                            state: data // your data array of objects
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


    
    return(
        <>
            <div className="container">
                <div className="container-register">
                    <div className="title-register">
                        <h2>Register</h2>                        
                    </div>
                    <div className="fullname-container">
                        <div className="firstname-container">
                            <label>First Name</label>
                            <Input name="name" onChange={handleOnChange} style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                        <div className="lastname-container">
                            <label>Last Name</label>
                            <Input name="lastname" onChange={handleOnChange} style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                    </div>
                    <div className="user-password-container">
                        <div className="password-container">
                            <label>Password</label>
                            <Input name="password" onChange={handleOnChange} style={{width: "90%",height: "40px"}} type="password" />
                        </div>
                    </div>
                    <div className="email-phone-container">
                        <div className="email-container">
                            <label>Email</label>
                            <Input name="email" onChange={handleOnChange}style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                        <div className="phone-container">
                            <label>Phone Number</label>
                            <Input name="phonenumber" onChange={handleOnChange} style={{width: "90%",height: "40px"}} type="number" />
                        </div>
                    </div>
                    <div className="genere-date-container">
                        <div className="genere-container">
                            <label>Genre</label>
                            <select name="genre" onChange={handleOnChange} style={{width:"92%", height:"48px"}}> 
                                <option value="Select Genere">Select Genre</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Personalize">Personalize</option>

                            </select>
                        </div>
                        <div className="date-container">
                            <label>Date of Birth(yyyy-mm-dd)</label>
                            <DatePicker
                                name="dob"
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
                                selected={form.dob}
                                onChange={(date)=>{
                                    
                                    setForm({
                                        ...form,
                                        dob:date
                                    })
                                }}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                    </div>
                    <div className="profilePicture-buttons-container">
                        <div className="profileContainer">
                        <SelectImage/>
                        </div>
                        <div className="buttonsContainer">
                            <Button  className="buttonCancel">Cancel</Button>
                            <Button onClick={createAccount} className="buttonCreate">Create Account</Button>

                        </div>
                    </div>
                    

                </div>
            </div>
        </>
    )
}
export default SignUp