import { Skeleton } from "@/components/ui/skeleton";

interface HomeSkeletonProps {
  filterQuantity: number;
}

const renderSkeleton = (_: undefined, index: number) => (
  <Skeleton key={index} className="w-[180px] h-8" />
);

export const HomeSkeleton = ({ filterQuantity }: HomeSkeletonProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[...Array(filterQuantity)].map(renderSkeleton)}
      </div>
      <Skeleton className="w-full h-[600px] sm:h-[800px] mt-4" />
    </div>
  );
};
