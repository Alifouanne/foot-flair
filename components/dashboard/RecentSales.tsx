import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      createdAt: true,
      User: {
        select: {
          firstName: true,
          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
}

export default async function RecentSales() {
  noStore();
  const data = await getData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          You made {data.length} sales this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[300px] overflow-y-auto ">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 rounded-md p-2 sm:hover:bg-accent mb-2"
            >
              <Avatar className="h-9 w-9 flex-shrink-0">
                <AvatarImage
                  src={item.User?.profileImage}
                  alt={`${item.User?.firstName}'s avatar`}
                />
                <AvatarFallback>
                  {item.User?.firstName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium leading-none truncate"
                  title={item.User?.firstName}
                >
                  {item.User?.firstName}
                </p>
                <p
                  className="text-xs text-muted-foreground truncate"
                  title={item.User?.email}
                >
                  {item.User?.email}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium">
                  +${(item.amount / 100).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
