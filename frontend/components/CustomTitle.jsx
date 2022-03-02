const CustomTitle = (props) => {
  return (
    <div className="flex flex-col items-center w-fit">
      <div className="text-3xl mb-2">{props.children}</div>
      <div className="h-1 w-11/12 bg-mango rounded-full" />
    </div>
  );
};
export default CustomTitle;
