"use client";
import React, { useActionState } from "react";
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import { createProduct } from "@/lib/actions";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";
import { VariantProps } from "class-variance-authority";

interface buttonVariant {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}
export const ProductSubmitButtons = ({ text, variant }: buttonVariant) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
};

export const ShoppingCartButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full">
          <Loader2 className="size-5 mr-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button size="lg" className="w-full" type="submit">
          <ShoppingBag className="size-5 mr-4" /> Add to Cart
        </Button>
      )}
    </>
  );
};

export const DeleteItem = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="destructive" disabled>
          Removing...
        </Button>
      ) : (
        <Button variant="destructive" type="submit">
          Delete
        </Button>
      )}
    </>
  );
};

export const CheckoutButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button size="lg" className="w-full sm:w-auto">
          <Loader2 className="mr-2 size-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button size="lg" className="w-full sm:w-auto" type="submit">
          Proceed to Checkout
        </Button>
      )}
    </>
  );
};
