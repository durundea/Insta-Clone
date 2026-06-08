import { useParams } from "react-router-dom";

function PostDetail() {
  const { postId } = useParams<{ postId: string }>();

  return (
    <main>
      <h1>Post Detail</h1>
      <p>Viewing post: {postId}</p>
    </main>
  );
}

export default PostDetail;
