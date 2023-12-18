<script>
  export let filepath;
</script>

{#if filepath == "dota2_logo_animated" || filepath == "undefined"}
  <div class="w-auto">
    <div class="media-container">
      <video autoplay muted loop class=" w-[200px] h-[225px] object-fill">
        <!-- <source src="videos/npc_dota_hero_{hero_name}.webm" type="video/webm" /> -->
        <source src="assets/dota2_logo_animated.mp4" type="video/webm" />
      </video>
    </div>
  </div>
{:else}
  <div class="w-auto">
    <div class="media-container">
      <video autoplay muted loop class=" w-[200px] h-[225px] object-fill">
        <source src="videos/npc_dota_hero_{filepath}.webm" type="video/webm" />
        <!-- <source src="assets/dota2_logo_animated.mp4" type="video/webm" /> -->
      </video>
    </div>
  </div>
{/if}
