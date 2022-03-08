import { getSession } from "next-auth/react";
import { Template, CustomButton, EditNews } from "../../components";
import { Edit, Eye, FileUpload, Trash } from "tabler-icons-react";
import Head from "next/head";
import { prussianblue } from "../../constants/colors";
import requestHandler from "../../functions/RequestHandler";
import { useEffect, useState, useContext } from "react";
import { OverlayContext } from "../_app";

export default function VerwaltungNeuigkeiten() {
  const [news, setNews] = useState([]);
  const [searchString, setSearchString] = useState("");

  const { setModal, setNotificationBar } = useContext(OverlayContext);

  useEffect(() => {
    requestHandler
      .getNeuigkeiten()
      .then((n) => {
        setNews(n);
      })
      .catch((err) => {
        console.log("test");
        setNotificationBar({
          content: `Fehler! Fehlernachricht: "${err}"`,
          error: true,
        });
      });
  }, []);

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
            onInput={(e) => {
              setSearchString(e.target.value);
            }}
          />
          <CustomButton
            onClick={() => {
              setModal({
                title: "Neuigkeit hinzufügen",
                content: (
                  <EditNews
                    onCustomSubmit={(formData) => {
                      requestHandler
                        .postNeuigkeiten(formData)
                        .then((newsId) => {
                          setNotificationBar({
                            content: "Neuigkeit erfolgreich veröffentlicht.",
                          });
                          setModal(null);
                          setNews([
                            ...news,
                            {
                              title: formData.get("title"),
                              content: formData.get("content"),
                              ...(formData.get("picture") && {
                                picture: formData.get("picture").name,
                              }),
                              newsId,
                            },
                          ]);
                        })
                        .catch((err) => {
                          setNotificationBar({
                            content: `Fehler! Fehlernachricht: "${err}"`,
                          });
                          console.error(err);
                        });
                    }}
                  />
                ),
              });
            }}
          >
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
            {news.length > 0 &&
              news
                ?.filter((n) =>
                  Object.values(n).some((event) =>
                    event?.toLowerCase().includes(searchString.toLowerCase())
                  )
                )
                ?.map((n, i) => (
                  <tr key={n.newsId}>
                    <td className="pt-2">{n.title}</td>
                    <td className="pt-2">
                      {n.content?.length > 100
                        ? n.content.slice(0, 100) + "..."
                        : n.content}
                    </td>
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
                              .then(
                                setNews([
                                  ...news.filter(
                                    (nEl) => nEl.newsId !== n.newsId
                                  ),
                                ])
                              );
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
                            content: (
                              <EditNews
                                news={n}
                                onCustomSubmit={(formData) => {
                                  requestHandler
                                    .updateNeuigkeiten(formData, n.newsId)
                                    .then(() => {
                                      setNotificationBar({
                                        content:
                                          "Neuigkeit erfolgreich aktualisiert.",
                                      });
                                      setModal(null);

                                      const temp = [...news];
                                      temp[i] = {
                                        title: formData.get("title"),
                                        content: formData.get("content"),
                                        ...(formData.get("picture") && {
                                          picture: formData.get("picture").name,
                                        }),
                                        newsId: n.newsId,
                                      };
                                      setNews(temp);
                                    })
                                    .catch((err) => {
                                      setNotificationBar({
                                        content: `Fehler! Fehlernachricht: "${err}"`,
                                      });
                                      console.error(err);
                                    });
                                }}
                              />
                            ),
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
