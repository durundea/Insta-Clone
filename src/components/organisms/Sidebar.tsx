import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/selectors";
import { Avatar } from "../atoms/Avatar";

export function Sidebar() {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <aside className="flex flex-col gap-6">
      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        <Link
          to="/"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-ink hover:bg-black/5"
        >
          Home
        </Link>
        <Link
          to="/explore"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-ink hover:bg-black/5"
        >
          Explore
        </Link>
        <Link
          to="/profile/me"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-ink hover:bg-black/5"
        >
          Profile
        </Link>
      </nav>

      {/* Current User Section */}
      {currentUser && (
        <div className="rounded-lg border border-ink/10 bg-white p-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <Avatar
              size="lg"
              src={currentUser.avatar}
              alt={currentUser.username}
            />
            <div>
              <p className="font-semibold text-ink">{currentUser.fullName}</p>
              <p className="text-xs text-ink/60">@{currentUser.username}</p>
            </div>
            <p className="text-xs text-ink/70 leading-relaxed">{currentUser.bio}</p>

            {/* Stats */}
            <div className="flex w-full justify-around pt-3 text-center">
              <div>
                <p className="font-bold text-ink">{currentUser.posts.length}</p>
                <p className="text-xs text-ink/60">Posts</p>
              </div>
              <div>
                <p className="font-bold text-ink">{currentUser.followers.length}</p>
                <p className="text-xs text-ink/60">Followers</p>
              </div>
              <div>
                <p className="font-bold text-ink">{currentUser.following.length}</p>
                <p className="text-xs text-ink/60">Following</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
