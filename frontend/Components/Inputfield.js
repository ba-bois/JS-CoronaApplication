import { useState, useEffect } from "react";

const UserLogin = (props) => {
  const [hasError, setHasError] = useState(props.hasError);

  useEffect(() => {
    setHasError(props.hasError);
  }, [props.hasError]);

  return (
    <div
      id={props.id}
      className={`rounded-full w-full h-auto min-h-5 bg-ghostwhite flex align-middle ${
        !hasError
          ? "focus-within:ring-mango focus-within:ring-2"
          : "ring-fieryrose ring-4"
      }  overflow-hidden ${props.className}`}
    >
      <input
        placeholder={props.placeholder}
        className={`bg-ghostwhite w-full ml-4 outline-none overflow-hidden text-2xl ${
          hasError && "text-fieryrose placeholder:text-fieryrose"
        }`}
        onBlur={() => {
          console.log("Hallo");
        }}
        type="text"
      />
      <div
        className={`w-1/5 flex justify-end ${
          !hasError ? "fill-prussianblue" : "fill-fieryrose"
        }`}
      >
        <div className="flex flex-col justify-center pr-5 ">
          {props.icon}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
