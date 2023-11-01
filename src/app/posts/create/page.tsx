import { Container } from "@/components/container";
import { CreatePostForm } from "./create-post-form";

export default async function CreatePost() {
  return (
    <Container>
      <h1 className="text-3xl font-bold">Create post</h1>

      <CreatePostForm />
    </Container>
  );
}
