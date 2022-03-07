import RequestHandler from "../functions/RequestHandler";

const CustomButton = (props) => {
  return (
    <button
      className={`px-5 py-2 rounded-full bg-ghostwhite ease-in duration-300 ${props.className} ${
        props.disabled ? "text-fieryrose border-fieryrose" : "hover:bg-mango hover:text-white"
      }`}
      onClick={(e) => {
        props.onClick(e);
      }}
      disabled={props.disabled}
    >
      {!props.isLoading ? props.children : <img className="object-contain h-full w-auto" src={`${RequestHandler.url}/loading-buffering.gif`}/>}
    </button>
  );
};
export default CustomButton;
