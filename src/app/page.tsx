import { Container } from "@/components/container";
import { db } from "@/db/drizzle";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  const posts = await db.query.posts.findMany();

  return (
    <Container>
      <h1 className="text-3xl font-bold">Hello world</h1>

      <div className="mb-4">
        {session ? (
          <p>Du er logget inn som: {session.username}</p>
        ) : (
          <p>Du er ikke logget inn...</p>
        )}
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </Container>
  );
}
