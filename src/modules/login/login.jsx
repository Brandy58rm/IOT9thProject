import './login.scss'
import coverIMG from '../../assets/loginCover.jpeg'
import logo from '../../assets/logo.png'
import Button from '../../components/Button/button'
import Input from '../../components/Input/input'
const Login = () => {

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
                            <Input style={{width:"90%"}} type="text" placeholder="example@example.com" />
                        </div>
                        <div className="password">
                            <h5>Password</h5>
                            <Input style={{width:"90%"}} type="password" placeholder="password" />
                        </div>

                    </div>
                    <div className="button-Container">
                        <Button  className="button-signin">Sign in</Button>
                    </div>

                </div>
                <div className="register-link">
                <span>Do not have an account? <a href="#">Register here</a></span>
                </div>

            </div>
            
        
        </div>
    )
}

export default Login;