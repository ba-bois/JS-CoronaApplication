import { useContext } from "react";
import { X } from "tabler-icons-react";
import { OverlayContext } from "../pages/_app";

export default (props) => {
    const setOverlay = useContext(OverlayContext);

    return (
        <div className="fixed h-full w-full flex justify-center text-2xl pointer-events-none">
            <div
                className={`w-2/3 h-28 border-4 ${
                    props.error ? "border-fieryrose" : "border-mango"
                } bg-white z-50 rounded-2xl self-end mb-8 flex items-center justify-between p-7`}
            >
                <div className="overflow-hidden whitespace-nowrap mr-5 cursor-default" title={props.content}>
                    {props.content}
                </div>

                <div
                    className={`flex items-center cursor-pointer pointer-events-auto ${props.error ? "hover:text-fieryrose" : "hover:text-mango"} duration-300`}
                    onClick={() => {
                        setOverlay(null);
                    }}
                >
                    Schließen
                    <X size={46} />
                </div>
            </div>
        </div>
    );
};
