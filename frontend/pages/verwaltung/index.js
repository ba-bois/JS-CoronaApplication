import { getSession } from "next-auth/react";
import Head from "next/head";
import VerwaltungsTemplate from "../../components/VerwaltungsTemplate";

export default function VerwaltungIndex() {
  return (
    <>
      <Head>
        <title>Statistiken</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VerwaltungsTemplate>Hier wären Statistiken.</VerwaltungsTemplate>
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
