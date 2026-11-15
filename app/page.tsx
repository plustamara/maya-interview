import EmployeeProfile from "./components/EmployeeProfile";

export default function Home() {
  return (
    <main>
      <h1>Employee Explorer</h1>
      <p>A small dashboard to learn server and client data fetching.</p>

      <EmployeeProfile />
    </main>
  );
}