<script lang="ts">
  import { onMount } from "svelte";
  import { CIRCLE_RADIUS, appState } from "./state";
  import { circIn } from "svelte/easing";
  let mouse: HTMLDivElement;
  let circleActive = false;
  onMount(() => {
    appState.subscribe((value) => {
      if (value.mouseGlitching && mouse && !circleActive) {
        mouse.classList.add("glitchForever");
      } else if (value.mouseGlitching === false && mouse) {
        mouse.classList.remove("glitchForever");
      }
    });
  });

  let closestPointOutsideCircle: {x: number, y: number}|undefined = undefined;

  $: {
    if ($appState.mouseX && $appState.mouseY && $appState.circles.length > 0) {
      let closestCircle = $appState.circles[0];
      let closestCircleDistance =Math.sqrt(
        Math.pow($appState.mouseX - closestCircle.x, 2) +
          Math.pow($appState.mouseY - closestCircle.y, 2)
      );
      for (let i = 1; i < $appState.circles.length; i++) {
        const circle = $appState.circles[i];
        const distance = Math.sqrt(
          Math.pow($appState.mouseX - circle.x, 2) +
            Math.pow($appState.mouseY - circle.y, 2)
        );
        if (distance < closestCircleDistance) {

          closestCircle = circle;
          closestCircleDistance = distance;
        }
      }
      console.log(closestCircleDistance)
      if (closestCircleDistance < CIRCLE_RADIUS){
         closestPointOutsideCircle = {
          x: closestCircle.x + (CIRCLE_RADIUS * (closestCircle.x - $appState.mouseX)) / closestCircleDistance,
          y: closestCircle.y + (CIRCLE_RADIUS * (closestCircle.y - $appState.mouseY)) / closestCircleDistance,
        };
      }else{
        closestPointOutsideCircle = undefined;
      }
      if (closestCircleDistance < CIRCLE_RADIUS * 2 && mouse) {
        $appState.mouseGlitching = false;
        circleActive = true;
        mouse.style.setProperty("--glitch-scale",(30*(CIRCLE_RADIUS -(closestCircleDistance/2))/CIRCLE_RADIUS).toString());
        mouse.classList.add("superGlitchForever");
      } else {
        circleActive = false;
        mouse.classList.remove("superGlitchForever");
        mouse.style.removeProperty("--glitch-scale");
        // $appState.mouseGlitching = false;
      }
    }
  }
</script>

{#if $appState.mouseX && $appState.mouseY}
  <div
    bind:this={mouse}
    class:hidden={!$appState.mouseVisible}
    class=" h-7 aspect-square absolute -translate-x-1/3 -translate-y-1/3 z-50 pointer-events-none cursor-none"
    style={`left: ${closestPointOutsideCircle?.x??$appState.mouseX}px; top: ${closestPointOutsideCircle?.y??$appState.mouseY}px`}
  >
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 28 28"
      enable-background="new 0 0 28 28"
      xml:space="preserve"
      class="shadow-2xl"
    >
      <polygon
        fill="#FFFFFF"
        points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "
      />
      <polygon fill="#FFFFFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 " />
      <rect
        x="12.5"
        y="13.6"
        transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)"
        width="2"
        height="8"
      />
      <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 " />
    </svg>
  </div>
{/if}
