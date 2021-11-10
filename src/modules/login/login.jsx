import './login.scss'
import React, { useEffect } from "react";
import coverIMG from '../../assets/loginCover.jpeg'
import logo from '../../assets/logo.png'
import Button from '../../components/Button/button'
import Input from '../../components/Input/input'
import config from '../../config'
import { useHistory } from "react-router-dom";


const Login = () => {
    const [error, setError] = React.useState(undefined);
  
    const [form, setForm] = React.useState({
        email: " ",
        password: " ",
    });
    
    const history = useHistory();

    useEffect(() => {
      const hasLogin = localStorage.getItem("login");
      if (hasLogin) {
        history.push("/");
      }
    }, [history]);

    const handleOnChange = (e) => {
        setError(undefined);
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    //Redirects to '/' if credetials granted
    const handleSubmit = async (e) => {
       
        //Avoid html default submit
        e.preventDefault();
        if (!form.email || !form.password) {
        setError("No se permiten campos vacios");
        return;
        }

        //Call to API
        try{


            var url = `${config.backendURL}carer/login/`;
            let h = new Headers();
            
            h.append('email',`${form.email}`)
            h.append('password',`${form.password}`)
           
           
            let req= new Request(url,{
                method: 'GET',
                headers: h,
    
                
            });

            await fetch(req)
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
                            pathname: '/',
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

    return(
        <div className="login-container">
            <div className="image-container">
                <img className="img-login" src={coverIMG} alt="loginIMG" />
            </div>
            <div className="form-container">
                <div className="login-form">
                    <div className="logo-container">

                    <img src={logo} alt="Logo" />
                    </div>
                    <div className="input-container">
                        <div className="email">
                            <h5>Email</h5>
                            <Input name="email" onChange={handleOnChange} style={{width:"90%"}} type="text" placeholder="example@example.com" />
                        </div>
                        <div className="password">
                            <h5>Password</h5>
                            <Input name="password" onChange={handleOnChange} style={{width:"90%"}} type="password" placeholder="password" />
                        </div>
                       
                    </div>
                    <div className="button-Container">
                        <Button  className="button-signin" onClick={handleSubmit}>Sign in</Button>
                    </div>
                    
                </div>
                <div className="register-link">
                {error ? <div className="error"><span >{error}</span></div> : null}
                <span>Do not have an account? <a href="/signup">Register here</a></span>
                </div>

            </div>
            
        
        </div>
    )
}

export default Login;