import { Button } from "../atoms/Button";
import { useAppDispatch } from "../../store/hooks";
import { toggleLike } from "../../store/slices/postsSlice";

export interface LikeButtonProps {
  postId: string;
  userId: string;
  likes: string[];
}

export function LikeButton({ postId, userId, likes }: LikeButtonProps) {
  const dispatch = useAppDispatch();
  const hasLiked = likes.includes(userId);
  const canLike = Boolean(userId);

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Button
        variant={hasLiked ? "secondary" : "ghost"}
        className="px-3 py-1 text-sm"
        aria-label={hasLiked ? "Unlike post" : "Like post"}
        disabled={!canLike}
        onClick={() => {
          if (!canLike) {
            return;
          }

          dispatch(toggleLike({ postId, userId }));
        }}
      >
        {hasLiked ? "Unlike" : "Like"}
      </Button>
      <span className="text-sm text-ink/70">{likes.length} likes</span>
    </div>
  );
}
