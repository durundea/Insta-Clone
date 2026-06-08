import { useAppSelector } from "../../store/hooks";
import { selectUserById, selectPosts } from "../../store/selectors";
import { Avatar } from "../atoms/Avatar";
import { Button } from "../atoms/Button";
import { PostCard } from "./PostCard";

export interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const user = useAppSelector((state) => selectUserById(state, userId));
  const allPosts = useAppSelector(selectPosts);

  if (!user) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-red-700 font-semibold">User not found</p>
      </div>
    );
  }

  // Filter posts by this user
  const userPosts = allPosts.filter((post) => post.userId === userId);

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Profile Header */}
      <div className="mb-8 rounded-lg border border-ink/10 bg-white p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <Avatar
            size="lg"
            src={user.avatar}
            alt={user.username}
            className="h-24 w-24 sm:h-32 sm:w-32"
          />

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-ink">{user.fullName}</h1>
            <p className="text-ink/60">@{user.username}</p>
            <p className="mt-2 text-ink/70">{user.bio}</p>

            {/* Stats */}
            <div className="mt-4 flex justify-center gap-6 sm:justify-start">
              <div>
                <p className="font-bold text-ink">{user.posts.length}</p>
                <p className="text-xs text-ink/60">Posts</p>
              </div>
              <div>
                <p className="font-bold text-ink">{user.followers.length}</p>
                <p className="text-xs text-ink/60">Followers</p>
              </div>
              <div>
                <p className="font-bold text-ink">{user.following.length}</p>
                <p className="text-xs text-ink/60">Following</p>
              </div>
            </div>

            {/* Action Buttons - Task 9 will add follow/unfollow logic */}
            <div className="mt-4 flex gap-2 justify-center sm:justify-start">
              <Button variant="primary">Follow</Button>
              <Button variant="secondary">Message</Button>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-ink">Posts</h2>
        {userPosts.length === 0 ? (
          <p className="text-center text-ink/60">No posts yet</p>
        ) : (
          userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </section>
    </div>
  );
}
