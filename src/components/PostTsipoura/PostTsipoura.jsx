import { useState } from "react";
import './PostTsipoura.css'
export default function PostTsipoura({ onPost }) {
  const [post, setPost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.trim()) {
      onPost(post); // Send post to parent
      setPost(""); // Clear input
    }
  };

  return (
    <div className="post-tsipoura-container">
      <input
        type="text"
        placeholder="Share what troubles you..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}
