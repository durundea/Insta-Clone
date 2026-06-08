import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsCreatePostModalOpen, selectCurrentUser } from "../../store/selectors";
import { toggleCreatePostModal } from "../../store/slices/uiSlice";
import { addPost } from "../../store/slices/postsSlice";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { TextArea } from "../atoms/TextArea";

export function CreatePostModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCreatePostModalOpen);
  const currentUser = useAppSelector(selectCurrentUser);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  if (!isOpen) {
    return null;
  }

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || !imageUrl || !caption) {
      return;
    }

    const newPost = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      image: imageUrl,
      caption: caption,
      likes: [],
      comments: [],
      timestamp: new Date().toISOString()
    };

    dispatch(addPost(newPost));
    setImageUrl("");
    setCaption("");
    dispatch(toggleCreatePostModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">Create Post</h2>
          <button
            onClick={() => {
              dispatch(toggleCreatePostModal());
              setImageUrl("");
              setCaption("");
            }}
            className="text-2xl font-bold text-ink/60 hover:text-ink"
          >
            ×
          </button>
        </div>

        <form onSubmit={handlePublish} className="flex flex-col gap-4">
          <div>
            <label htmlFor="imageUrl" className="mb-2 block text-sm font-semibold text-ink">
              Image URL
            </label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="caption" className="mb-2 block text-sm font-semibold text-ink">
              Caption
            </label>
            <TextArea
              id="caption"
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                dispatch(toggleCreatePostModal());
                setImageUrl("");
                setCaption("");
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="flex-1"
            >
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
