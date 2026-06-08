import { FormEvent, useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export interface CommentBoxProps {
  onSubmit: (text: string) => void;
}

export function CommentBox({ onSubmit }: CommentBoxProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextComment = comment.trim();

    if (!nextComment) {
      return;
    }

    onSubmit(nextComment);
    setComment("");
  };

  return (
    <form className="flex items-center gap-2 border-t border-ink/10 px-4 py-3" onSubmit={handleSubmit}>
      <Input
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Add a comment..."
        aria-label="Add a comment"
      />
      <Button type="submit" className="px-3 py-2 text-sm">
        Post
      </Button>
    </form>
  );
}
