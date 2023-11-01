import { Container } from "@/components/container";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: Props) {
  /**
   * Get the first post, where the id is equal to the id in the url.
   */
  const post = await db.query.posts.findFirst({
    where: (post) => eq(post.id, params.id),
    with: {
      author: true,
    },
  });

  /**
   * If no post with the given id is found, we return a 404 page.
   */
  if (!post) {
    return notFound();
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <p>Created by: {post.author?.username ?? "An anonymous user"}</p>
      <p className="text-gray-600">{post.body}</p>
    </Container>
  );
}
