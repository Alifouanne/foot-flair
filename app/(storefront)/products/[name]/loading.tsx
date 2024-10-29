import { Skeleton } from "@/components/ui/skeleton";

const LoadingProductsPage = () => {
  return (
    <section className="animate-pulse">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg p-4 space-y-4">
            <Skeleton className="h-48 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoadingProductsPage;
