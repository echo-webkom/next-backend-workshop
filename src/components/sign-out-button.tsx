"use client";

import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    await fetch("/auth/sign-out", {
      method: "GET",
    });

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
