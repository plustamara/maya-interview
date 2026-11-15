import { connection } from "next/server";
import { ApiError } from "../lib/ApiError";

type Post = {
  id: number;
  title: string;
};

async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1"
  );

  if (!response.ok) {
    throw new ApiError("Posts request failed", response.status);
  }

  return response.json();
}

export default async function RecentPosts() {
  // Wait for a real request, so the delay runs on each visit.
  await connection();

  // INTENTIONAL LEARNING SIMULATION: a 2-second artificial delay
  // so we can see the Suspense fallback. Not part of a real app.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let posts: Post[] | null = null;

  try {
    posts = await getPosts();
  } catch {
    posts = null;
  }

  if (!posts) {
    return (
      <section>
        <h2>Recent posts</h2>
        <p>Sorry, we could not load the recent posts right now.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Recent posts</h2>
      <ul>
        {posts.slice(0, 3).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
}