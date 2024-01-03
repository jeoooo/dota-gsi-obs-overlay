<script>
  import io from "socket.io-client";

  var RAW_DATA;
  var PLAYERS = [
    {
      name: "",
      hero: "",
      hero_stats: {},
      player_stats: {},
      hero_abilities: {},
      hero_items: {},
      net_worth: {},
      gpm: {},
      xpm: {},
      hero_damage: {},
      hero_healing: {},
    },
  ];
  const socket = io("http://localhost:3001"); // Replace with your server URL

  function formatTime(seconds) {
    seconds = Math.abs(seconds);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
    return formattedTime;
  }

  function formatHeroName(hero) {
    let parts = hero.split("_");
    parts.splice(0, 3);
    return parts.join("_");
  }

  function formatNumber(num) {
    return num.toLocaleString("en-US");
  }

  /**
   *
   * code for bottle interaction
   *
   * will specify filename for bottle especially if
   *
   * 1. it contains a specific rune
   * 2. bottle charges
   *
   */
  function getBottleImage(item) {
    let filename;
    if (item.contains_rune && item.contains_rune !== "empty") {
      filename = `assets/items/item_bottle_${item.contains_rune}.png`;
    } else {
      switch (item.charges) {
        case 3:
          filename = "assets/items/item_bottle.png";
          break;
        case 2:
          filename = "assets/items/item_bottle_2.png";
          break;
        case 1:
          filename = "assets/items/item_bottle_1.png";
          break;
        default:
          filename = "assets/items/item_bottle_empty.png";
      }
    }
    // console.log(filename);
    return filename;
  }

  function setItem(slot) {
    if (slot.name === "item_bottle") {
      return `assets/items/black_image.png`;
    }
    if (slot.name === "empty") {
      return `assets/items/black_image.png`;
    }

    if (slot.name === "item_bottle") {
      let filename;
      if (slot.contains_rune && slot.contains_rune !== "empty") {
        filename = `assets/items/item_bottle_${slot.contains_rune}.png`;
      } else {
        switch (slot.charges) {
          case 3:
            filename = "assets/items/item_bottle.png";
            break;
          case 2:
            filename = "assets/items/item_bottle_2.png";
            break;
          case 1:
            filename = "assets/items/item_bottle_1.png";
            break;
          default:
            filename = "assets/items/item_bottle_empty.png";
        }
      }
      return filename;
    } else {
      return `assets/items/${slot.name}.png`;
    }
  }
  const DOTA_RADIANT_PLAYER_COLORS = [
    "#3074F9",
    "#66FFC0",
    "#BD00B7",
    "#F8F50A",
    "#FF6901",
  ];
  const DOTA_DIRE_PLAYER_COLORS = [
    "#FF88C5",
    "#A2B349",
    "#63DAFA",
    "#01831F",
    "#9F6B00",
  ];

  socket.on("newdata", (data) => {
    RAW_DATA = JSON.stringify(data);
    // CLOCK_TIME = formatTime(data.map.clock_time);

    // Assuming players have unique IDs
    PLAYERS = [];

    for (let team = 2; team <= 3; team++) {
      const startPlayer = team === 2 ? 0 : 5;
      const endPlayer = team === 2 ? 4 : 9;

      for (let player = startPlayer; player <= endPlayer; player++) {
        const playerData = data.player[`team${team}`][`player${player}`];
        const heroData = data.hero[`team${team}`][`player${player}`];
        const abilitiesData = data.abilities[`team${team}`][`player${player}`];
        const itemsData = data.items[`team${team}`][`player${player}`];

        if (playerData && heroData) {
          PLAYERS.push({
            id: `${team}-${player}`, // Assuming players have unique IDs
            name: playerData.name,
            hero: heroData.name,
            hero_stats: heroData,
            player_stats: playerData,
            hero_items: itemsData,
            net_worth: playerData.net_worth,
            gpm: playerData.gpm,
            xpm: playerData.xpm,
            hero_damage: playerData.hero_damage,
            hero_healing: playerData.hero_healing,
          });
        }
      }
    }

    // console.log(PLAYERS[4].hero_items.slot0.name);
    // console.log(PLAYERS[4].hero_items.slot1.name);
    // console.log(PLAYERS[4].hero_items.slot2.name);
    // console.log(PLAYERS[4].hero_items.slot3.name);
    // console.log(PLAYERS[4].hero_items.slot4.name);
    // console.log(PLAYERS[4].hero_items.slot5.name);
    // console.log(PLAYERS[4].hero_items.neutral0.name);

    console.table(PLAYERS);
  });
