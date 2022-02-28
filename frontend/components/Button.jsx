const Button = (props) => {
    return <button className={`px-5 py-2 rounded-full bg-ghostwhite hover:bg-mango hover:text-white ease-in duration-300 ${props.className}`} onClick={(variable) => {props.onClick(variable)}}>
        {props.children}
    </button>
}
export default Button