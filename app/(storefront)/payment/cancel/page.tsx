/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkOut } from "@/lib/actions";

export default function CancelPage() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center px-4 ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-6">
          <div className="w-full flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <AlertCircle
                className="h-10 w-10 text-red-600"
                aria-hidden="true"
              />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We're sorry, but something went wrong with your payment. Don't
            worry, you have not been charged.
          </p>
          <p className="text-sm text-muted-foreground">
            If this issue persists, please contact our support team.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <form action={checkOut} className="w-full">
            <Button variant="default" className="w-full" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try Payment Again
            </Button>
          </form>
          <div className="flex gap-4 w-full">
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Homepage
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
