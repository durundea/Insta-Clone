import { useParams } from "react-router-dom";
import { MainLayout } from "../components/templates/MainLayout";
import { UserProfile } from "../components/organisms/UserProfile";
import { Spinner } from "../components/atoms/Spinner";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUserId, selectUsers } from "../store/selectors";

function Profile() {
  const { userId: routeUserId } = useParams<{ userId: string }>();
  const currentUserId = useAppSelector(selectCurrentUserId);
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  const userIdFromParam = routeUserId === "me" || !routeUserId
    ? currentUserId
    : users.find((user) => user.id === routeUserId || user.username === routeUserId)?.id;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto flex w-full max-w-2xl justify-center py-12">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (!userIdFromParam) {
    return (
      <MainLayout>
        <div className="mx-auto w-full max-w-2xl">
          <p className="rounded bg-red-50 p-3 text-red-700">User not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <UserProfile userId={userIdFromParam} />
    </MainLayout>
  );
}

export default Profile;
