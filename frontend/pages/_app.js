import React, { useState } from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NotificationBar, Modal } from "../components";
import Head from "next/head";

export const OverlayContext = React.createContext();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [notificationBar, setNotificationBar] = useState(null);
  const [modal, setModal] = useState(null);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>
      <SessionProvider session={session}>
        <OverlayContext.Provider
          value={{
            setModal: (m) => {
              setModal(m);
            },
            setNotificationBar: (nb) => {
              setNotificationBar(nb);
            },
          }}
        >
          {notificationBar === null || <NotificationBar {...notificationBar} />}
          {modal === null || <Modal {...modal} />}
          <Component {...pageProps} />
        </OverlayContext.Provider>
      </SessionProvider>
    </>
  );
}
