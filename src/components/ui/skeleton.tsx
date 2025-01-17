import { BorderBeam } from "@/components/ui/border-beam";

const ProductSkeleton = () => {
  return (
    <div className="relative flex flex-col text-white bg-black w-full overflow-hidden rounded-lg shadow-md animate-pulse">
      <div className="bg-gray-700 h-48 rounded-t-lg" />
      <div className="p-4">
        <div className="bg-gray-700 h-6 w-3/4 rounded mb-2" />
        <div className="bg-gray-700 h-4 w-1/2 rounded mb-2" />
        <div className="bg-gray-700 h-4 w-1/3 rounded mb-4" />
        <div className="bg-gray-700 h-10 w-full rounded" />
      </div>
      <BorderBeam />
    </div>
  );
};

export default ProductSkeleton;

