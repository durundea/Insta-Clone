import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectPostById } from "../store/selectors";
import { MainLayout } from "../components/templates/MainLayout";
import { PostCard } from "../components/organisms/PostCard";
import { Spinner } from "../components/atoms/Spinner";

function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const post = useAppSelector((state) => selectPostById(state, postId ?? ""));
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const error = useAppSelector((state) => state.ui.error);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto flex w-full max-w-2xl justify-center py-12">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            <p className="font-semibold">Error loading post</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-ink">Post</h1>
        </div>

        {post ? (
          <PostCard post={post} />
        ) : (
          <div className="rounded-lg bg-red-50 p-6 text-center">
            <p className="text-red-700 font-semibold">Post not found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default PostDetail;
