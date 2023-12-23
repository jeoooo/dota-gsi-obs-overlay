<script>
  export var active_team_time_remaining = "0:00";
  export var radiant_bonus_time = "0:00";
  export var dire_bonus_time = "0:00";
</script>

<div class="relative w-[32%] bg-black border border-black">
  <div
    class="absolute left-1/2 top-[36%] transform -translate-x-1/2 -translate-y-[36%]"
  >
    <div class="flex flex-row justify-center">
      <i class="fa-solid fa-chevron-left h-20"></i>
      <p
        class="px-1 py-1 text-6xl activeteam_time_remaining text-white"
        id="activeteam_time_remaining"
      >
        {active_team_time_remaining}
      </p>
      <i class="fa-solid fa-chevron-right h-20"></i>
    </div>
  </div>
  <div class="absolute bottom-0 w-full h-10 mb-4">
    <div class="flex flex-row justify-center">
      <p
        class="text-xl px-12 py-2 bg-black text-white reserve_time"
        id="radiant_bonus_time"
      >
        {radiant_bonus_time}
      </p>
      <p class=" px-8 py-2 bg-white game_series">BO3</p>
      <p
        class="text-xl px-12 py-2 bg-black text-white reserve_time"
        id="dire_bonus_time"
      >
        {dire_bonus_time}
      </p>
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
