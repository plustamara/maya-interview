import { Suspense } from "react";
import EmployeeProfile from "./components/EmployeeProfile";
import RecentPosts from "./components/RecentPosts";

export default function Home() {
  return (
    <main>
      <h1>Employee Explorer</h1>
      <p>A small dashboard to learn server and client data fetching.</p>

      <EmployeeProfile />

      <Suspense fallback={<p>Loading recent posts... (intentional 2-second demo delay)</p>}>
        <RecentPosts />
      </Suspense>
    </main>
  );
}