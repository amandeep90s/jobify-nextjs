import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-8 grid sm:grid-cols-2 gap-4 md:grid-cols-3 rounded-lg">
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
    </div>
  );
};

export default loading;
