import { getSession } from "next-auth/react";
import Head from "next/head";
import { Template } from "../../components";

export default function VerwaltungIndex() {
  return (
    <>
      <Head>
        <title>Statistiken</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Template>Hier wären Statistiken.</Template>
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
