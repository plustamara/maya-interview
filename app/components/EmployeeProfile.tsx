type Employee = {
  name: string;
  email: string;
  company: { name: string };
};

async function getEmployee(): Promise<Employee> {
  "use cache";

  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

  if (!response.ok) {
    throw new Error("Profile request failed with status " + response.status);
  }

  return response.json();
}

export default async function EmployeeProfile() {
  try {
    const employee = await getEmployee();

    return (
      <section>
        <h2>Employee profile</h2>
        <p>Name: {employee.name}</p>
        <p>Email: {employee.email}</p>
        <p>Company: {employee.company.name}</p>
      </section>
    );
  } catch {
    return (
      <section>
        <h2>Employee profile</h2>
        <p>Sorry, we couldn't load the employee profile right now.</p>
      </section>
    );
  }
}