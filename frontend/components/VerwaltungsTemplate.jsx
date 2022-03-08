import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Vaccine } from "tabler-icons-react";
import { prussianblue } from "../constants/colors";

const VerwaltungsTemplate = (props) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <div className="bg-white py-2">
        <div className="flex justify-between max-w-4xl mx-auto">
          <nav className="flex items-center gap-5">
            <span className="flex items-center gap-x-1">
              <Vaccine size={32} color={prussianblue} />
              <h1 className="text-2xl font-bold">JS Corona</h1>
            </span>
            <Link href="/verwaltung">
              <a
                className={router.pathname === "/verwaltung" ? "font-bold" : ""}
              >
                Dashboard
              </a>
            </Link>
            <Link href="/verwaltung/anmeldungen">
              <a
                className={
                  router.pathname === "/verwaltung/anmeldungen"
                    ? "font-bold"
                    : ""
                }
              >
                Anmeldungen
              </a>
            </Link>
            <Link href="/verwaltung/neuigkeiten">
              <a
                className={
                  router.pathname == "/verwaltung/neuigkeiten"
                    ? "font-bold"
                    : ""
                }
              >
                Neuigkeiten
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
    </>
  );
};
export default VerwaltungsTemplate;
