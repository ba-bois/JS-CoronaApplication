import Head from "next/head";
import Inputfield from "../Components/Inputfield";
import { useState, useEffect } from "react";
import { User, DeviceMobile, Mail, Home, Home2, BuildingSkyscraper, Gift, ListNumbers } from "tabler-icons-react";
import Title from "../Components/Title";
import Button from "../Components/Button";
import requestHandler from "../functions/RequestHandler";

export default function Anmeldung() {
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
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(!Object.values(data).includes(null) && !Object.values(errMsgObject).filter((el) => !!el).length > 0);
    }, [errMsgObject, data]);

    const handleBlur = (regex, property, errMessage) => {
        console.log("im here")
        return (e) => {
            if (!e.target.value.match(regex)) {
                let tempObj = {...errMsgObject};
                tempObj[property] = errMessage;
                setErrMsgObject(tempObj);
            } else {
                let tempObj = {...errMsgObject};
                tempObj[property] = null;
                setErrMsgObject(tempObj);

                let dataObj = {...errMsgObject};
                dataObj[property] = e.target.value;
                setData({ ...data, surname: e.target.value });
            }
        };
    };

    return (
        <div>
            <Head>
                <title>Anmeldung</title>
                <meta name="description" content="Your Appointment for a corona test made here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen bg-ghostwhite flex flex-col w-full items-center selection:bg-mango text-prussianblue">
                {/* Main Bubble */}
                <div className="h-[75vh] xl:w-2/5 md:w-4/5 w-full mt-7 bg-white border-20 rounded-3xl flex flex-col gap-10 p-10 overflow-auto">
                    <div className="w-full flex justify-center">
                        <Title>Anmeldung</Title>
                    </div>
                    <div className="flex flex-auto gap-8 flex-col md:flex-row">
                        <Inputfield
                            placeholder="Vorname"
                            icon={<User size={32} />}
                            onBlur={handleBlur(/^([^0-9]+)$/, "surname", "Ungültiger Vorname.")}
                            errorMsg={errMsgObject.surname}
                        />
                        <Inputfield
                            placeholder="Nachname"
                            icon={<User size={32} />}
                            onBlur={handleBlur(/^([^0-9]+)$/, "lastName", "Ungültiger Nachname.")}
                            errorMsg={errMsgObject.lastName}
                        />
                    </div>
                    <div className="flex flex-auto">
                        <Inputfield
                            className="flex-auto"
                            placeholder="Handynummer"
                            icon={<DeviceMobile size={32} />}
                            onBlur={handleBlur(/^(^\+49)|(^0[1-9][0-9]+)$/, "phoneNumber", "Ungültige Telefonnummer.")}
                            errorMsg={errMsgObject.phoneNumber}
                        />
                    </div>
                    <div className="flex flex-auto">
                        <Inputfield
                            placeholder="E-Mail-adresse"
                            className="flex-auto "
                            icon={<Mail size={32} />}
                            onBlur={handleBlur(/(.+)@(.+){1,}\.(.+){2,}/, "mail", "Ungültige E-Mail-adresse.")}
                            errorMsg={errMsgObject.mail}
                        />
                    </div>
                    <div className="flex flex-auto gap-8 flex-col md:flex-row">
                        <Inputfield
                            placeholder="Postleitzahl"
                            icon={<ListNumbers size={32} />}
                            onBlur={handleBlur(/^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/, "postCode", "Ungültige Postleitzahl.")}
                            errorMsg={errMsgObject.postCode}
                        />
                        <Inputfield
                            placeholder="Stadt"
                            icon={<BuildingSkyscraper size={32} />}
                            onBlur={handleBlur(/^([^0-9]+)$/, "city", "Ungültige Stadt.")}
                            errorMsg={errMsgObject.city}
                        />
                    </div>
                    <div className="flex flex-auto gap-8 flex-col md:flex-row">
                        <Inputfield
                            placeholder="Straße"
                            icon={<Home size={32} />}
                            onBlur={handleBlur(/^([^0-9]+)$/, "street", "Ungültige Straße.")}
                            errorMsg={errMsgObject.street}
                        />
                        <Inputfield
                            placeholder="Hausnummer"
                            icon={<Home2 size={32} />}
                            onBlur={handleBlur(/^(\d+)$/, "houseNumber", "Ungültige Hausnummer.")}
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
                <Button
                    className="mt-4 w-1/5 text-4xl border-mango border-4 min-w-fit"
                    onClick={() => {
                        if (isFormValid) {
                            new requestHandler().postAnmeldung(data);
                        }
                    }}
                    disabled={!isFormValid}
                >
                    Buchen!
                </Button>
            </main>
        </div>
    );
}
