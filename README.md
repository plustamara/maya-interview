# Employee Explorer

Assignment 3, "Yehia Meets Maya" (TechTalks, Next.js)

Author: Tamara Allam

## What this project is

A small Next.js App Router project with one dashboard at `/`. It shows data for employee 1 from JSONPlaceholder and is built to compare server fetching and client fetching, and to see how the page behaves when a request is slow or fails.

The page has three parts:

- Employee profile (name, email, company): fetched in a Server Component.
- Recent posts preview (three titles): an async Server Component inside its own Suspense boundary.
- Explore all posts: a Client Component that fetches post titles and bodies in the browser after a click on Load posts.

Employee 1 is used in all three. The data comes from JSONPlaceholder (`/users/1` and `/posts?userId=1`). It is sample data, so the post text is placeholder text.

## Next.js version

Next.js 16.4.6 (Turbopack), App Router, TypeScript.

## How to run it

1. Install Node.js.
2. Clone the repository and open the project folder.
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Open http://localhost:3000

Other commands: `npm run lint` and `npm run build`. Their results are in `docs/TESTING.md`.

## Demo controls

The explorer has a "Demo scenario" selector. The choice is used on the next Load posts or Try again click. It does not affect the server sections.

- Success: the real JSONPlaceholder request.
- Slow: waits two seconds, then makes the real request.
- HTTP error: a locally created Response with status 503. It goes through the same `response.ok` check as a real response and produces my `ApiError`.
- Empty: a locally created successful Response containing an empty list. It goes through the same JSON parsing and shows "No posts found", not an error.

HTTP error and Empty are simulations made in this project. They are not responses from JSONPlaceholder, and the page says so.

To see recovery: choose HTTP error, click Load posts, read the message, switch to Success, then click Try again.

## Intentional delay

The recent posts preview has a two-second artificial delay inside its async function. It is only there to show the Suspense fallback while the rest of the page stays visible. It is a learning simulation, not a real slow API. The preview also calls `await connection()` so the delay runs on each request and not once at build time. Test it with a direct reload, because navigation and prefetching can change what you see.

## Error handling

`app/lib/ApiError.ts` defines `ApiError`, which extends `Error` and stores the HTTP status. All three requests check `response.ok` and throw `ApiError` for an unsuccessful response. Each section catches its own failure, so a failure in one section does not remove the others. In the client explorer, the catch tells an `ApiError` (HTTP failure) apart from any other error (for example a network failure).

## Project files

- `app/page.tsx`: the page. It only arranges the sections.
- `app/components/EmployeeProfile.tsx`: server profile (uses `"use cache"`).
- `app/components/RecentPosts.tsx`: server preview with the delay.
- `app/components/PostsExplorer.tsx`: client explorer and demo scenarios.
- `app/lib/ApiError.ts`: the custom error class.
- `docs/INTERVIEW.md`: predictions and answers.
- `docs/TESTING.md`: test results and screenshots.

## Limitations

- The employee id (1) is written in three places and is not shared in one constant.
- The profile is cached with `"use cache"`, so it is not fetched fresh on every visit.
- The post text is placeholder text from JSONPlaceholder.
- The two-second delay stays in the demo on purpose.
- Testing was done by hand. There are no automated tests.
- The design is simple. I checked it at about 360px wide and on a laptop, but not on real devices.