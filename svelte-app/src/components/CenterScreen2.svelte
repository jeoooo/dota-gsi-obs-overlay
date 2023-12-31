<script>
  export var activeteam_time_remaining = "0:00";
  export var radiant_bonus_time = "0:00";
  export var dire_bonus_time = "0:00";
  export var turn;
</script>

<div class="relative flex flex-col w-[1280px] bg-blue-300">
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div class="flex flex-row mb-12">
      {#if turn == "radiant"}
        <img class="h-14 scale-x-[-1]" src="assets/arrow.png" alt="" />
      {:else if turn == "dire"}
        <img
          class="h-14 scale-x-[-1] opacity-0"
          src="assets/arrow.png"
          alt=""
        />
      {/if}

      <p class="text-5xl activeteam_time_remaining text-black">
        {activeteam_time_remaining}
      </p>
      {#if turn == "dire"}
        <img class="h-14" src="assets/arrow.png" alt="" />
      {:else if turn == "radiant"}
        <img class="h-14 opacity-0" src="assets/arrow.png" alt="" />
      {/if}
    </div>
  </div>
  <div class="absolute bottom-0 w-full bg-orange-500">
    <div class="flex flex-row">
      <div class="w-full bg-emerald-400">
        <div class="flex flex-col pl-2">
          <p class="text-sm reserve_time text-black">RESERVE TIME</p>
          <p class="text-2xl reserve_time text-black">{radiant_bonus_time}</p>
        </div>
      </div>
      <div class="w-full bg-red-500">
        <div class="flex flex-col items-end pr-2">
          <p class="text-sm reserve_time text-black">RESERVE TIME</p>
          <p class="text-2xl reserve_time text-black">{dire_bonus_time}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .activeteam_time_remaining {
    font-family: "Radiance_bold", sans-serif;
  }
  .game_series {
    font-family: "Radiance_black", sans-serif;
  }
  .reserve_time {
    font-family: "Radiance_semibold", sans-serif;
  }
</style>
