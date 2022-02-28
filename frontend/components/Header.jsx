import { useRouter } from "next/router";
import Title from "./Title";
import Button from "./Button";
import { Vaccine } from "tabler-icons-react";

const Header = (props) => {
  const router = useRouter();

  return (
    <div className="w-full h-32 bg-white rounded-b-[50px] flex justify-between p-12 items-center">
      <div className="h-24 w-24 rounded-full justify-center bg-ghostwhite flex items-center">
        <Vaccine size={46} color={"#253D5B"}/>
      </div>
      <Title>{props.children}</Title>
      <Button
        className="text-2xl"
        onClick={() => {
          router.push("/anmeldung");
        }}
      >
        Anmelden
      </Button>
    </div>
  );
};
export default Header;
