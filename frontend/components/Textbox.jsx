import Title from "./Title"

const Textbox = (props) => {
    return <div>
        <Title>{props.title}</Title>
        <span>{props.content}</span>
    </div>
}
export default Textbox