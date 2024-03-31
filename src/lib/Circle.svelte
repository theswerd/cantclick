<script lang="ts">
  import { onDestroy } from "svelte";
  import app from "../main";
  import { appState } from "./state";
  import { scale } from "svelte/transition";

  export let angle: number;
  export let color: string;
  export let glitched: boolean;
  export let scaleOut: boolean;
  let circle: HTMLDivElement;
  $: radius = Math.min($appState.windowHeight, $appState.windowWidth) / 2 - 150;
  $: x = Math.cos(angle) * radius;
  $: y = Math.sin(angle) * radius;

  const id = Math.random().toString(36).substring(7);
  onDestroy(() => {
    appState.update((state) => {
      state.circles = state.circles.filter((circle) => circle.id !== id);
      return state;
    });
  });

  $: {
    if (circle) {
      const myCircle = $appState.circles.find((circle) => {
        return circle.id === id;
      });
      const circleStyle = getComputedStyle(circle);

      const circleX =
        parseFloat(circleStyle.left) + parseFloat(circleStyle.width) / 2;
      const circleY =
        parseFloat(circleStyle.top) + parseFloat(circleStyle.height) / 2;

      if (!myCircle || myCircle.x !== circleX || myCircle.y !== circleY) {
        appState.update((state) => {
          const index = state.circles.findIndex((circle) => circle.id === id);
          if (index !== -1) {
            state.circles[index].x = circleX;
            state.circles[index].y = circleY;
            return state;
          } else {
            state.circles.push({
              id,
              x: circleX,
              y: circleY,
            });
            return state;
          }
        });
      }
      //   const index = state.circles.findIndex((circle) => circle.id === id);
      //   if (index !== -1) {
      //     state.circles[index].x = circleX;
      //     state.circles[index].y = circleY;
      //     return state;
      //   } else {
      //     state.circles.push({
      //       id,
      //       x: circleX,
      //       y: circleY,
      //     });
      // return state;
      // appState.update((state) => {

      //   }
      // });
    }
  }
</script>

<div
  bind:this={circle}
  class:glitchForever={glitched}
  class:scaleOut={scaleOut}
  class="fixed rounded-full scaleIn"
  style={`background-color: ${color}; width: 80px; height: 80px; top: calc(50% - 40px + ${y}px); left: calc(50% - 40px + ${x}px);`}
></div>

<style>
  .scaleIn {
    animation: scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  @keyframes scaleIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

    .scaleOut
    {
        animation: scaleOut 1s linear !important ;
        animation-fill-mode: forwards;
    }

    @keyframes scaleOut
    {
        0%
        {
            transform: scale(1);
            opacity: 1;
        }
        100%
        {
            opacity: 0;
            transform: scale(0);
        }
    }
</style>
