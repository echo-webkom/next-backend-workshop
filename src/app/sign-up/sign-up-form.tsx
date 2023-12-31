"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    /**
     * Prevent the default form submission behavior
     *
     * Since the form is submitted via JavaScript, we
     * don't want the browser to submit the form
     * automatically.
     */
    e.preventDefault();

    // Don't submit if passwords don't match
    if (password !== passwordRepeat) {
      return;
    }

    /**
     * Make a POST request to the server to sign up the user.
     * If username and password are correct, the server will
     * set a session cookie in the browser.
     */
    const resp = await fetch("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    // Handle successful sign up
    if (resp.status === 200) {
      // Rerun the RSC to redirect the user to the home page
      router.refresh();
      return;
    }

    setError(await resp.text());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}

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
      <div className="flex flex-col gap-1">
        <label htmlFor="password-repeat">Repeat password</label>
        <input
          className="border p-1 rounded-md"
          type="password"
          id="password-repeat"
          name="passoword-repeat"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
        {password !== passwordRepeat && (
          <p className="text-red-500">Passwords do not match</p>
        )}
      </div>

      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign up
        </button>
      </div>
    </form>
  );
}
