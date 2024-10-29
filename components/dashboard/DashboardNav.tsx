"use client";

import { cn } from "@/lib/utils";
import { links } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const DashboardNav = () => {
  const pathname = usePathname();
  return (
    <>
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold text-xl md:text-2xl">
          Foot<span className="text-primary">Flair</span>
        </span>
      </Link>
      {links.map((link) => (
        <Button
          asChild
          size="sm"
          variant="ghost"
          key={link.href}
          className={cn(
            "transition-colors hover:text-primary",
            link.href === pathname
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          )}
        >
          <Link href={link.href}>{link.name}</Link>
        </Button>
      ))}
    </>
  );
};

export default DashboardNav;
