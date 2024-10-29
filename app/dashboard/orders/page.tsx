import React from "react";
import { Package, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function OrdersPage() {
  noStore();
  const data = await getData();

  return (
    <Card className="w-full max-w-[1000px] mx-auto ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Orders</CardTitle>
        <CardDescription>Recent orders from your store</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 ">
        <ScrollArea className="w-full">
          <div className="overflow-x-auto">
            <Table className="min-w-[650px] ">
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={item.User?.profileImage}
                            alt={item.User?.firstName}
                          />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{item.User?.firstName}</p>
                          <p className="text-sm text-muted-foreground hidden md:block">
                            {item.User?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        <Package className="mr-1 h-3 w-3" />
                        Order
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status === "complete"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                        variant={
                          item.status === "complete"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${(item.amount / 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// import React from "react";
// import { Package, User } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import prisma from "@/lib/db";

// async function getData() {
//   const data = await prisma.order.findMany({
//     select: {
//       amount: true,
//       createdAt: true,
//       status: true,
//       id: true,
//       User: {
//         select: {
//           firstName: true,
//           email: true,
//           profileImage: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return data;
// }

// export default async function OrdersPage() {
//   const data = await getData();

//   return (
//     <Card className="w-full max-w-[1000px] mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Orders</CardTitle>
//         <CardDescription>Recent orders from your store</CardDescription>
//       </CardHeader>
//       <CardContent className="px-2 sm:px-4">
//         <ScrollArea className="w-full">
//           <div className="overflow-x-auto">
//             <Table className="min-w-[650px] ">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {data.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <Avatar>
//                           <AvatarImage
//                             src={item.User?.profileImage}
//                             alt={item.User?.firstName}
//                           />
//                           <AvatarFallback>
//                             <User className="h-4 w-4" />
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">{item.User?.firstName}</p>
//                           <p className="text-sm text-muted-foreground hidden md:block">
//                             {item.User?.email}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="secondary">
//                         <Package className="mr-1 h-3 w-3" />
//                         Order
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         className={
//                           item.status === "complete"
//                             ? "bg-green-500"
//                             : "bg-red-500"
//                         }
//                         variant={
//                           item.status === "complete"
//                             ? "secondary"
//                             : "destructive"
//                         }
//                       >
//                         {item.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {new Date(item.createdAt).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </TableCell>
//                     <TableCell className="text-right font-medium">
//                       ${(item.amount / 100).toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// }