</script>

<!-- TEAMS -->
<div class="flex flex-row justify-evenly border p-1 bg-blue-400">
  <div class="border border-red-400 w-full p-2 m-2">
    <div class="flex flex-row justify-start items-end">
      <img
        class="h-14 w-max bg-emerald-900"
        src="assets/Gladiators_2022_allmode.png"
        alt=""
        srcset=""
      />
      <p class="bg-emerald-400 ml-4">Gaimin Gladiators</p>
    </div>
  </div>
  <div class="border border-red-400 w-full p-2 m-2">
    <div class="flex flex-row-reverse justify-start items-end">
      <img
        class="h-14 w-max bg-rose-900"
        src="assets/Gladiators_2022_allmode.png"
        alt=""
        srcset=""
      />
      <p class="bg-rose-400 mr-4">Gaimin Gladiators</p>
    </div>
  </div>
</div>
<!-- SCOREBOARD -->
<div class="flex flex-row my-2">
  <!-- RADIANT SIDE -->

  <div class="flex flex-col w-full">
    {#each PLAYERS.splice(0, 5) as player (player.id)}
      <div class="flex flex-row my-1">
        <!-- hero portrait -->

        <div
          class="w-[256px] h-fill flex flex-row justify-end"
          style="background-color: {DOTA_RADIANT_PLAYER_COLORS[player.id]}"
        >
          <img
            class="pl-3 w-[256px]"
            src="/portraits/{formatHeroName(player.hero)}.png"
            alt=""
            srcset=""
          />
        </div>

        <!-- PLAYER NAME AND LEVEL -->
        <div class="flex flex-col w-[200px] ml-2 justify-center">
          <h1 class="font-bold">{player.name}</h1>
          <h1>
            LVL {player.hero_stats.level}
            {formatHeroName(player.hero).toUpperCase()}
          </h1>
        </div>
        <!-- NW AND CURRENT GOLD -->
        <div class="flex flex-row ml-2 justify-center">
          <div class="flex flex-col justify-center m-2">
            <h1>NW</h1>
            {formatNumber(player.net_worth)}
            <h1>Current Gold</h1>
            <h1>000,000</h1>
          </div>
          <!-- LAST HITS/DENIES  -->
          <div class="flex flex-col justify-center m-2">
            <h1>LH/D</h1>
            <h1>
              {player.player_stats.last_hits}/{player.player_stats.denies}
            </h1>
          </div>
        </div>
        <!-- GPM XPM -->
        <div class="flex flex-row ml-2 justify-center">
          <div class="flex flex-col justify-center m-2">
            <h1>GPM</h1>
            <h1>000,000</h1>
            <h1>XPM</h1>
            <h1>000,000</h1>
          </div>
        </div>
        <!-- items -->
        <div class="flex flex-row ml-2 justify-center">
          <div class="flex flex-col justify-center w-fit h-full">
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot0 && player.hero_items.slot0.name
                ? setItem(player.hero_items.slot0)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />

            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot3 && player.hero_items.slot3.name
                ? setItem(player.hero_items.slot3)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
          </div>
          <div class="flex flex-col justify-center w-fit h-full">
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot1 && player.hero_items.slot1.name
                ? setItem(player.hero_items.slot1)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot4 && player.hero_items.slot4.name
                ? setItem(player.hero_items.slot4)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
          </div>
          <div class="flex flex-col justify-center w-fit h-full">
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot2 && player.hero_items.slot2.name
                ? setItem(player.hero_items.slot2)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot5 && player.hero_items.slot5.name
                ? setItem(player.hero_items.slot5)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
          </div>
          <!-- neutral item -->
          <div class="flex flex-col justify-center self-center w-14 h-12 m-2">
            <img
              class="h-full w-full rounded-full bg-black object-cover"
              src={player.hero_items.neutral0 && player.hero_items.neutral0.name
                ? setItem(player.hero_items.neutral0)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- DIRE SIDE -->
  <div class="flex flex-col w-full">
    {#each PLAYERS.splice(0, 5) as player (player.id)}
      <div class="flex flex-row my-1">
        <!-- hero portrait -->

        <div
          class="w-[256px] h-fill flex flex-row justify-end"
          style="background-color: {DOTA_DIRE_PLAYER_COLORS[player.id]}"
        >
          <img
            class="pl-3 w-[256px]"
            src="/portraits/{formatHeroName(player.hero)}.png"
            alt=""
            srcset=""
          />
        </div>

        <!-- PLAYER NAME AND LEVEL -->
        <div class="flex flex-col w-[200px] ml-2 justify-center">
          <h1 class="font-bold">{player.name}</h1>
          <h1>
            LVL {player.hero_stats.level}
            {formatHeroName(player.hero).toUpperCase()}
          </h1>
        </div>
        <!-- NW AND CURRENT GOLD -->
        <div class="flex flex-row ml-2 justify-center">
          <div class="flex flex-col justify-center m-2">
            <h1>NW</h1>
            {formatNumber(player.net_worth)}
            <h1>Current Gold</h1>
            <h1>000,000</h1>
          </div>
          <!-- LAST HITS/DENIES  -->
          <div class="flex flex-col justify-center m-2">
            <h1>LH/D</h1>
            <h1>
              {player.player_stats.last_hits}/{player.player_stats.denies}
            </h1>
          </div>
        </div>
        <!-- GPM XPM -->
        <div class="flex flex-row ml-2 justify-center">
          <div class="flex flex-col justify-center m-2">
            <h1>GPM</h1>
            <h1>000,000</h1>
            <h1>XPM</h1>
            <h1>000,000</h1>
          </div>
        </div>
        <!-- items -->
        <div class="flex flex-row ml-2 justify-center">
          <div class="flex flex-col justify-center w-fit h-full">
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot0 && player.hero_items.slot0.name
                ? setItem(player.hero_items.slot0)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot3 && player.hero_items.slot3.name
                ? setItem(player.hero_items.slot3)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
          </div>
          <div class="flex flex-col justify-center w-fit h-full">
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot1 && player.hero_items.slot1.name
                ? setItem(player.hero_items.slot1)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot4 && player.hero_items.slot4.name
                ? setItem(player.hero_items.slot4)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
          </div>
          <div class="flex flex-col justify-center w-fit h-full">
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot2 && player.hero_items.slot2.name
                ? setItem(player.hero_items.slot2)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
            <img
              class="h-[64px] w-[88px] border bg-black"
              src={player.hero_items.slot5 && player.hero_items.slot5.name
                ? setItem(player.hero_items.slot5)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
          </div>
          <!-- neutral item -->
          <div class="flex flex-col justify-center self-center w-14 h-12 m-2">
            <img
              class="h-full w-full rounded-full bg-black object-cover"
              src={player.hero_items.neutral0 && player.hero_items.neutral0.name
                ? setItem(player.hero_items.neutral0)
                : `assets/items/black_image.png`}
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- <pre>{RAW_DATA && JSON.stringify(JSON.parse(RAW_DATA), null, 2)}</pre> -->

<style>
  .inner-shadow {
    box-shadow: inset 0 0 24px 10px #000000;
  }
</style>
