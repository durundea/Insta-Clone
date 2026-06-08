import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser, selectUserById } from "../store/selectors";
import { MainLayout } from "../components/templates/MainLayout";
import { UserProfile } from "../components/organisms/UserProfile";
import { Spinner } from "../components/atoms/Spinner";

function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  // If no userId in params, use current user's ID (profile/me route)
  const profileUserId = userId === "me" ? currentUser?.id : userId;
  const profile = useAppSelector((state) => selectUserById(state, profileUserId ?? ""));

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto flex w-full max-w-2xl justify-center py-12">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (!profileUserId || !profile) {
    return (
      <MainLayout>
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <p className="text-red-700 font-semibold">User not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <UserProfile userId={profileUserId} />
    </MainLayout>
  );
}

export default Profile;
