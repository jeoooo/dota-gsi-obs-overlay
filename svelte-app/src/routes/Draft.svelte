<script>
  import CenterScreen2 from "../components/CenterScreen2.svelte";
  import HeroBans2 from "./../components/HeroBans2.svelte";
  import io from "socket.io-client";
  import HeroPick2 from "../components/HeroPick2.svelte";

  const socket = io("http://localhost:3001");

  let DRAFT_ACTIVE_TIME_REMAINING = "";
  let RADIANT_BONUS_TIME = "";
  let DIRE_BONUS_TIME = "";
  let RAW_DATA = "";
  let activeTeam = "";
  let phase = "";
  let radiantState = "";
  let direState = "";
  let radiantPicks = [];
  let direPicks = [];
  let radiantBans = [];
  let direBans = [];
  let DIRE_BANS = [];
  let RADIANT_BANS = [];
  let DIRE_PICKS = [];
  let RADIANT_PICKS = [];

  function formatTime(seconds) {
    if (isNaN(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  function logVariables() {
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
  }

  socket.on("newdata", (data) => {
    DRAFT_ACTIVE_TIME_REMAINING = data.draft.activeteam_time_remaining;
    RADIANT_BONUS_TIME = data.draft.radiant_bonus_time;
    DIRE_BONUS_TIME = data.draft.dire_bonus_time;
    RAW_DATA = JSON.stringify(data);

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
      } else {
        DIRE_BANS[i] = "black_image";
        direState = phase;
        direBans[i] = "none";
      }

      if (banDataRadiant) {
        RADIANT_BANS[i] = banDataRadiant;
        radiantState = banDataRadiant;
        radiantBans[i] = banDataRadiant;
      } else {
        RADIANT_BANS[i] = "black_image";
        radiantState = phase;
        radiantBans[i] = "none";
      }
    }

    if (activeTeam === "radiant" && phase === "banning") {
      const nextRadiantBanIndex = radiantBans.findIndex(
        (ban) => ban === "none"
      );
      if (nextRadiantBanIndex !== -1) {
        radiantBans[nextRadiantBanIndex] = "banning";
      }
    }

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
      } else if (direPicks[i] !== "picking") {
        DIRE_PICKS[i] = "dota2_logo_animated";
        direState = phase;
        direPicks[i] = "none";
      }

      if (pickDataRadiant) {
        RADIANT_PICKS[i] = pickDataRadiant;
        radiantState = pickDataRadiant;
        radiantPicks[i] = pickDataRadiant;
      } else if (radiantPicks[i] !== "picking") {
        RADIANT_PICKS[i] = "dota2_logo_animated";
        radiantState = phase;
        radiantPicks[i] = "none";
      }
    }

    if (activeTeam === "radiant" && phase === "picking") {
      const nextRadiantPickIndex = radiantPicks.findIndex(
        (pick) => pick === "none"
      );
      if (nextRadiantPickIndex !== -1) {
        radiantPicks[nextRadiantPickIndex] = "picking";
      }
    }

    if (activeTeam === "dire" && phase === "picking") {
      const nextDirePickIndex = direPicks.findIndex((pick) => pick === "none");
      if (nextDirePickIndex !== -1) {
        direPicks[nextDirePickIndex] = "picking";
      }
    }

    // logVariables();
  });
  // logVariables();
</script>

<div class="relative h-screen w-screen">
  <div class="absolute bottom-0 w-full h-[500px] flex items-end">
    <div class="flex flex-row w-full px-3 pb-3">
      <div class="flex flex-row w-full">
        <div class="flex flex-col w-full">
          <div class="flex flex-row">
            {#each radiantPicks as pick, index}
              <HeroPick2 hero_name={pick} key={index} />
            {/each}
          </div>
          <div class="flex flex-row bg-red-600">
            {#each radiantBans as ban, index}
              <HeroBans2 hero_name={ban} key={index} />
            {/each}
          </div>
        </div>
        <CenterScreen2
          turn={activeTeam}
          activeteam_time_remaining={formatTime(DRAFT_ACTIVE_TIME_REMAINING)}
          radiant_bonus_time={formatTime(RADIANT_BONUS_TIME)}
          dire_bonus_time={formatTime(DIRE_BONUS_TIME)}
        />
        <div class="flex flex-col w-full">
          <div class="flex flex-row-reverse">
            {#each direPicks as pick, index}
              <HeroPick2 hero_name={pick} pickIndex={index} />
            {/each}
          </div>
          <div class="flex flex-row-reverse bg-red-600">
            {#each direBans as ban, index}
              <HeroBans2 hero_name={ban} />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
