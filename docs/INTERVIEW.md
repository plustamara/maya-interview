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
(to be filled after testing)