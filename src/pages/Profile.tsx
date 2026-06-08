import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/selectors";
import { MainLayout } from "../components/templates/MainLayout";
import { UserProfile } from "../components/organisms/UserProfile";

function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const currentUser = useAppSelector(selectCurrentUser);

  // If no userId in params, use current user's ID (profile/me route)
  const profileUserId = userId === "me" ? currentUser?.id : userId;

  if (!profileUserId) {
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
