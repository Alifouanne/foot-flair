import EditForm from "@/components/dashboard/EditForm";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

const getData = async (id: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
};
const EditPage = async ({ params }: { params: { id: string } }) => {
  noStore();
  const data = await getData(params.id);
  return (
    <>
      <EditForm data={data} />
    </>
  );
};

export default EditPage;
