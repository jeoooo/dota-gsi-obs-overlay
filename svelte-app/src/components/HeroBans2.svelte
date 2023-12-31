<script>
  export let hero_name;
</script>

{#if hero_name == "banning" && hero_name != "none"}
  <div class="relative w-full h-full bg-red-600 animate-fade-in">
    <img class="h-[55px] w-full grayscale" src="" alt="" />
    <div class="absolute inset-0 bg-red-600 opacity-60"></div>
    <img
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[80%] h-[28px] pulse"
      src="assets/cross.png"
      alt="assets/cross.png"
    />
    <p
      class="banning-font absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center mb-[4px] text-white text-[10px] font-bold pulse"
    >
      BANNING
    </p>
  </div>
{/if}
{#if hero_name == "none" && hero_name != "banning"}
  <div class="relative w-full h-full bg-red-600 animate-fade-in">
    <img
      class="h-[55px] w-full grayscale"
      src="portraits/black_image.png"
      alt=""
    />
    <div class="absolute inset-0 bg-red-600 opacity-60"></div>
  </div>
{/if}

{#if hero_name != "none" && hero_name != "banning"}
  <div class="relative w-full h-full bg-red-600 animate-fade-in">
    <img
      class="h-[55px] w-full grayscale"
      src="portraits/{hero_name}.png"
      alt=""
    />
    <div class="absolute inset-0 bg-red-600 opacity-60"></div>
  </div>
{/if}

<style>
  /* Define the pulse animation */
  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
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
    animation: fadeIn 0.5s ease-in;
  }

  /* Apply the pulse animation to elements with the pulse class */
  .pulse {
    animation: pulse 2s infinite;
  }

  .banning-font {
    font-family: "Radiance_regular", sans-serif;
  }
</style>
