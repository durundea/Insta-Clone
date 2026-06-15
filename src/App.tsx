import { Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import StoryViewer from "./pages/StoryViewer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/stories/:userId" element={<StoryViewer />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/post/:postId" element={<PostDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;