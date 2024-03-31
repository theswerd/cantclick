<script lang="ts">
  import { onMount } from "svelte";
  import FakeMouse from "./lib/FakeMouse.svelte";
  import Bottom from "./lib/Bottom.svelte";
  import Mobile from "./lib/Mobile.svelte";
  import WindowToSmall from "./lib/WindowToSmall.svelte";
  import { appState } from "./lib/state";
  import InitializationPage from "./lib/InitializationPage.svelte";
  import Game from "./lib/Game.svelte";
  // let state: "waiting" | "window_to_small" | "mobile" = "waiting";

  // onMount(() => {

  // });
</script>

<div class="text-lg !w-screen !h-screen bg-black !cursor-none overflow-hidden">
  {#if $appState.state === "mobile"}
    <Mobile />
  {:else if $appState.state === "window_to_small"}
    <WindowToSmall />
  {:else if $appState.state === "waiting"}
    <InitializationPage />
  {:else if $appState.state === "game"}
    <Game />
  {/if}
  <!-- {#if state === "active"}
    <button
      class="bg-white text-black p-2 rounded-lg"
      on:click={() => (state = "waiting")}
    >
      Stop
    </button>
  {/if} -->
  <!-- <p>
    Hello
  </p> -->
  <FakeMouse />
  <Bottom />
</div>

<style>
  :global(:root) {
    --glitch-scale: 1;
  }

  :global(.superGlitchForever) {
    display: inline-block;
    animation: superGlitch infinite 0.2s linear;
  }
  
  :global(.glitchForever) {
    display: inline-block;
    animation: glitch infinite 1s linear both !important;
  }

  :global(.glitch) {
    display: inline-block;
    animation: glitch 1s linear;
  }
  /* filter: sepia(100%) hue-rotate(190deg) saturate(500%);
 */

  @keyframes superGlitch {
    0% {
      opacity: 50%;
      /* red tint */
      
      translate: calc(3px * var(--glitch-scale)) calc(-3px * var(--glitch-scale));
    }
    9% {
      translate: calc(3px * var(--glitch-scale)) calc(-3px * var(--glitch-scale));
    }
    10% {
      translate: calc(7px * var(--glitch-scale)) calc(-1px * var(--glitch-scale));
    }
    19% {
      translate: calc(7px * var(--glitch-scale)) calc(-1px * var(--glitch-scale));
    }
    20% {
      translate: calc(-5px * var(--glitch-scale)) calc(5px * var(--glitch-scale));
    }
    29% {
      translate: calc(-5px * var(--glitch-scale)) calc(5px * var(--glitch-scale));
    }
    30% {
      translate: calc(5px * var(--glitch-scale)) calc(-7px * var(--glitch-scale));
    }
    39% {
      translate: calc(5px * var(--glitch-scale)) calc(-7px * var(--glitch-scale));
    }
    40% {
      translate: calc(-8px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }
    49% {
      translate: calc(-8px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }
    50% {
      translate: calc(-3px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }
    59% {
      translate: calc(-3px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }
    60% {
      translate: calc(7px * var(--glitch-scale)) calc(-1px * var(--glitch-scale));
    }
    69% {
      translate: calc(7px * var(--glitch-scale)) calc(-1px * var(--glitch-scale));
    }
    70% {
      translate: calc(-5px * var(--glitch-scale)) calc(5px * var(--glitch-scale));
    }
    79% {
      translate: calc(-5px * var(--glitch-scale)) calc(5px * var(--glitch-scale));
    }
    80% {
      translate: calc(5px * var(--glitch-scale)) calc(-7px * var(--glitch-scale));
    }
    89% {
      translate: calc(5px * var(--glitch-scale)) calc(-7px * var(--glitch-scale));
    }
    90% {
      translate: calc(-8px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }
    99% {
      translate: calc(-8px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }
    100% {
      translate: calc(-3px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }

  }

  @keyframes glitch {
    0% {
      translate: 0px;
    }
    49% {
      translate: 0px;
      filter: hue-rotate(0deg) saturate(100%);
    }
    50% {
      filter: hue-rotate(190deg) saturate(500%);
    }
    59% {
      translate: 0px;
      filter: hue-rotate(190deg) saturate(500%);
    }
    60% {
      /* translate: 5px -7px; */
      translate: calc(5px * var(--glitch-scale)) calc(-7px * var(--glitch-scale));
      filter: hue-rotate(270deg) saturate(500%);
    }
    69% {
      translate: calc(5px * var(--glitch-scale)) calc(-7px * var(--glitch-scale));
      filter: hue-rotate(270deg) saturate(500%);
    }
    70% {
      translate: 0px;
      filter: sepia(100%) hue-rotate(190deg) saturate(500%);
    }
    79% {
      translate: 0px;
      filter: sepia(100%) hue-rotate(190deg) saturate(500%);
    }
    80% {
      /* translate: -8px 3px; */
      translate: calc(-8px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }

    89% {
      /* translate: -8px 3px; */
      translate: calc(-8px * var(--glitch-scale)) calc(3px * var(--glitch-scale));
    }
    90% {
      translate: 0px;
    }

    99% {
      translate: 0px;
    }
    100% {
      filter: hue-rotate(190deg) saturate(500%);
      /* translate: -4px -4px; */
      translate: calc(-4px * var(--glitch-scale)) calc(-4px * var(--glitch-scale));
    }
  }
</style>
