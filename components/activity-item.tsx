import { format } from "date-fns";
import { AuditLog, Comment } from "@prisma/client";
import parse from "html-react-parser";

import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  data: AuditLog | Comment;
}

function isAuditLog(data: AuditLog | Comment): data is AuditLog {
  return (data as AuditLog).action !== undefined;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage || data.userImage || ""} />
      </Avatar>
      {isAuditLog(data) ? (
        <div className="flex flex-col space-y-0.5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold lowercase text-neutral-700">
              {data.userName}
            </span>{" "}
            {generateLogMessage(data)}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(data.createdAt), "MMM d, yyyy 'at' k:mm a")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-0.5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold lowercase text-neutral-700">
              {data.userName}
            </span>{" "}
            <span className="text-xs text-muted-foreground">
              {format(new Date(data.createdAt), "d MMM 'at' h:mm")}
            </span>
          </p>
          <div className="prose bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md">
            {parse(data.body || "")}
          </div>
        </div>
      )}
    </li>
  );
};
