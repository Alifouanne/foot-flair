/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  CheckoutButton,
  DeleteItem,
} from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  checkOut,
  decreaseItem,
  deleteItem,
  increaseItem,
} from "@/lib/actions";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/radis";
import { unstable_noStore as noStore } from "next/cache";

// The noStore function is called to prevent caching.
// The current user's session is retrieved using getKindeServerSession.
// If the user is not authenticated, the user is redirected to the homepage.
// The user's cart is fetched from Redis using the user's ID.
// The total price and item count of the cart are calculated by iterating over the cart items.

export default async function BagPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const cart: Cart | null = await redis.get(`cart-${user.id}`);
  let total = 0;
  let itemCount = 0;
  cart?.items.forEach((item) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 min-h-[calc(100vh-200px)]">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        Your Shopping Bag
      </h1>
      {!cart?.items.length ? (
        <EmptyBagCard />
      ) : (
        <FilledBagCard cart={cart} total={total} itemCount={itemCount} />
      )}
    </div>
  );
}

function EmptyBagCard() {
  return (
    <Card className="flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-gray-50">
      <CardHeader>
        <div className="flex size-20 sm:size-24 items-center justify-center rounded-full bg-primary/10 mb-6">
          <ShoppingBag
            className="size-10 sm:size-12 text-primary"
            aria-hidden="true"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl sm:text-2xl mb-4">
          Your bag is empty
        </CardTitle>
        <p className="mb-8 text-center text-gray-600 max-w-sm mx-auto">
          Looks like you haven't added any items to your bag yet. Start shopping
          to fill it up!
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="px-6 sm:px-8">
          <Link href="/">Explore Products</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function FilledBagCard({
  cart,
  total,
  itemCount,
}: {
  cart: Cart;
  total: number;
  itemCount: number;
}) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gray-50 border-b rounded-lg">
        <CardTitle className="flex justify-between items-center text-xl sm:text-2xl">
          Your Shopping Bag
          <Badge
            variant="secondary"
            className="text-base sm:text-lg px-2 sm:px-3 py-1"
          >
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <ScrollArea className="h-[50vh] pr-2 sm:pr-4">
          {cart.items.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <Separator className="my-4 sm:my-6" />}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-full sm:w-24 h-40 sm:h-24 relative">
                  <Image
                    src={item.imageString}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-base sm:text-lg mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    ${item.price.toFixed(2)} each
                  </p>
                  <div className="flex items-center space-x-3">
                    <QuantityButton
                      action={decreaseItem}
                      productId={item.id}
                      icon={Minus}
                      label={`Decrease quantity of ${item.name}`}
                    />
                    <span className="font-medium text-lg w-8 text-center">
                      {item.quantity}
                    </span>
                    <QuantityButton
                      action={increaseItem}
                      productId={item.id}
                      icon={Plus}
                      label={`Increase quantity of ${item.name}`}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center w-full sm:w-auto">
                  <p className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <form action={deleteItem}>
                    <input type="hidden" name="productId" value={item.id} />
                    <Button
                      variant="ghost"
                      size="sm"
                      type="submit"
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </form>
                </div>
              </div>
            </React.Fragment>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 bg-gray-50 border-t p-4 sm:p-6 rounded-lg">
        <div>
          <p className="text-gray-600 mb-1">Subtotal</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            ${new Intl.NumberFormat("en-US").format(total)}
          </p>
        </div>
        <form action={checkOut} className="w-full sm:w-auto">
          <CheckoutButton />
        </form>
      </CardFooter>
    </Card>
  );
}

function QuantityButton({
  action,
  productId,
  icon: Icon,
  label,
}: {
  action: any;
  productId: string;
  icon: any;
  label: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="productId" value={productId} />
      <Button
        variant="outline"
        size="icon"
        type="submit"
        aria-label={label}
        className="h-8 w-8 rounded-full"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
