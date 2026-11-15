"use client";

import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function PostsExplorer() {
  const [status, setStatus] = useState<Status>("idle");
  const [posts, setPosts] = useState<Post[]>([]);

  async function loadPosts() {
    setStatus("loading");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=1"
      );

      if (!response.ok) {
        throw new Error("Posts request failed with status " + response.status);
      }

      const data: Post[] = await response.json();
      setPosts(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section>
      <h2>Explore all posts</h2>

      {status === "idle" && (
        <p>Click the button to load all posts for this employee.</p>
      )}

      {status === "error" && (
        <p>Sorry, we couldn't load the posts. Please try again.</p>
      )}

      {status === "success" && posts.length === 0 && <p>No posts found</p>}

      {status === "success" && posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={loadPosts} disabled={status === "loading"}>
        {status === "loading"
          ? "Loading..."
          : status === "error"
          ? "Try again"
          : "Load posts"}
      </button>
    </section>
  );
}