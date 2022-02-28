import { getSession, signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export default function VerwaltungIndex() {
  const { data: session } = useSession();

  return (
    <>
      Hallo {session.user.name}
      <button
        onClick={() =>
          signOut({
            callbackUrl: `${window.location.origin}/verwaltung/login`,
          })
        }
      >
        Sign out
      </button>
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
