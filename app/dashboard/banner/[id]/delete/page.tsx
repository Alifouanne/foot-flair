import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { deleteBanner } from "@/lib/actions";

interface BannerDeletePageProps {
  params: { id: string };
}

export default function BannerDeletePage({ params }: BannerDeletePageProps) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Delete Banner
          </CardTitle>
          <CardDescription className="text-center">
            Are you certain you want to proceed with deleting this banner?
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Please note that this action is irreversible. Proceeding will
            permanently delete this banner and erase all associated data from
            our servers.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/dashboard/banner">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <form action={deleteBanner} className="w-full sm:w-auto">
            <Input type="hidden" value={params.id} name="id" />
            <Button type="submit" variant="destructive" className="w-full">
              Yes, Delete Banner
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
