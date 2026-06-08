import { useAppSelector } from "../../store/hooks";
import { selectPosts } from "../../store/selectors";
import { PostCard } from "./PostCard";
import { Spinner } from "../atoms/Spinner";

export function PostFeed() {
  const posts = useAppSelector(selectPosts);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const error = useAppSelector((state) => state.ui.error);

  if (isLoading) {
    return (
      <section className="mx-auto flex w-full max-w-2xl justify-center py-12" aria-label="Post feed loading">
        <Spinner size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto w-full max-w-2xl">
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          <p className="font-semibold">Error loading posts</p>
          <p className="text-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-6" aria-label="Post feed">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
