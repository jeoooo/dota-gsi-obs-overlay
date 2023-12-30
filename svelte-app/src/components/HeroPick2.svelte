<!-- HeroPick.svelte -->

<script>
  import e from "cors";
  import HeroPick from "./HeroPick.svelte";

  /**
   *
   * algorithm must work as follows:
   *
   * state == none = show grayscale dota 2 logo
   * state == picking = no grayscale dota 2 logo
   * state == picked = show hero
   *
   *
   */

  export let hero_name;
  let filename =
    hero_name !== "none" && hero_name !== "banning"
      ? ``
      : `assets/dota2_logo_animated.mp4`;
  let filepath = `videos/npc_dota_hero_${filename}.webm`;
  var hueRotate;
</script>

{#if hero_name == "none"}
  <div class="w-full h-full bg-black">
    <video
      autoplay
      muted
      loop
      class="w-146.74px] h-[219.57px] object-fill animate-fade-in grayscale"
      style="transition: filter 0.3s ease-in-out; z-index: 2;"
    >
      <source src={"assets/dota2_logo_animated.mp4"} type="video/webm" />
    </video>
  </div>
{:else if hero_name == "picking"}
  <div class="w-full h-full bg-black">
    <video
      autoplay
      muted
      loop
      class="w-146.74px] h-[219.57px] object-fill {hueRotate}"
      style="transition: filter 0.3s ease-in-out; z-index: 2;"
    >
      <source src={filepath} type="video/webm" />
      <!-- <source src="assets/dota2_logo_animated.mp4" type="video/webm" /> -->
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
