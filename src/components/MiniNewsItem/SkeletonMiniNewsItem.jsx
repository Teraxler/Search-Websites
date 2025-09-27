import Skeleton from "@mui/material/Skeleton";

export default function SkeletonMiniNewsItem() {
  return (
    <div className="flex-1 basis-full lg:basis-1/2 lg:odd:pe-4 lg:even:ps-4 h-19 lg:even:border-s border-[#eeeeee]">
      <div className="flex items-center gap-x-4 py-2 border-b border-b-[#eeeeee] h-full">
        <div className="w-20 h-11.5 hidden xs:block shrink-0 rounded-xs overflow-hidden">
          <Skeleton variant="rectangular" height={46} />
        </div>
        <div className="flex-1">
          <Skeleton height={22.5} />
          <div className="flex gap-x-1.25 mt-1">
            <Skeleton width={56} height={16} />
            <Skeleton width={60} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
