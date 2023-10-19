"use client";

import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  /**
   * Make a GET request to the server to sign out the user.
   * The server will clear the session cookie in the browser.
   */
  const handleSignout = async () => {
    await fetch("/auth/sign-out", {
      method: "GET",
    });

    // Rerun the RSC to redirect the user to the home page
    router.refresh();
  };

  return (
    <button
      onClick={handleSignout}
      className="text-blue-500 px-2 hover:underline text-lg"
    >
      Sign out
    </button>
  );
}
