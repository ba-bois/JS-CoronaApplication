import { useRouter } from "next/router";
import CustomTitle from "./CustomTitle";
import CustomButton from "./CustomButton";
import { Vaccine } from "tabler-icons-react";
import { prussianblue } from "../constants/colors";

const Header = (props) => {
  const router = useRouter();

  return (
    <div className="w-full h-32 bg-white rounded-b-[50px] flex justify-between p-12 items-center">
      <div className="h-24 w-24 rounded-full justify-center bg-ghostwhite flex items-center">
        <Vaccine size={46} color={prussianblue} />
      </div>
      <CustomTitle>{props.children}</CustomTitle>
      <CustomButton
        className="text-2xl"
        onClick={() => {
          router.push("/anmeldung");
        }}
      >
        Anmelden
      </CustomButton>
    </div>
  );
};
export default Header;
