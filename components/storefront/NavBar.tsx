import Link from "next/link";
import NavBarLinks from "./NavBarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import UserDropDown from "./UserDropDown";
import { Button } from "../ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/lib/radis";
import { Cart } from "@/lib/interfaces";
import { ModeToggle } from "../mode-toggle";
import { unstable_noStore as noStore } from "next/cache";

const NavBar = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl md:text-2xl">
              Foot<span className="text-primary">Flair</span>
            </span>
          </Link>
          <NavBarLinks />
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <ModeToggle />

              <Link href="/bag" className="relative">
                <ShoppingBag className="h-6 w-6 text-foreground/60 transition-colors hover:text-foreground/80" />
                {total > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {total}
                  </span>
                )}
                <span className="sr-only">Shopping bag</span>
              </Link>
              {user.email === "alifouanne7@gmail.com" && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}
              <UserDropDown
                email={user.email ?? ""}
                name={user.given_name ?? ""}
                userImage={
                  user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                }
              />
            </>
          ) : (
            <div className="hidden md:flex md:items-center md:gap-2">
              <ModeToggle />
              <Button asChild variant="ghost" size="sm">
                <LoginLink>Sign in</LoginLink>
              </Button>
              <Button asChild variant="default" size="sm">
                <RegisterLink>Create Account</RegisterLink>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
