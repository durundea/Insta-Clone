import { MainLayout } from "../components/templates/MainLayout";
import { PostFeed } from "../components/organisms/PostFeed";

function Explore() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-ink">Explore</h1>
          <p className="text-ink/60">Discover posts from the community</p>
        </div>
        <PostFeed />
      </div>
    </MainLayout>
  );
}

export default Explore;
