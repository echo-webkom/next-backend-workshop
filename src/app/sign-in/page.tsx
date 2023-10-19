import { Container } from "@/components/container";
import { SignInForm } from "./sign-in-form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-4">Sign in</h1>

      <SignInForm />
    </Container>
  );
}
