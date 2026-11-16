"use client";

import { useRef, useState } from "react";
import { ApiError } from "../lib/ApiError";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Status = "idle" | "loading" | "success" | "error";
type Scenario = "success" | "slow" | "http-error" | "empty";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?userId=1";

// Success and Slow use the real API. HTTP error and Empty are local simulations.
async function getPostsResponse(scenario: Scenario): Promise<Response> {
  if (scenario === "http-error") {
    return new Response(null, { status: 503 });
  }

  if (scenario === "empty") {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (scenario === "slow") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return fetch(POSTS_URL);
}

export default function PostsExplorer() {
  const [status, setStatus] = useState<Status>("idle");
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [scenario, setScenario] = useState<Scenario>("success");
  const isLoadingRef = useRef(false);

  async function loadPosts() {
    if (isLoadingRef.current) {
      return;
    }
    isLoadingRef.current = true;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await getPostsResponse(scenario);

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
    } finally {
      isLoadingRef.current = false;
    }
  }

  return (
    <section>
      <h2>Explore all posts</h2>

      <div className="scenario">
        <label htmlFor="scenario">Demo scenario</label>
        <select
          id="scenario"
          value={scenario}
          onChange={(event) => setScenario(event.target.value as Scenario)}
          disabled={status === "loading"}
        >
          <option value="success">Success (real API)</option>
          <option value="slow">Slow (2-second wait, then real API)</option>
          <option value="http-error">HTTP error (simulated 503)</option>
          <option value="empty">Empty (simulated empty list)</option>
        </select>
        <p className="note">
          HTTP error and Empty are local simulations. They are not responses
          from JSONPlaceholder. The choice applies to the next Load or Try
          again click.
        </p>
      </div>

      {status === "idle" && (
        <p>Click the button to load all posts for this employee.</p>
      )}

      {status === "error" && <p className="error">{errorMessage}</p>}

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