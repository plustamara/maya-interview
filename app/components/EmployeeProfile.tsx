import { ApiError } from "../lib/ApiError";

type Employee = {
  name: string;
  email: string;
  company: { name: string };
};

async function getEmployee(): Promise<Employee> {
  "use cache";

  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

  if (!response.ok) {
    throw new ApiError("Profile request failed", response.status);
  }

  return response.json();
}

export default async function EmployeeProfile() {
  let employee: Employee | null = null;

  try {
    employee = await getEmployee();
  } catch {
    employee = null;
  }

  if (!employee) {
    return (
      <section>
        <h2>Employee profile</h2>
        <p>Sorry, we could not load the employee profile right now.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Employee profile</h2>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Company: {employee.company.name}</p>
    </section>
  );
}