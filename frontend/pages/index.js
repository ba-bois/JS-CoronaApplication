import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Header, Textbox } from "../components";
import Link from "next/link";
import requestHandler from "../functions/RequestHandler";

export default function Home() {
    const [textboxes, setTextboxes] = useState([]);

    useEffect(() => {
        requestHandler.getNeuigkeiten().then(neuigkeiten => {
            setTextboxes(neuigkeiten);
        });
    }, []);

    return (
        <>
            <Head>
                <title>Startseite</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <main className="min-h-screen">
                <Header>Corona Testzentrum</Header>
                <div className="w-1/2 mx-auto flex flex-col">
                    {textboxes?.map((el, i) => (
                        <Textbox key={`${el.title}_${i}`} title={el.title} content={el.content} picture={el.picture} />
                    ))}
                </div>
            </main>

            <footer>
                <div className="w-full h-36 bg-white rounded-t-[50px] px-11 flex flex-col justify-around align-middle">
                    <Link href="/verwaltung/login">
                        <a className="flex flex-col items-center justify-center">
                            <strong>Link zur Verwaltungsseite</strong>
                            (Nur für Sie, Herr Strauß!)
                        </a>
                    </Link>

                    <div className=" flex items-center justify-evenly">
                        <strong className="text-lg">Made by:</strong>
                        <a href="https://github.com/gwentplayer2">Alexander Lehmpfuhl</a>
                        <a href="https://github.com/Arne26">Arne Bonn</a>
                        <a href="https://github.com/Ceddini">Cedric Schmitt</a>
                        <a href="https://github.com/MarvinGoinar">Marvin Goinar</a>
                        <a href="https://github.com/TobiasHeise">Tobias Heise</a>
                        <a href="https://github.com/J-S-Bach">Sebastian Kirner</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
