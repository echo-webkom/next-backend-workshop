import { cookies } from "next/headers";
import { NavLink } from "./nav-link";
import { COOKIE_KEY } from "@/constants";
import { SignOutButton } from "./sign-out-button";

const routes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Sign in",
    path: "/sign-in",
  },
  {
    label: "Sign up",
    path: "/sign-up",
  },
  // Also possible to use a GET request to sign out:
  //   {
  //     label: "Sign out",
  //     path: "/auth/sign-out",
  //   },
];

export function SiteHeader() {
  return (
    <header className="flex items-center p-4">
      {routes.map((route) => (
        <NavLink href={route.path} key={route.path}>
          {route.label}
        </NavLink>
      ))}
      <SignOutButton />
    </header>
  );
}
