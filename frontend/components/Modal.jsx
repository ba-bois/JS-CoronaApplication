import { useContext } from "react";
import { X } from "tabler-icons-react";
import { OverlayContext } from "../pages/_app";

export default (props) => {
  const { setModal } = useContext(OverlayContext);

  return (
    <div className="fixed h-full w-full p-20 bg-[black] bg-opacity-30 flex justify-center text-2xl z-40">
      <div
        className={`h-full w-full max-w-4xl border-4 relative border-mango bg-white rounded-2xl self-end flex justify-between p-7`}
      >
        <div className="overflow-hidden whitespace-nowrap mr-5 cursor-default w-full">
          <h1 className="mb-4 font-bold">{props.title}</h1>
          {props.content}
        </div>

        <div
          className={`absolute top-4 right-4 flex items-center cursor-pointer hover:text-mango duration-300`}
          onClick={() => {
            setModal(null);
          }}
        >
          Schließen
          <X size={46} />
        </div>
      </div>
    </div>
  );
};
