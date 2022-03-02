import Title from "./Title";
import requestHandler from "../functions/RequestHandler";

const Textbox = (props) => {
  return (
    <div className="bg-white mx-[25%] w-[50%] p-6 mt-12 last:mb-12 rounded-xl inline-block">
      <Title className="items-start">{props.title}</Title>
        <div className="mt-4">
        {!!props.picture && <img className="h-48 w-48 rounded-xl object-cover float-right ml-4" src={`${requestHandler.url}/${props.picture}`} alt={props.picture} />}
          <text className="whitespace-pre-wrap">
          {props.content}
          </text>
        </div>
      </div>
  );
};
export default Textbox;
