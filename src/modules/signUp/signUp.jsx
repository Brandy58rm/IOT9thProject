import React,{useEffect, useState} from 'react'
import './signUp.scss'
import Input from '../../components/Input/input'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import SelectImage from '../../components/SelectImage/selectImage';
import Button from '../../components/Button/button'
const SignUp = () =>{
    const [selectedDate, setSelectedDate] = useState(null)
    useEffect(()=>{
        var isLoggued = localStorage.getItem("login")
        console.log(isLoggued)
        if(isLoggued){
            
        }
    },[])
    
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
                            <Input style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                        <div className="lastname-container">
                            <label>Last Name</label>
                            <Input style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                    </div>
                    <div className="user-password-container">
                        <div className="user-container">
                            <label>User Name</label>
                            <Input style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                        <div className="password-container">
                            <label>Password</label>
                            <Input style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                    </div>
                    <div className="email-phone-container">
                        <div className="email-container">
                            <label>Email</label>
                            <Input style={{width: "90%",height: "40px"}} type="text" />
                        </div>
                        <div className="phone-container">
                            <label>Phone Number</label>
                            <Input style={{width: "90%",height: "40px"}} type="number" />
                        </div>
                    </div>
                    <div className="genere-date-container">
                        <div className="genere-container">
                            <label>Genre</label>
                            <select style={{width:"92%", height:"48px"}}> 
                                <option value="Select Genere">Select Genre</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Personalize">Personalize</option>

                            </select>
                        </div>
                        <div className="date-container">
                            <label>Date of Birth(yyyy-mm-dd)</label>
                            <DatePicker 
                            className="dateInput"
                            selected={selectedDate} 
                            onChange={(date)=>{setSelectedDate(date)}} 
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select date of birth"
                            />
                        </div>
                    </div>
                    <div className="profilePicture-buttons-container">
                        <div className="profileContainer">
                        <SelectImage/>
                        </div>
                        <div className="buttonsContainer">
                            <Button className="buttonCancel">Cancel</Button>
                            <Button className="buttonCreate">Create Account</Button>

                        </div>
                    </div>
                    

                </div>
            </div>
        </>
    )
}
export default SignUp