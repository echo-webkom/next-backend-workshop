import { Container } from "@/components/container";
import { db } from "@/db/drizzle";
import Link from "next/link";

export default async function Posts() {
  const posts = await db.query.posts.findMany({
    with: {
      author: true,
    },
  });

  return (
    <Container>
      <h1 className="text-3xl font-bold">Posts</h1>

      <Link className="text-blue-500 hover:underline" href="/posts/create">
        Create a new post
      </Link>

      {posts.length > 0 ? (
        <ul className="divide-y">
          {posts.map((post) => (
            <li key={post.id}>
              <div className="py-2">
                <h2 className="text-lg font-medium">{post.title}</h2>
                <p>
                  Created by: {post.author?.username ?? "An anonymous user"}
                </p>
                <Link
                  className="text-blue-500 hover:underline"
                  href={`/posts/${post.id}`}
                >
                  Se hele innlegget
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found...</p>
      )}
    </Container>
  );
}
