import React from "react";
import { DollarSign, ShoppingBag, PartyPopper, User2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Chart from "@/components/dashboard/Chart";
import RecentSales from "@/components/dashboard/RecentSales";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const [users, products, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
        createdAt: true,
      },
    }),
  ]);
  return { users, products, orders };
}

async function getChartData() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100,
  }));
}

export default async function DashboardPage() {
  noStore();
  const { orders, products, users } = await getData();
  const totalAmount = orders.reduce(
    (acc, currentValue) => acc + currentValue.amount,
    0
  );
  const chartData = await getChartData();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <DashboardCard
          title="Total Revenue"
          Icon={DollarSign}
          content={`$${new Intl.NumberFormat("en-US").format(
            totalAmount / 100
          )}`}
          description={`${orders.length} total charges`}
          iconColor="text-green-500"
        />
        <DashboardCard
          title="Total Sales"
          Icon={ShoppingBag}
          content={orders.length.toString()}
          description="Total sales on Foot Flair"
          iconColor="text-blue-500"
        />
        <DashboardCard
          title="Total Products"
          Icon={PartyPopper}
          content={products.length}
          description="Total Products created"
          iconColor="text-indigo-500"
        />
        <DashboardCard
          title="Total Users"
          Icon={User2}
          content={users.length}
          description="Total Users Signed Up"
          iconColor="text-orange-500"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Revenue trend for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            {chartData.length > 0 ? (
              <Chart data={chartData} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Skeleton className="h-[350px] w-[100%]" />
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// import Chart from "@/components/dashboard/Chart";
// import DashboardCard from "@/components/dashboard/DashboardCard";
// import RecentSales from "@/components/dashboard/RecentSales";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import prisma from "@/lib/db";
// import { DollarSign, ShoppingBag, PartyPopper, User2 } from "lucide-react";
// import React from "react";

// const getData = async () => {
//   const [users, products, orders] = await Promise.all([
//     prisma.user.findMany({
//       select: {
//         id: true,
//       },
//     }),
//     prisma.product.findMany({
//       select: {
//         id: true,
//       },
//     }),
//     prisma.order.findMany({
//       select: {
//         amount: true,
//         createdAt: true,
//       },
//     }),
//   ]);
//   return { users, products, orders };
// };
// const chartData = async () => {
//   const now = new Date();
//   const sevenDays = new Date();
//   sevenDays.setDate(now.getDate() - 7);
//   const data = await prisma.order.findMany({
//     where: {
//       createdAt: {
//         gte: sevenDays,
//       },
//     },

//     select: {
//       amount: true,
//       createdAt: true,
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   });
//   const result = data.map((item) => ({
//     date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
//     revenue: item.amount / 100,
//   }));
//   return result;
// };

// const DashboardPage = async () => {
//   const { orders, products, users } = await getData();
//   const totalAmount = orders.reduce((acc, curentValue) => {
//     return acc + curentValue.amount;
//   }, 0);
//   const data = await chartData();
//   return (
//     <>
//       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//         <DashboardCard
//           title="Total Revenue"
//           Icon={DollarSign}
//           con1={`$ ${new Intl.NumberFormat("en-US").format(totalAmount / 100)}`}
//           con2="Based on 100 charges"
//           iconColor="text-green-500"
//         />
//         <DashboardCard
//           title="Total Sales"
//           Icon={ShoppingBag}
//           con1={`+ ${orders.length}`}
//           con2="Total sales on Foot Flair"
//           iconColor="text-blue-500"
//         />
//         <DashboardCard
//           title="Total Products"
//           Icon={PartyPopper}
//           con1={products.length}
//           con2="Total Products created"
//           iconColor="text-indigo-500"
//         />
//         <DashboardCard
//           title="Total Users"
//           Icon={User2}
//           con1={users.length}
//           con2="Total Users Signed Up"
//           iconColor="text-orange-500"
//         />
//       </div>
//       <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
//         <Card className="xl:col-span-2">
//           <CardHeader>
//             <CardTitle>Transactions</CardTitle>
//             <CardDescription>
//               Recent transactions from last 7 days
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Chart data={data} />
//           </CardContent>
//         </Card>
//         <RecentSales />
//       </div>
//     </>
//   );
// };

// export default DashboardPage;
