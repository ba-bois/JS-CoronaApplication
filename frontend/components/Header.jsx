import Title from "./Title"
import Button from "./Button"

const Header = (props) => {
    return <div className="w-full h-32 bg-white rounded-b-[50px] flex justify-between p-3 items-center">
        <div>
            <div className="h-24 w-24 rounded-full bg-ghostwhite"/>
        </div>
        <div>
            <Title>{props.children}</Title>
        </div>
        <div>
            <Button onClick={() => {console.log("test")}}>anmelden</Button>
        </div>
    </div>
}
export default Header