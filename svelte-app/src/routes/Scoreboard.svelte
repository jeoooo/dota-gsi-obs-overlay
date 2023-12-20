<script>
  import HeroItems from "./HeroItems.svelte";

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

  socket.on("newdata", (data) => {
    RAW_DATA = JSON.stringify(data);
    // CLOCK_TIME = formatTime(data.map.clock_time);
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
            name: playerData.name,
            hero: heroData.name,
            hero_stats: heroData,
            player_stats: playerData,
            // hero_abilities: abilitiesData,
            hero_items: itemsData,
            net_worth: playerData.net_worth,
            gpm: playerData.gpm,
            xpm: playerData.xpm,
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

  function formatNumber(num) {
    return num.toLocaleString("en-US");
  }
</script>

{#if PLAYERS[7] && PLAYERS[7].hero_items && PLAYERS[7].hero_items.slot0}
  <div class="flex flex-col border border-rose-500">
    <div class="flex bg-red-300 items-center justify-evenly">
      <div class="flex w-full bg-orange-300">Team 1</div>
      <div class="flex w-full bg-orange-300">Team 2</div>
    </div>
    <div class="flex justify-evenly">
      <!-- radiant hero -->
      <div class="flex flex-row justify-start m-3 items-center">
        <!-- items -->
        <HeroItems
          item0={`assets/items/${PLAYERS[7].hero_items.slot0.name}.png`}
          item1={`assets/items/${PLAYERS[7].hero_items.slot1.name}.png`}
          item2={`assets/items/${PLAYERS[7].hero_items.slot2.name}.png`}
          item3={`assets/items/${PLAYERS[7].hero_items.slot3.name}.png`}
          item4={`assets/items/${PLAYERS[7].hero_items.slot4.name}.png`}
          item5={`assets/items/${PLAYERS[7].hero_items.slot5.name}.png`}
          neutral_item={`assets/items/${PLAYERS[7].hero_items.neutral0.name}.png`}
        />
        <div class="flex w-max px-4">
          <div class="flex flex-row w-fit h-fit ml-4 items-center">
            <div
              class="flex flex-col h-fit w-fill text-white px-3 justify-center"
            >
              <div class="inline-flex bg-slate-700">NETWORTH</div>
              <div class="bg-slate-700">
                {formatNumber(PLAYERS[7].net_worth)}
              </div>
              <div class="bg-slate-700 flex flex-row">
                <div class="flex flex-col m-2">
                  <p>gpm</p>
                  <p>{formatNumber(PLAYERS[7].gpm)}</p>
                </div>
                <div class="flex flex-col m-2">
                  <p>xpm</p>
                  <p>{formatNumber(PLAYERS[7].xpm)}</p>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col h-fit w-fill text-white px-2 py-2 justify-center"
            >
              <div class="inline-flex bg-slate-700">HERO DAMAGE</div>
              <div class="bg-slate-700">123,456</div>
              <div class=" bg-slate-700">HERO HEALING</div>
              <div class="bg-slate-700">123,456</div>
            </div>
            <div
              class="flex flex-col h-fit w-fill text-white px-2 py-2 justify-center"
            >
              <div class="inline-flex bg-slate-700">K/D/A</div>
              <div class="bg-slate-700">1/2/3</div>
              <div class="inline-flex bg-slate-700">LH / D</div>
              <div class="bg-slate-700">123,456</div>
            </div>
            <div
              class="flex flex-col h-fit w-fill text-white px-2 py-2 justify-center"
            >
              <div class="bg-slate-700">player_name</div>
              <div class="bg-slate-700">hero_name</div>
            </div>
          </div>
        </div>
        <div class="flex flex-row h-fit w-fit">
          <img class="h-20 w-full" src="portraits/luna.png" alt="" srcset="" />
          <div class="bg-red-600 w-2"></div>
        </div>
      </div>
      <div class="flex justify-evenly">
        <!-- dire hero -->
        <div class="flex flex-row w-full justify-start m-3 items-center">
          <div class="flex flex-row h-fit w-fit">
            <div class="bg-teal-600 w-2"></div>
            <img
              class="h-20 w-full"
              src="portraits/tusk.png"
              alt=""
              srcset=""
            />
          </div>

          <div class="flex w-max px-4">
            <div class="flex flex-row w-fit h-fit mr-4 items-center">
              <!-- player data -->
              <div
                class="flex flex-col h-fit w-fill text-white px-2 py-2 justify-center"
              >
                <div class="bg-slate-700">player_name</div>
                <div class="bg-slate-700">hero_name</div>
              </div>
              <!-- kda lhd -->
              <div
                class="flex flex-col h-fit w-fill text-white px-2 py-2 justify-center"
              >
                <div class="inline-flex bg-slate-700">K/D/A</div>
                <div class="bg-slate-700">1/2/3</div>
                <div class="inline-flex bg-slate-700">LH / D</div>
                <div class="bg-slate-700">123,456</div>
              </div>

              <!-- hero dmg/healing -->
              <div
                class="flex flex-col h-fit w-fill text-white px-2 py-2 justify-center"
              >
                <div class="inline-flex bg-slate-700">HERO DAMAGE</div>
                <div class="bg-slate-700">123,456</div>
                <div class="inline-flex bg-slate-700">HERO HEALING</div>
                <div class="bg-slate-700">123,456</div>
              </div>
              <!-- nw gpm xpm -->
              <div
                class="flex flex-col h-fit w-fill text-white px-3 justify-center"
              >
                <div class="inline-flex bg-slate-700">NETWORTH</div>
                <div class="bg-slate-700">123,456</div>
                <div class="bg-slate-700 flex flex-row">
                  <div class="flex flex-col m-2">
                    <p>gpm</p>
                    <p>999</p>
                  </div>
                  <div class="flex flex-col m-2">
                    <p>xpm</p>
                    <p>999</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- items -->
          <HeroItems isRadiant={false} />
        </div>
      </div>
    </div>

    <!-- center me-->
  </div>
{/if}
<!-- <pre>{RAW_DATA && JSON.stringify(JSON.parse(RAW_DATA), null, 2)}</pre> -->
