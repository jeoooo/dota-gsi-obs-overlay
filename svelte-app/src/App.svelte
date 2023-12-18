<script>
  import CenterScreen from "./CenterScreen.svelte";

  import HeroBans from "./HeroBans.svelte";

  import HeroPick from "./HeroPick.svelte";

  import io from "socket.io-client";

  var DRAFT_ACTIVE_TIME_REMAINING = "Waiting for data..."; // Define newdata in the component's state
  var RAW_DATA; // Define newdata in the component's state

  const socket = io("http://localhost:3001"); // Replace with your server URL

  socket.on("newdata", (data) => {
    DRAFT_ACTIVE_TIME_REMAINING = data.draft.activeteam_time_remaining;
    RAW_DATA = JSON.stringify(data);
    // Update newdata when the event is received
    console.log(data);
  });

  // Add more socket event listeners as needed...
</script>

<main>
  <div class=" flex flex-row w-full p-4 border border-red-400 justify-end">
    <div class="flex flex-col">
      <div class="flex flex-row">
        <HeroPick />
        <HeroPick />
        <HeroPick />
        <HeroPick />
        <HeroPick />
      </div>
      <div class="flex flex-row object-fill">
        <HeroBans />
        <HeroBans />
        <HeroBans />
        <HeroBans />
        <HeroBans />
        <HeroBans />
        <HeroBans />
      </div>
    </div>
    <CenterScreen />
    <div class="flex flex-col">
      <div class="flex flex-row">
        <HeroPick />
        <HeroPick />
        <HeroPick />
        <HeroPick />
        <HeroPick />
      </div>
      <div class="flex flex-row object-fill">
        <HeroBans />
        <HeroBans />
        <HeroBans />
        <HeroBans />
        <HeroBans />
        <HeroBans />
        <HeroBans />
      </div>
    </div>
    <!-- <p>{RAW_DATA}</p> -->
  </div>
</main>
