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
<!-- <div class="flex flex-row justify-evenly border p-1 bg-blue-400">
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
</div> -->

<img
  class="absolute -z-10 opacity-75
"
  src="assets/sample_image.png"
  alt=""
  srcset=""
/>

<!-- SCOREBOARD -->
<div class="flex flex-row w-fit h-fit bg-violet-200">
  <div class="flex flex-col">
    <video
      autoplay
      muted
      loop
      class="w-[146.74px] h-[219.57px] object-fill animate-fade-in"
      style="transition: filter 0.3s ease-in-out; z-index: 2;"
    >
      <source src="videos/npc_dota_hero_visage.webm" type="video/webm" />
    </video>
    <p>player name</p>
    <p>player lvl hero name</p>
    <div class="bg-red-600 w-full h-4"></div>
    <div class="bg-blue-600 w-full h-4"></div>
  </div>
</div>

<!-- <pre>{RAW_DATA && JSON.stringify(JSON.parse(RAW_DATA), null, 2)}</pre> -->

<style>
  .inner-shadow {
    box-shadow: inset 0 0 24px 10px #000000;
  }
</style>
