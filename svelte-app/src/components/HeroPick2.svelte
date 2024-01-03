<script>
  export let hero_name;
</script>

{#if hero_name == "picking" || hero_name == "none"}
  <div class="w-full h-full bg-black">
    <video
      autoplay
      muted
      loop
      class={`w-[146.74px] h-[219.57px] object-fill grayscale`}
      style="transition: filter 0.3s ease-in-out; z-index: 2;"
    >
      <source src="assets/dota2_logo_animated.mp4" type="video/webm" />
    </video>
  </div>
{/if}

{#if hero_name != "none" && hero_name != "picking"}
  <div class="w-full h-full bg-black">
    <video
      autoplay
      muted
      loop
      class="w-[146.74px] h-[219.57px] object-fill animate-fade-in"
      style="transition: filter 0.3s ease-in-out; z-index: 2;"
    >
      <source src="videos/npc_dota_hero_{hero_name}.webm" type="video/webm" />
    </video>
  </div>
{/if}

<style>
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-in; /* Adjust the duration to 0.5s for a faster animation */
  }
</style>
