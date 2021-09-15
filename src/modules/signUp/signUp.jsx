import './signUp.scss'
import Input from '../../components/Input/input'
const SignUp = () =>{
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
                            <Input style={{width: "220px",height: "30px"}} type="text" />
                        </div>
                        <div className="lastname-container">
                            <label>Last Name</label>
                            <Input style={{width: "220px",height: "30px"}} type="text" />
                        </div>
                        <div className="middlename-container">
                            <label>Middle Name(Optional)</label>
                            <Input style={{width: "220px",height: "30px"}} type="text" />
                        </div>


                    </div>
                    

                </div>
            </div>
        </>
    )
}
export default SignUp