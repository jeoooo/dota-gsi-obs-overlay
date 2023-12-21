<script>
  import e from "cors";
  import CenterScreen from "../components/CenterScreen.svelte";
  import HeroBans from "../components/HeroBans.svelte";
  import HeroPick from "../components/HeroPick.svelte";
  import io from "socket.io-client";

  var DRAFT_ACTIVE_TIME_REMAINING;
  var RAW_DATA;
  var RADIANT_BONUS_TIME;
  var DIRE_BONUS_TIME;
  var DIRE_BANS = [];
  var RADIANT_BANS = [];
  var DIRE_PICKS = [];
  var RADIANT_PICKS = [];
  const socket = io("http://localhost:3001");

  let radiantPicks = Array(5).fill(false);
  let radiantBans = Array(7).fill(false);
  let direPicks = Array(5).fill(false);
  let direBans = Array(7).fill(false);

  socket.on("newdata", (data) => {
    DRAFT_ACTIVE_TIME_REMAINING = data.draft.activeteam_time_remaining;
    RADIANT_BONUS_TIME = data.draft.radiant_bonus_time;
    DIRE_BONUS_TIME = data.draft.dire_bonus_time;
    RAW_DATA = JSON.stringify(data);

    for (let i = 0; i <= 6; i++) {
      const banKeyDire = `ban${i}_class`;
      const banDataDire = data.draft.team3[banKeyDire];
      const banKeyRadiant = `ban${i}_class`;
      const banDataRadiant = data.draft.team2[banKeyRadiant];

      if (banDataDire) {
        DIRE_BANS[i] = banDataDire;
      } else {
        DIRE_BANS[i] = "black_image";
      }

      if (banDataRadiant) {
        RADIANT_BANS[i] = banDataRadiant;
      } else {
        RADIANT_BANS[i] = "black_image";
      }
    }

    for (let i = 0; i <= 4; i++) {
      const pickKeyDire = `pick${i}_class`;
      const pickDataDire = data.draft.team3[pickKeyDire];
      const pickKeyRadiant = `pick${i}_class`;
      const pickDataRadiant = data.draft.team2[pickKeyRadiant];

      if (pickDataDire) {
        DIRE_PICKS[i] = pickDataDire;
      } else {
        DIRE_PICKS[i] = "dota2_logo_animated";
      }

      if (pickDataRadiant) {
        RADIANT_PICKS[i] = pickDataRadiant;
      } else {
        RADIANT_PICKS[i] = "dota2_logo_animated";
      }
    }

    // Count Dire bans and picks
    const direBansCount = DIRE_BANS.filter(
      (ban) => ban !== "black_image"
    ).length;
    const direPicksCount = DIRE_PICKS.filter(
      (pick) => pick !== "dota2_logo_animated"
    ).length;

    console.log("Dire Bans:", direBansCount);
    console.log("Dire Picks:", direPicksCount);

    // Continue with the rest of your logic...
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
</script>

<main class="absolute bottom-0">
  <div class=" flex flex-row w-full p-4 justify-end">
    <div class="flex flex-col">
      <div class="flex flex-row">
        {#each RADIANT_PICKS as radiant_pick, index (index)}
          <HeroPick
            filepath={radiant_pick}
            hueRotate={"125deg"}
            isTurn={radiantPicks}
          />
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
        {#each DIRE_PICKS.reverse() as dire_pick, index (index)}
          <HeroPick
            filepath={dire_pick}
            hueRotate={"0deg"}
            isTurn={direPicks}
          />
        {/each}
      </div>
      <div class="flex flex-row object-fill">
        {#each DIRE_BANS.reverse() as dire_ban}
          <HeroBans filepath={`portraits/${dire_ban}.png`} />
        {/each}
      </div>
    </div>
  </div>
</main>
<!-- <pre>{RAW_DATA && JSON.stringify(JSON.parse(RAW_DATA), null, 2)}</pre> -->
