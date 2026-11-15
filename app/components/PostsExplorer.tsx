"use client";

import { useState } from "react";
import { ApiError } from "../lib/ApiError";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function PostsExplorer() {
  const [status, setStatus] = useState<Status>("idle");
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPosts() {
    setStatus("loading");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=1"
      );

      if (!response.ok) {
        throw new ApiError("Posts request failed", response.status);
      }

      const data: Post[] = await response.json();
      setPosts(data);
      setStatus("success");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(
          "The server answered with an error (status " +
            error.status +
            "). Please try again."
        );
      } else {
        setErrorMessage(
          "Network problem. Check your connection and try again."
        );
      }
      setStatus("error");
    }
  }

  return (
    <section>
      <h2>Explore all posts</h2>

      {status === "idle" && (
        <p>Click the button to load all posts for this employee.</p>
      )}

      {status === "error" && <p>{errorMessage}</p>}

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