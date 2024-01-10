<script lang="ts">
  import Router from "svelte-spa-router";
  import Index from "./Index.svelte";
  import Draft from "./routes/Draft.svelte";
  import Scoreboard from "./routes/Scoreboard.svelte";
  import Scoreboard2 from "./routes/Scoreboard2.svelte";
  import Draft2 from "./routes/Draft2.svelte";

  let routes = {
    "/": Index,
    "/draft": Draft,
    "/scoreboard": Scoreboard,
    "/scoreboard2": Scoreboard2,
    "/draft2": Draft2,
  };
</script>

<main>
  <Router {routes} />
</main>
