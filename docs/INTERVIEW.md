# Interview notes

## Initial predictions (written before implementation)

1. The employee profile runs on the server because the data is needed
   immediately and needs no interaction. The recent posts preview runs on the
   server as an async Server Component inside Suspense, because it loads
   slowly. The explore posts section is a Client Component because it uses
   state and a click.

2. While the preview loads, I think only the employee profile stays visible.

3. I think a fetch inside a click handler won't automatically show the
   Suspense fallback. I am not sure why; I guessed it waits for a timer.

4. I think fetch throws on a 503, if the error is defined.

## What I learned after testing

1. My first answer about where the requests run was right. The profile and the posts preview run on the server, and the explorer runs in the browser after a click.
2. I was wrong that only the profile stays visible while the preview loads. Everything outside the Suspense boundary stays visible: the title, the intro text, the profile and the explorer. Only the preview is replaced by the fallback.
3. I was right that a fetch in a click handler does not show the Suspense fallback, but my reason was wrong. It has nothing to do with a timer. Suspense only reacts to work that waits while React is rendering, and a click handler runs after rendering.
4. I was wrong about the 503. fetch does not throw on a 503. It returns a response with ok set to false, so I have to check response.ok myself and throw my own error.

## Interview answers

1. Where does each request run? The profile and the posts preview run on the server. I checked this with a console.log: the message showed in the terminal and not in the browser console, and the Network panel did not show a request to jsonplaceholder for them. The server terminal also showed the page request taking about 2 seconds, which is the preview delay. The explorer request runs in the browser, and I saw it in the Network panel only after clicking Load posts.

2. Why server for the profile and client for the button? The profile needs no interaction and should be there immediately, so a Server Component is enough and the request stays on the server. The button needs an onClick and useState, and those only exist in the browser, so it has to be a Client Component.

3. What activates the preview's Suspense fallback? The preview is an async Server Component. While it waits (connection, the 2-second delay and the fetch), React is still rendering it inside the Suspense boundary, so it shows the fallback until the work finishes. The click request runs inside an event handler after rendering, so Suspense never sees it. That is why I track idle, loading, success and error with useState.

4. What if the boundary wrapped the whole dashboard? For those 2 seconds the title, intro and profile would also be replaced by the fallback, so the whole page would look like it is loading. A boundary around only the preview keeps everything else visible.

5. How does the custom error class help? ApiError extends Error and also stores the HTTP status. In the catch I check error instanceof ApiError, so I can show a message with the status for an HTTP failure and a different message for other failures. super(message) calls the normal Error constructor so the message is stored and the object works as a real error. Then I add the status.

6. HTTP failure, network failure and empty result: An HTTP failure means the server answered but with a bad status like 503. fetch does not throw, so I check response.ok and throw ApiError. A network failure means no answer at all, for example offline. fetch rejects, and my catch shows the network message. An empty result means the server answered correctly with an empty list. It is not an error, so the page shows "No posts found".

7. What if employee ID 1 became 2 in all three sections? The number 1 is written in three places: the profile URL, the server posts URL and the client posts URL. If I only changed some of them, the page would show different employees in different sections. It would be better to keep the id in one place. With "use cache" on the profile, the id should also be passed in as a function argument so it becomes part of the cache key.

8. Which decision did I verify myself? I verified where the requests run by checking the terminal and the Network panel. I also verified that the simulated 503 goes through the same response.ok check, because choosing HTTP error did not create any new request to jsonplaceholder, and the error message showed the status.

## AI suggestion I checked

The Next.js dev overlay reported that the profile fetch was uncached data blocking the route. The suggested fix was to add "use cache" to the getEmployee function. I checked it by reading the Next.js documentation page for that error, then saving and reloading: the error disappeared and the profile still showed. I accepted it, and I understand the trade-off, which is that the profile is now cached and not fetched fresh on every visit.