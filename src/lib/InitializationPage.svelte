<script lang="ts">
  import { appState } from "./state";

  $: useWidth = $appState.windowWidth < $appState.windowHeight;
  let centerEntered = false;
  let centerHitBox: HTMLParagraphElement;
  $: {
    if (centerEntered) {
      // play opening animation
      const center: HTMLDivElement = document.getElementById(
        "center"
      ) as unknown as HTMLDivElement;
      const centerText: HTMLParagraphElement = document.getElementById(
        "centerText"
      ) as unknown as HTMLParagraphElement;
      centerText.classList.add("zoomWayIn");

      center.classList.add("zoomWayOut");
    }
  }
</script>

<div class="h-screen w-screen flex items-center justify-center p-16">
  <div
    id="center"
    class="!aspect-square rounded-full border-white border-2 flex justify-center items-center"
    class:w-full={useWidth}
    class:h-full={!useWidth}
  >
    <p
      bind:this={centerHitBox}
      id="centerText"
      class="text-white rounded-full aspect-square text-center flex items-center transition-all"
      on:mouseenter={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      
          centerEntered = true;
          $appState.mouseGlitching = true;
          setTimeout(() => {
            $appState.mouseGlitching = false;
          }, 2000);
        //   wait 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));
          $appState.state = "game"

          
        
      }}
    >
      Place your mouse in the center to begin.
    </p>
  </div>
</div>

<style>
  :global(.zoomWayOut) {
    animation: zoomWayOut 6s linear;
    animation-fill-mode: forwards;
  }
  :global(.zoomWayIn) {
    animation: zoomWayIn 3s linear;
    animation-fill-mode: forwards;
  }
  @keyframes zoomWayIn {
    0% {
      transform: scale(1);
    }
    99% {
      transform: scale(0.01);
      opacity: 1;
    }
    100% {
      transform: scale(0.01);
      opacity: 0;
    }
  
  }
  @keyframes zoomWayOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(5);
    }
  }
</style>
