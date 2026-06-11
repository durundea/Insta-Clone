import { MainLayout } from "../components/templates/MainLayout";
import { Link } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import { useAppSelector } from "../store/hooks";
import { selectPosts } from "../store/selectors";

function Explore() {
  const posts = useAppSelector(selectPosts);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const error = useAppSelector((state) => state.ui.error);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-ink">Explore</h1>
          <p className="text-ink/60">Discover posts from the community</p>
        </div>

        {isLoading ? (
          <div className="mx-auto flex w-full max-w-6xl justify-center py-12" aria-label="Explore loading">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="mx-auto w-full max-w-6xl">
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
              <p className="font-semibold">Error loading posts</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        ) : (
          <section
            data-testid="explore-post-grid"
            className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
            aria-label="Explore posts"
          >
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                aria-label={`Open post: ${post.caption}`}
                className="group relative block overflow-hidden rounded-md bg-ink/5"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-200 group-hover:scale-105"
                />
              </Link>
            ))}
          </section>
        )}
      </div>
    </MainLayout>
  );
}

export default Explore;
