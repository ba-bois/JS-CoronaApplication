import { getSession } from "next-auth/react";
import { Template, CustomButton, EditNews } from "../../components";
import { Edit, Eye, FileUpload, Trash } from "tabler-icons-react";
import Head from "next/head";
import { prussianblue } from "../../constants/colors";
import requestHandler from "../../functions/RequestHandler";
import { useEffect, useState, useContext } from "react";
import { OverlayContext } from "../_app";

export default function VerwaltungAnmeldungsUebersicht() {
    const [news, setNews] = useState([]);
    const [searchString, setSearchString] = useState("");

    const { setModal } = useContext(OverlayContext);

    useEffect(() => {
        requestHandler.getNeuigkeiten().then(n => {
            setNews(n);
        });
    }, []);

    const updateNewsHandler = (newNews, id = null) => {
        if (id) {
            const index = news.findIndex(n => n.newsId === id);
            const temp = [ ...news ];
            temp[index] = newNews;
            setNews(temp);
        } else {
            setNews([...news, newNews]);
        }
    };


    return (
        <>
            <Head>
                <title>Neuigkeiten</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Template>
                <h1 className="text-2xl pb-4">Neuigkeiten</h1>
                <div className="flex justify-between">
                    <input
                        className="vw-input my-2"
                        type="search"
                        placeholder="Suche"
                        value={searchString}
                        onInput={e => {
                            setSearchString(e.target.value);
                        }}
                    />
                    <CustomButton
                        onClick={() => {
                            setModal({
                                title: "Neuigkeit hinzufügen",
                                content: <EditNews updateNewsHandler={updateNewsHandler} />,
                            });
                        }}>
                        Hinzufügen
                    </CustomButton>
                </div>

                <table className="table-fixes w-full mt-6">
                    <thead className="text-left">
                        <tr>
                            <th>Titel</th>
                            <th>Textvorschau</th>
                            <th className="w-24" />
                        </tr>
                    </thead>
                    <tbody className="border-mango border-t-4 w mx-auto rounded-full">
                        {news
                            ?.filter(n => Object.values(n).some(event => event.toLowerCase().includes(searchString.toLowerCase())))
                            ?.map(n => (
                                <tr key={n.newsId}>
                                    <td className="pt-2">{n.title}</td>
                                    <td className="pt-2">{n.content?.length > 100 ? n.content.slice(0, 100) + "..." : n.content}</td>
                                    <td className="flex gap-1 justify-end pt-2">
                                        <Trash
                                            size={24}
                                            strokeWidth={1}
                                            color={prussianblue}
                                            className={`hover:stroke-fieryrose cursor-pointer`}
                                            onClick={() => {
                                                if (confirm("Sicher das Sie das löschen möchten?")) {
                                                    requestHandler
                                                        .deleteNeuigkeiten(n.newsId)
                                                        .then(setNews([...news.filter(nEl => nEl.newsId !== n.newsId)]));
                                                }
                                            }}
                                        />
                                        <Edit
                                            size={24}
                                            strokeWidth={1}
                                            color={prussianblue}
                                            className={`hover:stroke-mango cursor-pointer`}
                                            onClick={() => {
                                                setModal({
                                                    title: "Neuigkeit bearbeiten",
                                                    content: <EditNews news={n} updateNewsHandler = {updateNewsHandler} />,
                                                });
                                            }}
                                        />
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
