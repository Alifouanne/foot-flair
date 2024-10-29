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
import { deleteProduct } from "@/lib/actions";

interface DeleteProductProps {
  params: { id: string };
}

export default function DeleteProduct({ params }: DeleteProductProps) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Delete Product
          </CardTitle>
          <CardDescription className="text-center">
            Are you certain you want to proceed with deleting this product?
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Please note that this action is irreversible. Proceeding will
            permanently delete this product and erase all associated data from
            our servers.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/dashboard/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <form action={deleteProduct} className="w-full sm:w-auto">
            <Input type="hidden" value={params.id} name="id" />
            <Button type="submit" variant="destructive" className="w-full">
              Yes, Delete Product
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
