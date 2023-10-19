import { Container } from "@/components/container";
import { db } from "@/db/drizzle";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  // Get all posts from the database
  const posts = await db.query.posts.findMany();

  return (
    <Container>
      <h1 className="text-3xl font-bold">NextJS Backend Auth Demo</h1>

      {/* Display current session status */}
      <div className="mb-4">
        {session ? (
          <p>You are logged in as: {session.username}</p>
        ) : (
          <p>You are not logged in...</p>
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
