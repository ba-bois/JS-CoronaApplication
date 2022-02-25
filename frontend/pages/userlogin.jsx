import Head from "next/head";
import Inputfield from "../Components/Inputfield";
import { User, DeviceMobile } from "tabler-icons-react";
export default function UserLogin() {
  return (
    <div>
      <Head>
        <title>Anmeldung Termin</title>
        <meta
          name="description"
          content="Your Appointment for a corona test made here"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-ghostwhite flex flex-col w-full items-center selection:bg-mango text-prussianblue">
        {/* Main Bubble */}
        <div className="h-[80vh] w-2/5 mt-7 bg-white border-20 rounded-3xl flex flex-col gap-12 p-10">
          Title
          <div className="flex flex-auto gap-8">
            <Inputfield placeholder="Vorname" icon={<User size={32} />} />
            <Inputfield placeholder="Nachname" icon={<User size={32} />} />
          </div>
          <Inputfield
            className="flex-auto"
            placeholder="Handynummer"
            icon={<DeviceMobile size={32} />}
          />
          <Inputfield
            placeholder="E-Mail-adresse"
            className="flex-auto"
            icon={<DeviceMobile size={32} />}
            hasError
          />
          <div className="flex flex-auto gap-8">
            <Inputfield
              placeholder="Postleitzahl"
              icon={<DeviceMobile size={32} />}
            />
            <Inputfield placeholder="Stadt" icon={<DeviceMobile size={32} />} />
          </div>
          <div className="flex flex-auto gap-8">
            <Inputfield
              placeholder="Straße"
              icon={<DeviceMobile size={32} />}
            />
            <Inputfield
              placeholder="Hausnummer"
              icon={<DeviceMobile size={32} />}
            />
          </div>
          <Inputfield
            className="flex-auto"
            placeholder="Geburtsdatum"
            icon={<DeviceMobile size={32} />}
          />
        </div>
        <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[40px] border-t-white bg-ghostwhite z-10"/>

        {/* Button After the Bubble */}
        <button className="pt-5">Bestätigen!</button>
      </main>

      <footer></footer>
    </div>
  );
}
