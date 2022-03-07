import { getSession } from "next-auth/react";
import { Template } from "../../components";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Head from "next/head";
import { prussianblue } from "../../constants/colors";
import requestHandler from "../../functions/RequestHandler";
import { useEffect, useState, useContext } from "react";
import { overlayContext } from "../_app";

export default function VerwaltungAnmeldungsUebersicht() {
    const [registrations, setRegistrations] = useState([]);
    const [searchString, setSearchString] = useState("");

    const { setNotificationBar } = useContext(overlayContext);

    useEffect(() => {
        requestHandler
            .getAnmeldungen()
            .then(registrations => {
                setRegistrations(registrations);
            })
            .catch(err => {
                setNotificationBar(`Fehler! Fehlernachricht: "${err}"`, error: true );
            });
    }, []);

    return (
        <>
            <Head>
                <title>Anmeldungen</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Template>
                <h1 className="text-2xl pb-4">Anmeldungen</h1>
                <div className="flex justify-between">
                    <input
                        className="vw-input my-2"
                        type="search"
                        placeholder="Suche"
                        value={searchString}
                        onInput={e => setSearchString(e.target.value)}
                    />
                    <div className="flex">
                        <button className="bg-ghostwhite rounded-l-full px-5">« Vorheriger Tag</button>
                        <button className="bg-ghostwhite px-5 flex-col flex items-center">
                            <strong>Heute</strong>
                            <small>25.04.2022</small>
                        </button>
                        <button className="bg-ghostwhite rounded-r-full px-5">nächster Tag »</button>
                    </div>
                </div>

                <table className="table-fixes w-full mt-6">
                    <thead className="text-left">
                        <tr>
                            <th>Name</th>
                            <th>Geburtsdatum</th>
                            <th>Handynummer</th>
                            <th>E-Mail</th>
                            <th className="w-24"></th>
                        </tr>
                    </thead>
                    <tbody className="border-mango border-t-4 w mx-auto rounded-full">
                        {reqistrations.length > 0 &&
                            registrations
                                .filter(r =>
                                    Object.values({ ...r, birthdate: new Date(r.birthdate).toLocaleDateString("de-DE") }).some(event =>
                                        event.toLowerCase().includes(searchString.toLowerCase())
                                    )
                                )
                                ?.map(r => (
                                    <tr key={r.testId}>
                                        <td className="pt-2">
                                            {r.surname} {r.lastName}
                                        </td>
                                        <td className="pt-2">{new Date(r.birthdate).toLocaleDateString("de-DE")}</td>
                                        <td className="pt-2">{r.phoneNumber}</td>
                                        <td className="pt-2">{r.mail}</td>
                                        <td className="flex gap-1 justify-end pt-2">
                                            <Trash size={24} strokeWidth={1} color={prussianblue} />
                                            <Edit size={24} strokeWidth={1} color={prussianblue} />
                                            <Eye size={24} strokeWidth={1} color={prussianblue} />
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </Template>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/verwaltung/login",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}
