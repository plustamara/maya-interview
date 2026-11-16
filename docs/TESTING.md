# Testing

Next.js version: 16.4.6
Tested in: Chrome Browser on laptop 

## Checks

| Check | Expected result | Actual result | Pass/Fail |
|---|---|---|---|
| Server profile | Name, email, company of employee 1 shown | pass |
| Server preview | Fallback shows for about 2 seconds, page title and profile stay visible, then 3 titles | pass |
| Client idle | No posts request in the Network panel before the first click | pass |
| Client slow | "Loading..." shows, button disabled, no duplicate requests | With the Slow scenario, the button showed "Loading..." and was disabled for about 2 seconds, clicking it again did nothing, and the Network panel showed one posts request. Then the posts appeared. | Pass |
| Client success | Titles and bodies appear | pass |
| HTTP failure | Simulated 503 creates ApiError, message with status shown, Try again available | pass |
| Empty response | "No posts found" shown, no error message | pass |
| Recovery | After HTTP error, switch to Success, retry: posts appear and error clears | pass |
| Section independence | After a client error, profile and server preview are still visible | pass |
| Usability | Labelled controls, visible keyboard focus, readable at about 360px width | pass |

## Commands

- `npm run lint`: no errors
- `npm run build`: built successfully 

## Steps I used for timing

1. I reloaded the page directly (F5) with npm run dev running.
2. I saw "Loading recent posts..." for about 2 seconds while the title and profile were already visible.
3. Then the 3 post titles appeared.

## Screenshots

- Normal state: docs/screenshots/NormalState.png
- Server preview loading: docs/screenshots/LoadingState.png
- Client error: docs/screenshots/HTTPError.png
- Empty state: docs/screenshots/EmptyState.png