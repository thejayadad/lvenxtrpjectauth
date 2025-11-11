import {auth} from "@/lib/auth"
import { headers } from "next/headers";
import { SignInWithGoogleButton } from "./_components/google-btn";
import { SignOutButton } from "./_components/google-btn";

export default async function Home() {
  const session = await auth.api.getSession({headers: await headers()})
  const user = session?.user;
  return (
    <div className="p-6 text-neutral-700">
     {!user ? (
      <>
        <SignInWithGoogleButton />
      </>
     ): (
      <>
      <p>Logged in as {user.email}</p>
        <SignOutButton />
      </>
     )}
    </div>
  );
}
