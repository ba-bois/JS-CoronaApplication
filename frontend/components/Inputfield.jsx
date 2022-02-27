import React from "react";

const UserLogin = (props) => {
  return (
    <div className="flex flex-auto relative">
      <div
        id={props.id}
        className={`rounded-full w-full h-auto min-h-5 bg-ghostwhite flex align-middle relative ${
          !props.errorMsg
            ? "focus-within:ring-mango focus-within:ring-2"
            : "ring-fieryrose ring-4"
        }  overflow-hidden  ${props.className}`}
      >
        <input
          // autoComplete = "off" ist notwendig, da (mögl. unter Anderem) bei Firefox 97.0.1 die Felder durch Autovervollständigung ausgefüllt werden, aber im React state immernoch initial bei null sind 
          autoComplete="off"
          placeholder={props.placeholder}
          className={`bg-ghostwhite w-full ml-4 outline-none overflow-hidden text-2xl z-10 invalid:text-fieryrose ${
            !!props.errorMsg && "text-fieryrose placeholder:text-fieryrose"
          }`}
          onBlur={(e) => {
            !!props.onBlur && props.onBlur(e);
          }}
          type={props.type || "text"}
          pattern={props.pattern}
        />
        <div
          className={`w-1/5 flex justify-end ${
            !props.errorMsg ? "fill-prussianblue" : "fill-fieryrose"
          }`}
        >
          <div className="flex flex-col justify-center pr-5">
            {React.cloneElement(props.icon, {
              color: !props.errorMsg ? "#253D5B" : "#F05365",
            })}
          </div>
        </div>
      </div>
      {props.errorMsg && (
        <span className="absolute w-[100%] -bottom-[25px] text-sm whitespace-nowrap overflow-hidden text-fieryrose ml-3">
          {props.errorMsg}
        </span>
      )}
    </div>
  );
};

export default UserLogin;
