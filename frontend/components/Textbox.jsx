import CustomTitle from "./CustomTitle";
import requestHandler from "../functions/RequestHandler";

const Textbox = (props) => {
  return (
    <div className="bg-white p-6 mt-12 last:mb-12 rounded-xl inline-block">
      <CustomTitle>{props.title}</CustomTitle>
      <div className="mt-4">
        {!!props.picture && (
          <img
            className="h-48 w-48 rounded-xl object-cover float-right ml-4"
            src={`${requestHandler.url}/${props.picture}`}
            alt={props.picture}
          />
        )}
        <span className="whitespace-pre-wrap">{props.content}</span>
      </div>
    </div>
  );
};
export default Textbox;
