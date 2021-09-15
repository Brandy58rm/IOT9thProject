
const Button = (props) =>{
    return(
        <button 
        style={{
            minWidth:props.minWidth,
            ...props.style
        }}
        className={props.className}
        disabled={props.disabled}
        id={props.id} 
        onClick={props.onClick}>
            {props.text || props.children}

        </button>
    )
}
export default Button