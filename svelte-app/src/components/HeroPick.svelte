<!-- HeroPick.svelte -->

<script>
  import e from "cors";

  export let filepath;
  export let hueRotate = "110deg";
  export let isTurn;
</script>

{#if filepath == "dota2_logo_animated" || filepath == "undefined"}
  <div class="w-auto">
    <div class="media-container bg-black" style="position: relative;">
      <video
        autoplay
        muted
        loop
        class="w-[200px] h-[256px] object-fill hue-rotate-[{hueRotate}] animate-fade-in-out {isTurn
          ? 'grayscale-0'
          : 'grayscale'}"
        style="transition: filter 0.3s ease-in-out; z-index: 1;"
      >
        <source src="assets/dota2_logo_animated.mp4" type="video/webm" />
      </video>
    </div>
  </div>
{:else}
  <div class="w-auto">
    <div class="media-container bg-black" style="position: relative;">
      <video
        autoplay
        muted
        loop
        class="w-[200px] h-[256px] object-fill animate-fade-in"
        style="transition: filter 0.3s ease-in-out; z-index: 2;"
      >
        <source
          src={`videos/npc_dota_hero_${filepath}.webm`}
          type="video/webm"
        />
      </video>
    </div>
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
