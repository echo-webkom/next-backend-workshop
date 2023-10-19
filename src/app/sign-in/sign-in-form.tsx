"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignInForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

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
