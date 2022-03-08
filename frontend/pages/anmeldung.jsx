import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import {
  User,
  DeviceMobile,
  Mail,
  Home,
  Home2,
  BuildingSkyscraper,
  Gift,
  ListNumbers,
  ArrowBack,
} from "tabler-icons-react";
import { CustomTitle, CustomButton, CustomInputfield } from "../components/";
import requestHandler from "../functions/RequestHandler";
import { OverlayContext } from "./_app";

export default function Anmeldung() {
  const [errMsgObject, setErrMsgObject] = useState({
    surname: "Das Feld muss befüllt sein",
    lastName: "Das Feld muss befüllt sein",
    phoneNumber: "Das Feld muss befüllt sein",
    mail: "Das Feld muss befüllt sein",
    postCode: "Das Feld muss befüllt sein",
    city: "Das Feld muss befüllt sein",
    street: "Das Feld muss befüllt sein",
    houseNumber: "Das Feld muss befüllt sein",
    birthdate: "Das Feld muss befüllt sein",
  });
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const { setNotificationBar } = useContext(OverlayContext);

  const router = useRouter();

  useEffect(() => {
    setIsFormValid(
      !Object.values(data).includes(null) &&
        !Object.values(errMsgObject).filter((el) => !!el).length > 0
    );
  }, [errMsgObject, data]);

  const handleBlur = (regex, property, errMessage) => {
    return (e) => {
      if (!e.target.value.match(regex)) {
        let tempObj = { ...errMsgObject };
        tempObj[property] = errMessage;
        setErrMsgObject(tempObj);
      } else {
        let tempObj = { ...errMsgObject };
        tempObj[property] = null;
        setErrMsgObject(tempObj);

        let dataObj = { ...data };
        dataObj[property] = e.target.value;
        setData(dataObj);
      }
    };
  };

  return (
    <div>
      <Head>
        <title>Anmeldung</title>
        <meta
          name="description"
          content="Your Appointment for a corona test made here"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col w-full items-center">
        {/* Main Bubble */}
        <div className="h-[75vh] xl:w-2/5 md:w-4/5 w-full mt-7 bg-white border-20 rounded-3xl flex flex-col gap-10 p-10 overflow-auto">
          <div className="w-full flex justify-center">
            <CustomTitle>Anmeldung</CustomTitle>
          </div>
          <div className="flex flex-auto gap-8 flex-col md:flex-row">
            <CustomInputfield
              placeholder="Vorname"
              icon={<User size={32} />}
              onChange={handleBlur(
                /^([^0-9]+)$/,
                "surname",
                "Ungültiger Vorname."
              )}
              errorMsg={visible && errMsgObject.surname}
            />
            <CustomInputfield
              placeholder="Nachname"
              icon={<User size={32} />}
              onChange={handleBlur(
                /^([^0-9]+)$/,
                "lastName",
                "Ungültiger Nachname."
              )}
              errorMsg={visible && errMsgObject.lastName}
            />
          </div>
          <div className="flex flex-auto">
            <CustomInputfield
              className="flex-auto"
              placeholder="Handynummer"
              icon={<DeviceMobile size={32} />}
              onChange={handleBlur(
                /^(^\+49)|(^0[1-9][0-9]+)$/,
                "phoneNumber",
                "Ungültige Telefonnummer."
              )}
              errorMsg={visible && errMsgObject.phoneNumber}
            />
          </div>
          <div className="flex flex-auto">
            <CustomInputfield
              placeholder="E-Mail-Adresse"
              className="flex-auto "
              icon={<Mail size={32} />}
              onChange={handleBlur(
                /(.+)@(.+){1,}\.(.+){2,}/,
                "mail",
                "Ungültige E-Mail-Adresse."
              )}
              errorMsg={visible && errMsgObject.mail}
            />
          </div>
          <div className="flex flex-auto gap-8 flex-col md:flex-row">
            <CustomInputfield
              placeholder="Postleitzahl"
              icon={<ListNumbers size={32} />}
              onChange={handleBlur(
                /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/,
                "postCode",
                "Ungültige Postleitzahl."
              )}
              errorMsg={visible && errMsgObject.postCode}
            />
            <CustomInputfield
              placeholder="Stadt"
              icon={<BuildingSkyscraper size={32} />}
              onChange={handleBlur(/^([^0-9]+)$/, "city", "Ungültige Stadt.")}
              errorMsg={visible && errMsgObject.city}
            />
          </div>
          <div className="flex flex-auto gap-8 flex-col md:flex-row">
            <CustomInputfield
              placeholder="Straße"
              icon={<Home size={32} />}
              onChange={handleBlur(
                /^([^0-9]+)$/,
                "street",
                "Ungültige Straße."
              )}
              errorMsg={visible && errMsgObject.street}
            />
            <CustomInputfield
              placeholder="Hausnummer"
              icon={<Home2 size={32} />}
              onChange={handleBlur(
                /^(\d+)$/,
                "houseNumber",
                "Ungültige Hausnummer."
              )}
              errorMsg={visible && errMsgObject.houseNumber}
            />
          </div>
          <CustomInputfield
            className="flex-auto"
            placeholder="Geburtsdatum"
            icon={<Gift size={32} />}
            type="date"
            onChange={(e) => {
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
            errorMsg={visible && errMsgObject.birthdate}
          />
        </div>

        {/* Triangle */}
        <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[40px] border-t-white z-10" />

        {/* Button After the Bubble */}
        <div className="flex w-1/4">
          <CustomButton
            className="mt-4 text-4xl border-mango border-4 min-w-fit h-16 flex justify-center items-center mr-4"
            onClick={() => {
              router.push("./");
            }}
          >
            <ArrowBack size={32} />
          </CustomButton>
          <CustomButton
            className="mt-4 w-full text-4xl border-mango border-4 min-w-fit h-16 flex justify-center"
            onClick={() => {
              if (isFormValid) {
                setIsLoading(true);
                requestHandler
                  .postAnmeldung(data)
                  .then(() => {
                    router.push("./");
                    setNotificationBar({
                      content:
                        "Deine Anmeldung wurde erfrolgreich übermittelt.",
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    setNotificationBar({
                      content: `Fehler! Fehlernachricht: "${err}"`,
                      error: true,
                    });
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              } else {
                setVisible(true);
              }
            }}
            isLoading={isLoading}
            disabled={!isFormValid && visible}
          >
            Buchen!
          </CustomButton>
        </div>
      </main>
    </div>
  );
}
