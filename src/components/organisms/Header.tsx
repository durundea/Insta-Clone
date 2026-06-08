import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/selectors";
import { toggleCreatePostModal } from "../../store/slices/uiSlice";
import { Avatar } from "../atoms/Avatar";
import { Button } from "../atoms/Button";

export function Header() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <header className="border-b border-ink/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-accent">
          Insta Clone
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            onClick={() => dispatch(toggleCreatePostModal())}
          >
            Create Post
          </Button>

          {currentUser && (
            <Link to="/profile/me" className="flex items-center gap-2 hover:opacity-70">
              <Avatar
                size="sm"
                src={currentUser.avatar}
                alt={currentUser.username}
              />
              <span className="text-sm font-semibold text-ink">{currentUser.username}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
