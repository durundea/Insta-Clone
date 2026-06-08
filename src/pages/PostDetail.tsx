import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectPostById } from "../store/selectors";
import { MainLayout } from "../components/templates/MainLayout";
import { PostCard } from "../components/organisms/PostCard";

function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const post = useAppSelector((state) => selectPostById(state, postId ?? ""));

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
