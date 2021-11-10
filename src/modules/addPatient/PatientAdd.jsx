import React, { useEffect } from 'react'
import '../addPatient/style.scss'
import Input from '../../components/Input/input'
import logo from '../../assets/logo.png'
import Button  from '../../components/Button/button'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import config from '../../config'

const PatientAdd = () =>{
    const history = useHistory()
    const location = useLocation()
    const [form,setForm]=React.useState({
        token:" "
    })
    const [error, setError] = React.useState(undefined);


    useEffect(()=>{
        const hasLogin = localStorage.getItem("login");
        if (!hasLogin) {
          history.push("/login");
        }

        console.log(location.state)
    },[location])
    const cancelAdd = () =>{
        history.push({
            pathname: '/',
            state: location.state // your data array of objects
          })
    }

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    //Redirects to '/' if credetials granted
    const addPatient = async (e) => {
        //Avoid html default submit
        e.preventDefault();
        if (!form.token) {
        setError("No se permiten campos vacios");
        return;
        }

        //Call to API
        try{


            var url = `${config.backendURL}carer/addPatient`;
            let h = new Headers();
            h.append('authorization', `Bearer ${location.state.token}`)
            h.append('Accept', 'application/json, text/plain, /')
            h.append('Content-Type', 'application/json')

            const b = {"pairingToken" : form.token} 
           
           console.log(form)
           console.log(location.state.token)
           console.log(b)
            let req= new Request(url,{
                method: 'PUT',
                headers: h,
                body: JSON.stringify(b)
                
            });
    
            await fetch(req)
            .then((response)=>{
                response.json().then((data) => {
                    console.log(data)
                    history.push({
                        pathname:"/",
                        state: location.state
                        
                    })
                    
                   
                    
                    
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
            <div className="body">
                <div className="containerAdd">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="inputContainer">
                        <h1>Register Token</h1>
                        <Input name="token" onChange={handleOnChange} style={{width: "70%",height: "40px"}} type="text"></Input>
                    </div>
                    <div className="buttons">
                        
                        <Button onClick={cancelAdd} className="buttonCancel">Cancel</Button>
                    
                        <Button onClick={addPatient} className="buttonContinue">Continue</Button>
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientAdd;