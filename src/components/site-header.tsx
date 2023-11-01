import { NavLink } from "./nav-link";
import { SignOutButton } from "./sign-out-button";

const routes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Posts",
    path: "/posts",
  },
  {
    label: "Protected page",
    path: "/protected",
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
