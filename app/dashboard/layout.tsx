// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import DashboardNav from "../../components/dashboard/DashboardNav";
// import { ReactNode } from "react";
// import { Button } from "@/components/ui/button";
// import { MenuIcon } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { redirect } from "next/navigation";
// import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ModeToggle } from "@/components/mode-toggle";
// const DashboardLayout = async ({ children }: { children: ReactNode }) => {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   if (!user || user.email !== "alifouanne7@gmail.com") {
//     return redirect("/");
//   }
//   return (
//     <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
//         <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
//           <DashboardNav />
//         </nav>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button className="shrink-0 md:hidden" variant="outline">
//               <MenuIcon className="size-5" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left">
//             <SheetHeader className="mb-5">
//               <SheetTitle>Foot Flair</SheetTitle>
//               <SheetDescription>
//                 Discover stylish and comfortable footwear at Foot Flair. Your
//                 ultimate destination for high-quality shoes.
//               </SheetDescription>
//             </SheetHeader>
//             <div className="grid gap-6 text-lg font-medium">
//               <DashboardNav />
//             </div>
//           </SheetContent>
//         </Sheet>
//         <div className="flex m-5 items-center">
//           <ModeToggle />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Avatar>
//                 <AvatarImage
//                   src={user.picture || "https://ui-avatars.com/api/?name=AV"}
//                   alt="user"
//                 />
//                 <AvatarFallback>AV</AvatarFallback>
//               </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem asChild>
//                 <LogoutLink>Logout</LogoutLink>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>
//       <main className="my-5">{children}</main>
//     </div>
//   );
// };

// export default DashboardLayout;

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashboardNav from "../../components/dashboard/DashboardNav";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { unstable_noStore as noStore } from "next/cache";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "alifouanne7@gmail.com") {
    return redirect("/");
  }
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background">
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <DashboardNav />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink-0 md:hidden" variant="outline">
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader className="mb-5">
              <SheetTitle>Foot Flair</SheetTitle>
              <SheetDescription>
                Discover stylish and comfortable footwear at Foot Flair. Your
                ultimate destination for high-quality shoes.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 text-lg font-medium">
              <DashboardNav />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={
                    user.picture ||
                    `https://ui-avatars.com/api/?name=${user.given_name}`
                  }
                  alt={user.given_name || "User avatar"}
                />
                <AvatarFallback>{user.given_name?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutLink className="w-full cursor-pointer">
                  Logout
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="my-5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
