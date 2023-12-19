<script lang="ts">
  import Router from "svelte-spa-router";
  import Index from "./Index.svelte";
  import Draft from "./routes/Draft.svelte";
  import Scoreboard from "./routes/Scoreboard.svelte";

  let routes = {
    "/": Index,
    "/draft": Draft,
    "/scoreboard": Scoreboard,
  };
</script>

<main>
  <Router {routes} />
</main>
