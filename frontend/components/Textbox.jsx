import Title from "./Title";

const Textbox = (props) => {
  return (
    <div className="bg-white mx-[25%] min-w-fit p-6 mt-12 last:mb-12 rounded-xl">
      <Title className="items-start">{props.title}</Title>
      <div className="mt-4">{props.content}</div>
    </div>
  );
};
export default Textbox;
