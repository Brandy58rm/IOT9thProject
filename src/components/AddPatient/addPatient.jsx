import './style.scss'
import Button from '../Button/button';
import addImg from '../../assets/addPatient.png'
const AddPatient = (props) => {
    return(
        <>
        <div className="cardContent">
            <div className="imgContent">
                <img src={addImg} alt="" />
            </div>
            <div className="nameButton">
                <div className="nameContent">
                    <h1>
                        Add new patient
                    </h1>
                </div>
                <div className="buttonContent">
                    <Button onClick={props.onClick} className="button">Add</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddPatient;