<script>
  import e from "cors";
  import CenterScreen from "../components/CenterScreen.svelte";

  import HeroBans from "../components/HeroBans.svelte";

  import HeroPick from "../components/HeroPick.svelte";

  import io from "socket.io-client";

  var DRAFT_ACTIVE_TIME_REMAINING; // Define newdata in the component's state
  var RAW_DATA; // Define newdata in the component's state
  var RADIANT_BONUS_TIME;
  var DIRE_BONUS_TIME;
  var DIRE_BANS = [];
  var RADIANT_BANS = [];
  var DIRE_PICKS = [];
  var RADIANT_PICKS = [];
  const socket = io("http://localhost:3001"); // Replace with your server URL

  socket.on("newdata", (data) => {
    DRAFT_ACTIVE_TIME_REMAINING = data.draft.activeteam_time_remaining;
    RADIANT_BONUS_TIME = data.draft.radiant_bonus_time;
    DIRE_BONUS_TIME = data.draft.dire_bonus_time;
    RAW_DATA = JSON.stringify(data);

    // Loop for Dire bans
    for (let i = 0; i <= 6; i++) {
      const banKey = `ban${i}_class`;
      const banData = data.draft.team3[banKey];

      // Check if the ban data is available
      if (banData) {
        DIRE_BANS[i] = banData;
      } else {
        DIRE_BANS[i] = "black_image"; // or any default value if the ban data is not available
      }
    }

    // Loop for Radiant bans
    for (let i = 0; i <= 6; i++) {
      const banKey = `ban${i}_class`;
      const banData = data.draft.team2[banKey];

      // Check if the ban data is available
      if (banData) {
        RADIANT_BANS[i] = banData;
      } else {
        RADIANT_BANS[i] = "black_image";
      }
    }

    // Loop for Radiant picks
    for (let i = 0; i <= 4; i++) {
      const pickKey = `pick${i}_class`;
      const pickData = data.draft.team2[pickKey];

      // Check if the ban data is available
      if (pickData) {
        RADIANT_PICKS[i] = pickData;
      } else {
        RADIANT_PICKS[i] = "dota2_logo_animated";
      }
    }

    // Loop for Dire picks
    for (let i = 0; i <= 4; i++) {
      const pickKey = `pick${i}_class`;
      const pickData = data.draft.team3[pickKey];

      // Check if the ban data is available
      if (pickData) {
        DIRE_PICKS[i] = pickData;
      } else {
        DIRE_PICKS[i] = "dota2_logo_animated";
      }
    }

    // Create a console table
    console.table({
      "Radiant Picks": RADIANT_PICKS,
      "Radiant Bans": RADIANT_BANS,
      "Dire Picks": DIRE_PICKS,
      "Dire Bans": DIRE_BANS,
    });

    // RADIANT_BANS.forEach((element) => {
    //   console.log(`portraits/${element}.png`);
    // });
    // DIRE_BANS.forEach((element) => {
    //   console.log(`portraits/${element}.png`);
    // });

    // console.log(DIRE_BANS);
    // console.log(RADIANT_PICKS);
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
</script>

<main>
  <div class=" flex flex-row w-full p-4 border border-red-400 justify-end">
    <div class="flex flex-col">
      <div class="flex flex-row">
        {#each RADIANT_PICKS as radiant_pick}
          <HeroPick filepath={radiant_pick} />
        {/each}
      </div>
      <div class="flex flex-row object-fill">
        {#each RADIANT_BANS as radiant_ban}
          <HeroBans filepath={`portraits/${radiant_ban}.png`} />
        {/each}
      </div>
    </div>
    <CenterScreen
      active_team_time_remaining={formatTime(DRAFT_ACTIVE_TIME_REMAINING)}
      radiant_bonus_time={formatTime(RADIANT_BONUS_TIME)}
      dire_bonus_time={formatTime(DIRE_BONUS_TIME)}
    />
    <div class="flex flex-col">
      <div class="flex flex-row">
        {#each DIRE_PICKS.reverse() as dire_pick}
          <HeroPick filepath={dire_pick} />
        {/each}
      </div>
      <div class="flex flex-row object-fill">
        {#each DIRE_BANS.reverse() as dire_ban}
          <HeroBans filepath={`portraits/${dire_ban}.png`} />
        {/each}
      </div>
    </div>
    <!-- <pre>{RAW_DATA && JSON.stringify(JSON.parse(RAW_DATA), null, 2)}</pre> -->
  </div>
</main>
