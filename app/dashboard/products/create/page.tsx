"use client";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/lib/actions";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import { UploadDropzone } from "@/lib/uploadthing";
import { useToast } from "../../../../components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { categories } from "@/utils/constants";
import { ProductSubmitButtons } from "@/components/dashboard/SubmitButtons";
const CreatePage = () => {
  const [lastResult, action] = useFormState(createProduct, undefined);
  const [form, field] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Create new product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                className="w-full"
                placeholder="Product Name"
                key={field.name.key}
                name={field.name.name}
                defaultValue={field.name.initialValue}
              />
              <p className="text-red-500">{field.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                key={field.description.key}
                name={field.description.name}
                defaultValue={field.description.initialValue}
                id="description"
                placeholder="Write your description..."
              />
              <p className="text-red-500">{field.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder="Price of product"
                key={field.price.key}
                name={field.price.name}
                defaultValue={field.price.initialValue}
              />
              <p className="text-red-500">{field.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="featured">Featured Product</Label>
              <Switch
                id="featured"
                key={field.isFeatured.key}
                name={field.isFeatured.name}
                defaultValue={field.isFeatured.initialValue}
              />
              <p className="text-red-500">{field.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={field.status.key}
                name={field.status.name}
                defaultValue={field.status.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{field.status.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={field.category.key}
                name={field.category.name}
                value={field.category.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.name} key={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{field.category.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={field.images.key}
                name={field.images.name}
                defaultValue={field.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div className="relative size-[100px]" key={index}>
                      <Image
                        width={100}
                        height={100}
                        src={image}
                        alt="Product"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <Button
                        className="absolute -top-3 -right-3  rounded-full text-white"
                        variant="destructive"
                        onClick={() => handleDelete(index)}
                      >
                        <XIcon className="size-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                    toast({
                      title: "Upload Complete",
                      description: "your image upload successfuly",
                    });
                  }}
                  onUploadError={() => {
                    toast({
                      title: "Something wrong",
                      description: "something went wrong try again",
                      variant: "destructive",
                    });
                  }}
                />
              )}
              <p className="text-red-500">{field.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <ProductSubmitButtons text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreatePage;
