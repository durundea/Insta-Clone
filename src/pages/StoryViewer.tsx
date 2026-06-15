import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectPosts, selectUsers } from "../store/selectors";

function StoryViewer() {
  const { userId: routeUserId } = useParams<{ userId: string }>();
  const users = useAppSelector(selectUsers);
  const posts = useAppSelector(selectPosts);

  const storyUser = users.find(
    (user) => user.id === routeUserId || user.username === routeUserId
  );

  const storyPost = storyUser
    ? posts
        .filter((post) => post.userId === storyUser.id)
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )[0]
    : undefined;

  if (!storyUser || !storyPost) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 py-8 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur">
          <h1 className="text-xl font-semibold">Story unavailable</h1>
          <p className="mt-2 text-sm text-white/75">
            This story is no longer available.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-8">
      <section
        data-testid="story-viewer"
        aria-label={`${storyUser.fullName} story viewer`}
        className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-black text-white shadow-2xl"
      >
        <header className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-semibold">{storyUser.fullName}</p>
            <p className="text-xs text-white/65">@{storyUser.username}</p>
          </div>
          <Link to={`/profile/${storyUser.username}`} className="text-xs text-white/80 hover:text-white">
            View profile
          </Link>
        </header>

        <img
          src={storyPost.image}
          alt={storyPost.caption}
          className="aspect-[9/16] w-full object-cover"
        />

        <div className="px-4 pb-4 pt-3">
          <p className="text-sm text-white/90">{storyPost.caption}</p>
          <div className="mt-3 flex items-center justify-between">
            <Link to="/" className="text-xs text-white/70 hover:text-white">
              Close
            </Link>
            <Link to={`/post/${storyPost.id}`} className="text-xs text-white/70 hover:text-white">
              Open post
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default StoryViewer;
