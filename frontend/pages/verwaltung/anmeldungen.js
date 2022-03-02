import { getSession } from "next-auth/react";
import Template from "../../components/VerwaltungsTemplate";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Head from "next/head";
import { prussianblue } from "../../constants/colors";

export default function VerwaltungAnmeldungsUebersicht() {
    return (
        <>
            <Head>
                <title>Anmeldungsübersicht</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Template>
                <h1 className="text-2xl pb-4">Anmeldungsübersicht</h1>
                <div className="flex justify-between">
                    <input className="vw-input my-2" type="text" placeholder="Suche" />
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
                        <tr>
                            <td>Name</td>
                            <td>Geburtsdatum</td>
                            <td>Handynummer</td>
                            <td>E-Mail</td>
                            <td className="flex">
                                <Trash size={32} color={prussianblue} />
                                <Edit size={32} color={prussianblue} />
                                <Eye size={32} color={prussianblue} />
                            </td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>Geburtsdatum</td>
                            <td>Handynummer</td>
                            <td>E-Mail</td>
                            <td className="flex">
                                <Trash size={32} color={prussianblue} />
                                <Edit size={32} color={prussianblue} />
                                <Eye size={32} color={prussianblue} />
                            </td>
                        </tr>
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
