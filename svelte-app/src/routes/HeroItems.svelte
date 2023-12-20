<script>
  export var item0, item1, item2, item3, item4, item5, neutral_item;
  export var isRadiant = true;
</script>

<div class="flex flex-row w-[35%]">
  <div class="flex flex-col w-20 bg-black">
    <div class="w-fill">
      <img
        class="h-14 w-20"
        src={item0 || "portraits/black_image.png"}
        alt=""
        srcset=""
      />
    </div>
    <div class="w-32">
      <img
        class="h-14 w-20"
        src={item3 || "portraits/black_image.png"}
        alt=""
        srcset=""
      />
    </div>
  </div>
  <div class="flex flex-col w-20 bg-black">
    <div class="w-32">
      <img
        class="h-14 w-20"
        src={item1 || "portraits/black_image.png"}
        alt=""
        srcset=""
      />
    </div>
    <div class="w-32">
      <img
        class="h-14 w-20"
        src={item4 || "portraits/black_image.png"}
        alt=""
        srcset=""
      />
    </div>
  </div>
  <div class="flex flex-col w-20 bg-black">
    <div class="w-">
      <img
        class="h-14 w-20"
        src={item2 || "portraits/black_image.png"}
        alt=""
        srcset=""
      />
    </div>
    <div class="w-32">
      <img
        class="h-14 w-20"
        src={item5 || "portraits/black_image.png"}
        alt=""
        srcset=""
      />
    </div>
  </div>
  <div class="flex flex-col ml-2 justify-center">
    <div class="w-14">
      <img
        class="h-14 w-14 bg-black rounded-full object-cover border-2"
        src={neutral_item || "portraits/black_image.png"}
        alt=""
        srcset=""
      />
    </div>
  </div>
</div>

<!-- 
{#if isRadiant}
  <div class="flex flex-row w-fill h-fit">
    <div class="flex flex-col justify-center bg-black ml-3">
      <div class="w-max">
        <img
          class="h-14"
          src={item0 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
      <div class="w-max">
        <img
          class="h-14"
          src={item3 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div class=" w-max">
        <img
          class="h-14"
          src={item1 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
      <div class="w-max">
        <img
          class="h-14"
          src={item4 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div class="  w-max">
        <img
          class="h-14"
          src={item2 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
      <div class=" w-max">
        <img
          class="h-14"
          src={item5 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="flex flex-col ml-2 mr-2 justify-center">
      <div class="w-14">
        <img
          class="h-14 rounded-full border-2"
          src={neutral_item || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
{:else}
  <div class="flex flex-row w-fill h-fit">
    <div class="flex flex-col ml-2 mr-2 justify-center">
      <div class="w-14">
        <img
          class="h-14 rounded-full border-2"
          src={neutral_item || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div class="w-max">
        <img
          class="h-14"
          src={item0 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
      <div class="w-max">
        <img
          class="h-14"
          src={item1 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div class="w-max">
        <img
          class="h-14"
          src={item2 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
      <div class="w-max">
        <img
          class="h-14"
          src={item3 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div class="w-max">
        <img
          class="h-14"
          src={item4 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
      <div class="w-max">
        <img
          class="h-14"
          src={item5 || "portraits/black_image.png"}
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
{/if} -->
