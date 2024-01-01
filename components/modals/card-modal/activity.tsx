import { AuditLog, Comment } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import { ActivityItem } from "@/components/activity-item";

interface ActivityProps {
  items: AuditLog[];
  comments: Comment[];
};

export const Activity = ({
  items,
  comments,
}: ActivityProps) => {

  const all = [...items, ...comments].sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });

  return (
    <ol className="mt-2 space-y-4">
      {all.map((item) => (
        <ActivityItem
          key={item.id}
          data={item}
        />
      ))}
    </ol>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="w-full my-2 h-10 bg-neutral-200" />
    </div>
  );
};
