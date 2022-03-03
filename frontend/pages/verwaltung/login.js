import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import { BrandGithub } from "tabler-icons-react";
import { CustomTitle } from "../../components/";

export default function Login() {
    return (
        <>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-ghostwhite w-screen h-screen pt-10">
                <div className="bg-white max-w-xl mx-auto rounded-xl flex flex-col items-center gap-6 py-8 shadow-md">
                    <CustomTitle>Login</CustomTitle>

                    <input className="rounded-box bg-ghostwhite" type="text" placeholder="Benutzername" />
                    <input className="rounded-box bg-ghostwhite" type="password" placeholder="Passwort" />
                    <div className="rounded-box bg-fieryrose text-white text-center">Eingabedaten falsch</div>

                    <div className="flex w-2/3 items-center">
                        <a className="flex-1" href="#">
                            Passwort vergessen?
                        </a>
                        <button className="rounded-full px-14 py-2 outline-none bg-prussianblue text-white">Anmelden</button>
                    </div>

                    <hr className="border-mango border-t-4 w-1/2 mx-auto rounded-full" />

                    <button
                        className="bg-ghostwhite flex items-center gap-3 w-1/2 rounded-full px-3 py-2 outline-none relative"
                        onClick={() =>
                            signIn("github", {
                                callbackUrl: `${window.location.origin}/verwaltung`,
                            })
                        }
                        role="link">
                        <BrandGithub size={32} color={"#253D5B"} /> <span className="w-full text-center">GitHub Login</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: "/verwaltung/anmeldungen",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}
