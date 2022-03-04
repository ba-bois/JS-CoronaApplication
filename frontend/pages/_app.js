import React, { useState } from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Overlay from "../components/Overlay";

export const OverlayContext = React.createContext();

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    const [overlayState, setOverlayState] = useState(null);

    return (
        <SessionProvider session={session}>
            <OverlayContext.Provider value={(overlay) => setOverlayState(overlay)}>
                {overlayState === null || <Overlay {...overlayState} />}
                <Component {...pageProps} />
            </OverlayContext.Provider>
        </SessionProvider>
    );
}
