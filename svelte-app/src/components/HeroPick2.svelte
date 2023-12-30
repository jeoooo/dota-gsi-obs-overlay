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

  let state = "none";
  export let filepath = "assets/dota2_logo_animated.mp4";
  let hueRotate;
  let isTurn;
  if (filepath == "none") {
    state = "none";
  }
</script>

{#if state == "none"}
  <div class="w-full h-full bg-black">
    <video
      autoplay
      muted
      loop
      class="w-146.74px] h-[219.57px] object-fill animate-fade-in grayscale"
      style="transition: filter 0.3s ease-in-out; z-index: 2;"
    >
      <source src="assets/dota2_logo_animated.mp4" type="video/webm" />
    </video>
  </div>
{:else if state == "picking" && isTurn == "radiant"}
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
{:else if state == "picking" && isTurn == "dire"}
  <div class="w-full h-full bg-black">
    <video
      autoplay
      muted
      loop
      class="w-146.74px] h-[219.57px] object-fill {hueRotate}"
      style="transition: filter 0.3s ease-in-out; z-index: 2;"
    >
      <source src={filepath} type="video/webm" />
    </video>
  </div>
{:else if state == "picked"}
  <div class="w-full h-full bg-black">
    <video
      autoplay
      muted
      loop
      class="w-146.74px] h-[219.57px] object-fill animate-fade-in"
      style="transition: filter 0.3s ease-in-out; z-index: 2;"
    >
      <source src={filepath} type="video/webm" />
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
