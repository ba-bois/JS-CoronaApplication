import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <pre>{JSON.stringify(session)}</pre>
        <img src={session.user.image} alt="Profilbild" />
        Signed in as {session.user.email} <br />
        {session.user.name}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: `${window.location.origin}/verwaltung`,
          })
        }
      >
        Sign in
      </button>
    </>
  );
}
