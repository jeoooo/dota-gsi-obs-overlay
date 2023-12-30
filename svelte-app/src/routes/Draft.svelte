<script>
  import CenterScreen2 from "../components/CenterScreen2.svelte";
  import HeroBans2 from "./../components/HeroBans2.svelte";
  import e from "cors";
  import CenterScreen from "../components/CenterScreen.svelte";
  import HeroBans from "../components/HeroBans.svelte";
  import HeroPick from "../components/HeroPick.svelte";
  import io from "socket.io-client";
  import HeroPick2 from "../components/HeroPick2.svelte";

  var DRAFT_ACTIVE_TIME_REMAINING;
  var RAW_DATA;
  var RADIANT_BONUS_TIME;
  var DIRE_BONUS_TIME;
  var DIRE_BANS = [];
  var RADIANT_BANS = [];
  var DIRE_PICKS = [];
  var RADIANT_PICKS = [];
  var activeTeam;
  const socket = io("http://localhost:3001");

  let radiantPicks = Array(5).fill(false);
  let radiantBans = Array(7).fill(false);
  let direPicks = Array(5).fill(false);
  let direBans = Array(7).fill(false);

  var phase;
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  socket.on("newdata", (data) => {
    DRAFT_ACTIVE_TIME_REMAINING = data.draft.activeteam_time_remaining;
    RADIANT_BONUS_TIME = data.draft.radiant_bonus_time;
    DIRE_BONUS_TIME = data.draft.dire_bonus_time;
    RAW_DATA = JSON.stringify(data);

    let radiantState = "none";
    let direState = "none";

    let radiantBans = Array(7).fill(false);
    let radiantPicks = Array(5).fill(false);
    let direBans = Array(7).fill(false);
    let direPicks = Array(5).fill(false);

    activeTeam = data.draft.activeteam === 2 ? "radiant" : "dire";
    const isPickPhase = data.draft.pick;
    phase = isPickPhase ? "picking" : "banning"; // Assign phase inside the callback

    for (let i = 0; i <= 6; i++) {
      const banKeyDire = `ban${i}_class`;
      const banDataDire = data.draft.team3[banKeyDire];
      const banKeyRadiant = `ban${i}_class`;
      const banDataRadiant = data.draft.team2[banKeyRadiant];

      if (banDataDire) {
        DIRE_BANS[i] = banDataDire;
        direState = banDataDire;
        direBans[i] = banDataDire;
        // console.log(`Dire team banned: ${banDataDire}`);
      } else {
        DIRE_BANS[i] = "black_image";
        direState = phase;
        direBans[i] = "none";
      }

      if (banDataRadiant) {
        RADIANT_BANS[i] = banDataRadiant;
        radiantState = banDataRadiant;
        radiantBans[i] = banDataRadiant;
        // console.log(`Radiant team banned: ${banDataRadiant}`);
      } else {
        RADIANT_BANS[i] = "black_image";
        radiantState = phase;
        radiantBans[i] = "none";
      }
    }

    // If the active team is radiant and the current phase is banning, set the nearest index to banning
    if (activeTeam === "radiant" && phase === "banning") {
      const nextRadiantBanIndex = radiantBans.findIndex(
        (ban) => ban === "none"
      );
      if (nextRadiantBanIndex !== -1) {
        radiantBans[nextRadiantBanIndex] = "banning";
      }
    }

    // If the active team is dire and the current phase is banning, set the nearest index to banning
    if (activeTeam === "dire" && phase === "banning") {
      const nextDireBanIndex = direBans.findIndex((ban) => ban === "none");
      if (nextDireBanIndex !== -1) {
        direBans[nextDireBanIndex] = "banning";
      }
    }

    for (let i = 0; i <= 4; i++) {
      const pickKeyDire = `pick${i}_class`;
      const pickDataDire = data.draft.team3[pickKeyDire];
      const pickKeyRadiant = `pick${i}_class`;
      const pickDataRadiant = data.draft.team2[pickKeyRadiant];

      if (pickDataDire) {
        DIRE_PICKS[i] = pickDataDire;
        direState = pickDataDire;
        direPicks[i] = pickDataDire;
        // console.log(`Dire team picked: ${pickDataDire}`);
      } else if (direPicks[i] !== "picking") {
        DIRE_PICKS[i] = "dota2_logo_animated";
        direState = phase;
        direPicks[i] = "none";
      }

      if (pickDataRadiant) {
        RADIANT_PICKS[i] = pickDataRadiant;
        radiantState = pickDataRadiant;
        radiantPicks[i] = pickDataRadiant;
        // console.log(`Radiant team picked: ${pickDataRadiant}`);
      } else if (radiantPicks[i] !== "picking") {
        RADIANT_PICKS[i] = "dota2_logo_animated";
        radiantState = phase;
        radiantPicks[i] = "none";
      }
    }

    // If the active team is radiant and the current phase is picking, set the nearest index to picking
    if (activeTeam === "radiant" && phase === "picking") {
      const nextRadiantPickIndex = radiantPicks.findIndex(
        (pick) => pick === "none"
      );
      if (nextRadiantPickIndex !== -1) {
        radiantPicks[nextRadiantPickIndex] = "picking";
      }
    }

    // If the active team is dire and the current phase is picking, set the nearest index to picking
    if (activeTeam === "dire" && phase === "picking") {
      const nextDirePickIndex = direPicks.findIndex((pick) => pick === "none");
      if (nextDirePickIndex !== -1) {
        direPicks[nextDirePickIndex] = "picking";
      }
    }

    // TODO: remove?
    const direBansCount = direBans.filter(Boolean).length;
    const direPicksCount = direPicks.filter(Boolean).length;

    console.table({
      "Draft Active Time Remaining": formatTime(DRAFT_ACTIVE_TIME_REMAINING),
      "Radiant Bonus Time": formatTime(RADIANT_BONUS_TIME),
      "Dire Bonus Time": formatTime(DIRE_BONUS_TIME),
      "Active Team": activeTeam,
      "Current Phase": phase,
      "Radiant State": radiantState,
      "Dire State": direState,

      "Radiant Picks": radiantPicks,
      "Dire Picks": direPicks,
      "Radiant Bans": radiantBans,
      "Dire Bans": direBans,
    });
  });
