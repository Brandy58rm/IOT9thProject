import './style.scss'
import Button from '../Button/button';
import userImg from '../../assets/userIcon.png'
const CardPatient = (props) => {
    return(
        <>
        <div className="cardContent">
            <div className="imgContent">
                <img src={props.userIMG ? props.userIMG : userImg} alt="" />
            </div>
            <div className="nameButton">
                <div className="nameContent">
                    <h1>
                        {props.name ? props.name : "Nombre apellido apellido"}
                    </h1>
                </div>
                <div className="buttonContent">
                    <Button onClick={props.onClick} className="button">View</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardPatient;