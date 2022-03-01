import Title from "./Title";

const Textbox = (props) => {
  return (
    <div className="bg-white mx-[25%] min-w-fit p-6 mt-12 last:mb-12 rounded-xl inline-block">
      <Title className="items-start">{props.title}</Title>
        <div className="mt-4">
        {!!props.picture && <img className="h-48 w-48 rounded-xl object-contain float-right ml-4" src={`http://localhost:3001/${props.picture}`} alt={props.picture} />}
          <p>
          {props.content}
          </p>
        </div>
      </div>
  );
};
export default Textbox;
