<script>
  import io from "socket.io-client";

  var RAW_DATA;

  const socket = io("http://localhost:3001"); // Replace with your server URL

  var PLAYER_NAMES = [];
  var HERO_NAMES = [];
  var CLOCK_TIME;

  const players = [];
  function formatTime(seconds) {
    seconds = Math.abs(seconds);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
    return formattedTime;
  }

  socket.on("newdata", (data) => {
    RAW_DATA = JSON.stringify(data);
    CLOCK_TIME = formatTime(data.map.clock_time);

    const players = [];

    for (let team = 2; team <= 3; team++) {
      const startPlayer = team === 2 ? 0 : 5;
      const endPlayer = team === 2 ? 4 : 9;

      for (let player = startPlayer; player <= endPlayer; player++) {
        const playerData = data.player[`team${team}`][`player${player}`];
        const heroData = data.hero[`team${team}`][`player${player}`];
        const abilitiesData = data.abilities[`team${team}`][`player${player}`];
        const itemsData = data.items[`team${team}`][`player${player}`];

        if (playerData && heroData) {
          players.push({
            name: playerData.name,
            hero: heroData.name,
            hero_stats: heroData,
            player_stats: playerData,
            hero_abilities: abilitiesData,
            hero_items: itemsData,
          });
        }
      }
    }

    // console.table(players);
    console.log(players[5]);
  });
</script>

<pre>{RAW_DATA && JSON.stringify(JSON.parse(RAW_DATA), null, 2)}</pre>
