import { MainLayout } from "../components/templates/MainLayout";
import { PostFeed } from "../components/organisms/PostFeed";
import { StoriesBar } from "../components/organisms/StoriesBar";

function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-ink">Home</h1>
          <p className="text-ink/60">Welcome to your feed</p>
        </div>
        <StoriesBar />
        <PostFeed />
      </div>
    </MainLayout>
  );
}

export default Home;
