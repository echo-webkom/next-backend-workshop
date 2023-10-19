"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: string;
};

export function NavLink({ href, children }: NavLinkProps) {
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
