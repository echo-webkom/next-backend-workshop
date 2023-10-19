"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: string;
};

/**
 * NavLink act as wrapper to Next.js Link component.
 * It will be undderlined when user is on the current page.
 */
export function NavLink({ href, children }: NavLinkProps) {
  /**
   * Get the current pathname of the page.
   *
   * Example: https://example.com -> "/"
   * Example: https://example.com/about -> "/about"
   * Example: https://example.com/about?foo=bar -> "/about"
   */
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={`text-blue-500 px-2 hover:underline text-lg ${
        isActive ? "underline" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
