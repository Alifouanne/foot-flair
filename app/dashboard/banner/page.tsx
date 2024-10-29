import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, MoreHorizontal, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function BannerPage() {
  noStore();
  const data = await getData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Banners</h1>
        {data.length === 0 ? (
          ""
        ) : (
          <Button
            asChild
            className="transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <Link
              href="/dashboard/banner/create"
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Banner</span>
            </Link>
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Banners</CardTitle>
          <CardDescription>
            View and manage your website banners
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                No banners added yet
              </h2>
              <p className="text-muted-foreground mb-4">
                Add your first banner to showcase on your website.
              </p>
              <Button asChild>
                <Link
                  href="/dashboard/banner/create"
                  className="flex items-center gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Your First Banner</span>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow
                      key={item.id}
                      className="transition-colors hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="relative w-24 h-24 overflow-hidden rounded-md transition-transform duration-300 ease-in-out hover:scale-105">
                          <Image
                            alt={`Banner image for ${item.name}`}
                            src={item.image}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/banner/${item.id}/delete`}
                                className="text-red-600 hover:text-red-700 focus:text-red-600 focus:bg-red-50 transition-colors duration-200"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { PlusCircle, MoreHorizontal, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import prisma from "@/lib/db";

// async function getData() {
//   const data = await prisma.banner.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return data;
// }

// export default async function BannerPage() {
//   const data = await getData();

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Banners</h1>
//         <Button
//           asChild
//           className="transition-transform duration-200 ease-in-out hover:scale-105"
//         >
//           <Link
//             href="/dashboard/banner/create"
//             className="flex items-center gap-2"
//           >
//             <PlusCircle className="h-4 w-4" />
//             <span>Add Banner</span>
//           </Link>
//         </Button>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Manage Banners</CardTitle>
//           <CardDescription>
//             View and manage your website banners
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <Table className="w-full">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Image</TableHead>
//                   <TableHead>Title</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {data.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell>
//                       <div className="relative w-24 h-24 overflow-hidden rounded-md  ">
//                         <Image
//                           alt={`Banner image for ${item.name}`}
//                           src={item.image}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     </TableCell>
//                     <TableCell className="font-medium">{item.name}</TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem asChild>
//                             <Link
//                               href={`/dashboard/banner/${item.id}/delete`}
//                               className="text-red-600 hover:text-red-700 focus:text-red-600 focus:bg-red-50 transition-colors duration-200"
//                             >
//                               <Trash2 className="mr-2 h-4 w-4" />
//                               <span>Delete</span>
//                             </Link>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
