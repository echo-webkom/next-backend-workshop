"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignInForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    /**
     * Prevent the default form submission behavior
     *
     * Since the form is submitted via JavaScript, we
     * don't want the browser to submit the form
     * automatically.
     */
    e.preventDefault();

    /**
     * Make a POST request to the server to sign in the user.
     * If username and password are correct, the server will
     * set a session cookie in the browser.
     */
    await fetch("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    // Rerun the RSC to redirect the user to the home page
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="username">Username</label>
        <input
          className="border p-1 rounded-md"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          className="border p-1 rounded-md"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign in
        </button>
      </div>
    </form>
  );
}
