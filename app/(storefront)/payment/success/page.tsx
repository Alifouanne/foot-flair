import React from "react";
import Link from "next/link";
import { Check, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SuccessPage() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center px-4 ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-6">
          <div className="w-full flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <Check className="h-10 w-10 text-green-600" aria-hidden="true" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Congratulations on your purchase! Your payment was successful. We
            hope you enjoy your product.
          </p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm font-medium">Order Details:</p>
            <p className="text-sm text-muted-foreground">
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Homepage
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
