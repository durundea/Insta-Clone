import { CommentBox } from "../molecules/CommentBox";
import { LikeButton } from "../molecules/LikeButton";
import { PostHeader } from "../molecules/PostHeader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCurrentUserId } from "../../store/selectors";
import { addComment } from "../../store/slices/postsSlice";
import type { Post } from "../../types";

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(selectCurrentUserId);
  const interactionUserId = currentUserId ?? "";

  return (
    <article className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
      <PostHeader userId={post.userId} timestamp={post.timestamp} />
      <img src={post.image} alt={post.caption} className="w-full object-cover" loading="lazy" />
      <div className="px-4 pt-3">
        <p className="text-sm text-ink">{post.caption}</p>
      </div>
      <LikeButton postId={post.id} userId={interactionUserId} likes={post.likes} />
      <CommentBox
        onSubmit={(text) => {
          if (!interactionUserId) {
            return;
          }

          dispatch(
            addComment({
              postId: post.id,
              comment: {
                id: crypto.randomUUID(),
                userId: interactionUserId,
                text,
                timestamp: new Date().toISOString()
              }
            })
          );
        }}
      />
    </article>
  );
}
