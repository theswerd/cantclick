<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { CIRCLE_COUNT, appState } from "./state";
  import Circle from "./Circle.svelte";
  import FakeMouseAnimation from "./FakeMouseAnimation.svelte";
  let state: "first_intro" | "second_intro" | undefined | "game"|"game_over" =
    "first_intro";
  let secondIntro: HTMLParagraphElement;
let glitched = false;
let scaleOut = false;

let messages =[
    "Whats the hold up?",
    "You can't even do this?",
    "Come on, just put your mouse on one!"
]
  onMount(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    state = undefined;
    await new Promise((resolve) => setTimeout(resolve, 500));
    state = "second_intro";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    secondIntro.classList.add("glitch");
    $appState.mouseGlitching = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    $appState.mouseGlitching = false;
    state = undefined;
    await new Promise((resolve) => setTimeout(resolve, 500));
    state = "game";
    time = 20;
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        time-=1;
        if (time === 0) {
          clearInterval(interval);
          resolve(null);
        }
      }, 1000);
    });
    glitched = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    glitched = false;
    scaleOut = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    circles = [];
    state = "game_over";
    
  });

  let circles = Array.from({ length: CIRCLE_COUNT }, (_, i) => i);
  let time = 0;
  let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
</script>

<div
  transition:fade
  class=" relative w-screen h-screen flex items-center justify-center"
>
  <div class="text-center">
    {#if state === "first_intro"}
      <h1 class="text-3xl text-white" transition:fade>
        The game is simple, to start, put your mouse on a circle
      </h1>
    {:else if state === "second_intro"}
      <h1 class="text-2xl text-white" bind:this={secondIntro} transition:fade>
        Good luck <span class="glitchForever">😈</span>
      </h1>
    {:else if state === "game"}
      <div class="">
        <p class="text-white text-3xl" class:glitchForever={time<6} class:text-red-500={time<11 && time > 3} class:text-blue-500={time<=3 && time >0} class:text-green-500={time==0}>0:{(time.toString().length == 1?"0":"")+ time.toString()}</p>
        <p class="text-gray-400">{messages[
            Math.floor((time/20)*4)
        
        ]??"."}</p>


      </div>
      {#each circles as i}
        <Circle angle={(Math.PI * 2 * i) / CIRCLE_COUNT} color={colors[i]??"white"} {glitched} {scaleOut}/>
      {/each}
    {:else if state === "game_over"}
      
        <h1 class="text-3xl text-white" transition:fade>
            Wow, you're really bad at this. See ya <span class="glitchForever">👋</span>
        </h1>
        <FakeMouseAnimation/>
    {/if}
  </div>
</div>
