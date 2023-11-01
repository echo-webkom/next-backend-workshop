import { Container } from "@/components/container";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getSession();

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold">Protected page</h1>

      <p>
        This page is protected. You are signed in as {session.username},
        therefore you can see this page.
      </p>
    </Container>
  );
}
