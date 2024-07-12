import { Skeleton } from "../ui/skeleton";

export const ProblemSkeleton = () => {
    return (
        <div className="skeleton overlay overflow-hidden w-full h-full rounded-md">
            <div className="flex flex-col ">
                <Skeleton className="h-3 bg-[#eee] w-[170px] rounded-md" />
                <div className="flex justify-between my-3">
                    <Skeleton className="h-3 bg-[#eee] w-[50px] rounded-md" />
                </div>
                {Array.from({ length: 2 }, (_, index) => (
                    <div key={index} className="flex flex-col gap-y-2 px-2 mt-4 mb-2">
                        <Skeleton className="h-3 bg-[#eee] w-[400px] rounded-md" />
                        <Skeleton className="h-3 bg-[#eee] w-[350px] rounded-md" />
                        <Skeleton className="h-3 bg-[#eee] w-[300px] rounded-md" />
                        <Skeleton className="h-3 bg-[#eee] w-[250px] rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
};
