import { Skeleton } from "@/components/Skeleton";
import { ProgressBar } from "@/components/ProgressBar";

export default function Loading() {
  return (
    <div className="space-y-4">
      <ProgressBar indeterminate />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Array.from({length:6}).map((_,i)=>(
          <div key={i} className="rounded-xl p-4 border border-borderc-soft bg-bg-elevated">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-52 mt-2" />
            <Skeleton className="h-3 w-40 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
