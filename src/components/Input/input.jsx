import './input.scss'
const Input = (props) =>{
    return(
        <input name={props.name} type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value} className={props.className} style={props.style} />
    )
}

export default Input