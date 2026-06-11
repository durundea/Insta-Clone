import { Link } from "react-router-dom";
import { Avatar } from "../atoms/Avatar";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUserId, selectUsers } from "../../store/selectors";

export function StoriesBar() {
  const users = useAppSelector(selectUsers);
  const currentUserId = useAppSelector(selectCurrentUserId);

  return (
    <section
      data-testid="home-stories-bar"
      aria-label="Stories"
      className="rounded-xl border border-ink/10 bg-white p-3 shadow-sm"
    >
      <div className="flex gap-4 overflow-x-auto pb-1">
        {users.map((user) => {
          const isCurrentUser = user.id === currentUserId;

          return (
            <Link
              key={user.id}
              to={`/profile/${user.username}`}
              data-testid="story-item"
              className="group flex min-w-[72px] flex-col items-center gap-2"
              aria-label={`Open ${user.fullName} story`}
            >
              <div
                className={`rounded-full p-[2px] ${
                  isCurrentUser
                    ? "bg-ink/20"
                    : "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]"
                }`}
              >
                <div className="rounded-full bg-white p-[2px]">
                  <Avatar size="md" src={user.avatar} alt={user.fullName} />
                </div>
              </div>
              <span className="max-w-[72px] truncate text-xs font-medium text-ink/80">
                {isCurrentUser ? "Your story" : user.fullName.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
