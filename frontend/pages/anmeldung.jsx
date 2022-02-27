import Head from "next/head";
import Inputfield from "../Components/Inputfield";
import { useState } from "react";

import {
  User,
  DeviceMobile,
  Mail,
  Home,
  Home2,
  BuildingSkyscraper,
  Gift,
  ListNumbers,
} from "tabler-icons-react";
export default function UserLogin() {
  const [errMsgObject, setErrMsgObject] = useState({});
  const [data, setData] = useState({
    surname: null,
    lastName: null,
    phoneNumber: null,
    mail: null,
    postCode: null,
    city: null,
    street: null,
    houseNumber: null,
    birthdate: null,
  });

  // Schnittstelle Daten:
  // {
  //   surname: string,
  //   lastName: string,
  //   phoneNumber: string,
  //   mail: string,
  //   postCode: string,
  //   city: string,
  //   street: string,
  //   houseNumber: string,
  //   birthdate: date
  // }

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
        <div className="h-[80vh] xl:w-2/5 md:w-4/5 w-full mt-7 bg-white border-20 rounded-3xl flex flex-col gap-12 p-10 overflow-auto">
          Title
          <div className="flex flex-auto gap-8 flex-col md:flex-row">
            <Inputfield
              placeholder="Vorname"
              icon={<User size={32} />}
              onBlur={(e) => {
                if (!e.target.value.match(/^([^0-9]+)$/)) {
                  setErrMsgObject({
                    ...errMsgObject,
                    surname: "Ungültiger Vorname.",
                  });
                } else {
                  setErrMsgObject({ ...errMsgObject, surname: null });
                  setData({ ...data, surname: e.target.value });
                }
              }}
              errorMsg={errMsgObject.surname}
            />
            <Inputfield
              placeholder="Nachname"
              icon={<User size={32} />}
              onBlur={(e) => {
                if (!e.target.value.match(/^([^0-9]+)$/)) {
                  setErrMsgObject({
                    ...errMsgObject,
                    lastName: "Ungültiger Nachname.",
                  });
                } else {
                  setErrMsgObject({ ...errMsgObject, lastName: null });
                  setData({ ...data, lastName: e.target.value });
                }
              }}
              errorMsg={errMsgObject.lastName}
            />
          </div>
          <div className="flex flex-auto">
            <Inputfield
              className="flex-auto"
              placeholder="Handynummer"
              icon={<DeviceMobile size={32} />}
              onBlur={(e) => {
                if (!e.target.value.match(/^(^\+49)|(^0[1-9][0-9]+)$/)) {
                  setErrMsgObject({
                    ...errMsgObject,
                    phoneNumber: "Ungültige Telefonnummer.",
                  });
                } else {
                  setErrMsgObject({ ...errMsgObject, phoneNumber: null });
                  setData({ ...data, phoneNumber: e.target.value });
                }
              }}
              errorMsg={errMsgObject.phoneNumber}
            />
          </div>
          <div className="flex flex-auto">
            <Inputfield
              placeholder="E-Mail-adresse"
              className="flex-auto "
              icon={<Mail size={32} />}
              onBlur={(e) => {
                if (!e.target.value.match(/(.+)@(.+){1,}\.(.+){2,}/)) {
                  setErrMsgObject({
                    ...errMsgObject,
                    mail: "Ungültige E-Mail-adresse.",
                  });
                } else {
                  setErrMsgObject({ ...errMsgObject, mail: null });
                  setData({ ...data, mail: e.target.value });
                }
              }}
              errorMsg={errMsgObject.mail}
            />
          </div>
          <div className="flex flex-auto gap-8 flex-col md:flex-row">
            <Inputfield
              placeholder="Postleitzahl"
              icon={<ListNumbers size={32} />}
              onBlur={(e) => {
                if (
                  !e.target.value.match(
                    /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/
                  )
                ) {
                  setErrMsgObject({
                    ...errMsgObject,
                    postCode: "Ungültige Postleitzahl.",
                  });
                } else {
                  setErrMsgObject({ ...errMsgObject, postCode: null });
                  setData({ ...data, postCode: e.target.value });
                }
              }}
              errorMsg={errMsgObject.postCode}
            />
            <Inputfield
              placeholder="Stadt"
              icon={<BuildingSkyscraper size={32} />}
              onBlur={(e) => {
                if (!e.target.value.match(/^([^0-9]+)$/)) {
                  setErrMsgObject({
                    ...errMsgObject,
                    city: "Ungültige Stadt.",
                  });
                } else {
                  setErrMsgObject({ ...errMsgObject, city: null });
                  setData({ ...data, city: e.target.value });
                }
              }}
              errorMsg={errMsgObject.city}
            />
          </div>
          <div className="flex flex-auto gap-8 flex-col md:flex-row">
            <Inputfield
              placeholder="Straße"
              icon={<Home size={32} />}
              onBlur={(e) => {
                if (!e.target.value.match(/^([^0-9]+)$/)) {
                  setErrMsgObject({
                    ...errMsgObject,
                    street: "Ungültige Straße.",
                  });
                } else {
                  setErrMsgObject({ ...errMsgObject, street: null });
                  setData({ ...data, street: e.target.value });
                }
              }}
              errorMsg={errMsgObject.street}
            />
            <Inputfield
              placeholder="Hausnummer"
              icon={<Home2 size={32} />}
              onBlur={(e) => {
                if (!e.target.value.match(/^([0-9]\d*)$/)) {
                  setErrMsgObject({
                    ...errMsgObject,
                    houseNumber: "Ungültige Hausnummer.",
                  });
                } else {
                  setErrMsgObject({ ...errMsgObject, houseNumber: null });
                  setData({ ...data, houseNumber: e.target.value });
                }
              }}
              errorMsg={errMsgObject.houseNumber}
            />
          </div>
          <Inputfield
            className="flex-auto"
            placeholder="Geburtsdatum"
            icon={<Gift size={32} />}
            type="date"
            onBlur={(e) => {
              if (!e.target.validity.valid || !e.target.value) {
                setErrMsgObject({
                  ...errMsgObject,
                  birthdate: "Ungültiges Geburtsdatum.",
                });
              } else {
                setErrMsgObject({ ...errMsgObject, birthdate: null });
                setData({ ...data, birthdate: e.target.valueAsDate });
              }
            }}
            errorMsg={errMsgObject.birthdate}
          />
        </div>

        {/* Triangle */}
        <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[40px] border-t-white bg-ghostwhite z-10" />

        {/* Button After the Bubble */}
        <button
          className="pt-5"
          onClick={() => {
            console.log(data);
          }}
        >
          Bestätigen!
        </button>
      </main>
    </div>
  );
}
