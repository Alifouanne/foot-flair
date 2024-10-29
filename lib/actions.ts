"use server";
import { Stripe } from "stripe";

import { parseWithZod } from "@conform-to/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./db";
import { Cart } from "./interfaces";
import { redis } from "./radis";
import { stripe } from "./stripe";
import { bannerSchema, productSchema } from "./zodSchemas";
export async function createProduct(prevSatae: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "alifouanne7@gmail.com") {
    return redirect("/");
  }
  const submission = parseWithZod(formData, {
    schema: productSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const imagesURL = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );
  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: imagesURL,
      category: submission.value.category,
      isFetured: submission.value.isFeatured === true ? true : false,
    },
  });
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function editProduct(prevSatae: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "alifouanne7@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const imagesURL = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );
  const id = formData.get("id") as string;
  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      price: submission.value.price,
      isFetured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: imagesURL,
    },
  });
  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "alifouanne7@gmail.com") {
    return redirect("/");
  }

  const id = formData.get("id") as string;
  await prisma.product.delete({
    where: {
      id: id,
    },
  });
  redirect("/dashboard/products");
}

export async function createBanner(prevSatae: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "alifouanne7@gmail.com") {
    return redirect("/");
  }
  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.banner.create({
    data: {
      name: submission.value.name,
      image: submission.value.image,
    },
  });
  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "alifouanne7@gmail.com") {
    return redirect("/");
  }
  const id = formData.get("id") as string;
  await prisma.banner.delete({
    where: {
      id: id,
    },
  });
  redirect("/dashboard/banner");
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product found with this id");
  }
  let myCart = {} as Cart;
  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          name: selectedProduct.name,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;
    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    });
    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageString: selectedProduct.images[0],
        quantity: 1,
      });
    }
  }
  await redis.set(`cart-${user.id}`, myCart);
  revalidatePath("/", "layout");
}

export async function deleteItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const productId = formData.get("productId");
  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };
    await redis.set(`cart-${user.id}`, updateCart);
  }
  revalidatePath("/bag");
}

export async function increaseItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const productId = formData.get("productId") as string;
  let cart: Cart | null = await redis.get(`cart-${user.id}`);
  if (cart && cart.items) {
    const updatedItems = cart.items.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    const updateCart: Cart = {
      userId: user.id,
      items: updatedItems,
    };
    await redis.set(`cart-${user.id}`, updateCart);
  }
  revalidatePath("/bag");
}

export async function decreaseItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const productId = formData.get("productId") as string;
  let cart: Cart | null = await redis.get(`cart-${user.id}`);
  if (cart && cart.items) {
    const updatedItems = cart.items.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    const updateCart: Cart = {
      userId: user.id,
      items: updatedItems,
    };
    await redis.set(`cart-${user.id}`, updateCart);
  }
  revalidatePath("/bag");
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);
  const LineItems: Stripe.Checkout.SessionCreateParams.LineItem[] | undefined =
    cart?.items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          images: [item.imageString],
        },
      },
      quantity: item.quantity,
    }));
  if (cart && cart.items) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: LineItems,
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
      metadata: {
        userId: user.id,
      },
    });
    return redirect(session.url as string);
  }
}
