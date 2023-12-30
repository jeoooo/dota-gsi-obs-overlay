<script>
  // export let hero_name;

  export let filepath = "portraits/slardar.png";

  /**
   *
   * algorithm must work as follows:
   *
   * 1. state none = set to black
   * 2. state banning = set to panning icon or smth
   * 3. state banned = set to the hero banned
   *
   */

  export let state;
</script>

{#if state == "none"}
  <div class="relative w-full h-full bg-red-600">
    <img
      class="h-[55px] w-full grayscale"
      src="portraits/black_image.png"
      alt=""
    />
    <div class="absolute inset-0 bg-red-700 opacity-60"></div>
  </div>
{:else if state == "banning"}
  <div class="relative w-full h-full bg-red-600">
    <img
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[55px] w-full grayscale pulse"
      src=""
      alt="ban"
      onerror="this.style.display='none'"
    />

    <div class="absolute inset-0 bg-red-600 opacity-60"></div>
    <img
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[80%] h-[28px] pulse"
      src="assets/cross.png"
      alt="portraits/black_image.png"
      srcset=""
    />
    <p
      class="banning-font absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center mb-[4px] text-white text-[10px] font-bold pulse"
    >
      BANNING
    </p>
  </div>
{:else}
  <div class="relative w-full h-full bg-red-600 animate-fade-in">
    <img class="h-[55px] w-full grayscale" src="portraits/wisp.png" alt="" />
    <div class="absolute inset-0 bg-red-700 opacity-60"></div>
  </div>
{/if}

<style>
  /* Define the pulse animation */
  @keyframes pulse {
    /* At the start of the animation, set the opacity to 0.5 */
    0% {
      opacity: 0.5;
    }
    /* At the halfway point of the animation, set the opacity to 0.5 */
    50% {
      opacity: 1;
    }
    /* At the end of the animation, set the opacity to 0.5 */
    100% {
      opacity: 0.5;
    }
  }
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

  /* Apply the pulse animation to elements with the pulse class */
  .pulse {
    /*
    Specify the name of the animation (pulse), the duration of the animation (2s), 
    and the animation iteration count (infinite to make the animation repeat indefinitely)
    */
    animation: pulse 2s infinite;
  }

  .banning-font {
    font-family: "Radiance_regular", sans-serif;
  }
</style>
