import { Avatar } from "../atoms/Avatar";
import { useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/selectors";

export interface PostHeaderProps {
  userId: string;
  timestamp: string;
}

export function PostHeader({ userId, timestamp }: PostHeaderProps) {
  const user = useAppSelector((state) => selectUserById(state, userId));

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar
          size="sm"
          src={user?.avatar}
          alt={user ? `${user.username} avatar` : "Unknown user avatar"}
        />
        <div>
          <p className="text-sm font-semibold text-ink">{user?.username ?? "unknown"}</p>
          <p className="text-xs text-ink/60">{new Date(timestamp).toLocaleString()}</p>
        </div>
      </div>
    </header>
  );
}
