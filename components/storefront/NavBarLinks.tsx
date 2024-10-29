"use client";
import { cn } from "@/lib/utils";
import { navbarLinks } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBarLinks = () => {
  const location = usePathname();
  return (
    <div className="hidden md:flex items-center justify-center gap-x-2 ml-5">
      {navbarLinks.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            location === link.href ? "bg-muted" : "hover:bg-muted/75",
            "group p-2 font-medium rounded-md"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBarLinks;
