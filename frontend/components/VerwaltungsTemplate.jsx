import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Vaccine } from "tabler-icons-react";

const VerwaltungsTemplate = (props) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="bg-ghostwhite w-screen h-screen">
      <div className="bg-white py-2">
        <div className="text-prussianblue flex justify-between max-w-4xl mx-auto">
          <nav className="flex items-center gap-5">
            <span className="flex items-center gap-x-1">
              <Vaccine size={46} color={"#253D5B"} />
              <h1 className="text-2xl font-bold">JS Corona</h1>
            </span>
            <Link href="/verwaltung">
              <a
                className={router.pathname == "/verwaltung" ? "font-bold" : ""}
              >
                Dashboard
              </a>
            </Link>
            <Link href="/verwaltung/anmeldungen">
              <a
                className={
                  router.pathname == "/verwaltung/anmeldungen"
                    ? "font-bold"
                    : ""
                }
              >
                Anmeldungsübersicht
              </a>
            </Link>
          </nav>
          <div className="flex items-center gap-5">
            <a
              href="#"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}/verwaltung/login`,
                })
              }
            >
              Abmelden
            </a>
            <img
              className="w-12 h-12 rounded-full border-b-prussianblue border-2"
              src={session.user.image}
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-5 mt-10 max-w-4xl mx-auto rounded-xl">
        {props.children}
      </div>
    </div>
  );
};
export default VerwaltungsTemplate;
