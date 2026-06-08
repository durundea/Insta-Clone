import { useParams } from "react-router-dom";

function Profile() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <main>
      <h1>Profile</h1>
      <p>Viewing profile: {userId ?? "me"}</p>
    </main>
  );
}

export default Profile;
