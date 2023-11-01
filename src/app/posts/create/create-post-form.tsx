"use client";

export function CreatePostForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    const resp = await fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
    });

    if (resp.ok) {
      alert("Post created!");
    } else {
      alert("Something went wrong...");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="px-2 py-1 border rounded-md"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          className="px-2 py-1 border rounded-md"
        />
      </div>

      <button
        className="px-2 py-1 rounded-md bg-blue-600 text-white"
        type="submit"
      >
        Send inn
      </button>
    </form>
  );
}
