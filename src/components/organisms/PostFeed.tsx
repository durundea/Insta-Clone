import { useAppSelector } from "../../store/hooks";
import { selectPosts } from "../../store/selectors";
import { PostCard } from "./PostCard";

export function PostFeed() {
  const posts = useAppSelector(selectPosts);

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-6" aria-label="Post feed">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
