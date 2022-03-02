const CustomButton = (props) => {
  return (
    <button
      className={`px-5 py-2 rounded-full bg-ghostwhite ease-in duration-300 ${props.className} ${
        props.disabled ? "text-fieryrose" : "hover:bg-mango hover:text-white"
      }`}
      onClick={(e) => {
        props.onClick(e);
      }}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
export default CustomButton;