</script>

<!-- <main class="absolute bottom-0">
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
</main> -->
<!-- <pre>{RAW_DATA && JSON.stringify(JSON.parse(RAW_DATA), null, 2)}</pre> -->
<div class="relative h-screen w-screen">
  <div class="absolute bottom-0 w-full h-[500px] flex items-end">
    <div class="flex flex-row w-full px-3 pb-3">
      <div class="flex flex-row w-full">
        <div class="flex flex-col w-full">
          <div class="flex flex-row">
            <HeroPick2 />
            <HeroPick2 />
            <HeroPick2 />
            <HeroPick2 />
            <HeroPick2 />
          </div>
          <div class="flex flex-row bg-black">
            <HeroBans2 state="banning" />
            <HeroBans2 state="none" />
            <HeroBans2 />
            <HeroBans2 />
            <HeroBans2 />
            <HeroBans2 />
            <HeroBans2 />
          </div>
        </div>
        <CenterScreen2
          turn={activeTeam}
          activeteam_time_remaining={formatTime(DRAFT_ACTIVE_TIME_REMAINING)}
          radiant_bonus_time={formatTime(RADIANT_BONUS_TIME)}
          dire_bonus_time={formatTime(DIRE_BONUS_TIME)}
        />
        <div class="flex flex-col w-full">
          <div class="flex flex-row">
            <HeroPick2 state="picking" />
            <HeroPick2
              state="picked"
              filepath="videos/npc_dota_hero_ancient_apparition.webm"
            />
            <HeroPick2 />
            <HeroPick2 />
            <HeroPick2 />
          </div>
          <div class="flex flex-row">
            <HeroBans2 state="banning" />
            <HeroBans2 state="none" />
            <HeroBans2 />
            <HeroBans2 />
            <HeroBans2 />
            <HeroBans2 />
            <HeroBans2 />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
