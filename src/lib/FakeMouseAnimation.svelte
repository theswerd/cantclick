<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";

    let mouse: HTMLDivElement;
    let x = tweened(300, {duration: 2000});
    let y = tweened(900, {duration: 2000});
    let visible = false;
    onMount(()=>{
        setInterval(()=>{
            x.set(Math.random()*window.innerWidth)
            y.set(Math.random()*window.innerHeight)
            visible = true;
        }, 2000)

    })

</script>
{#if visible}
<div
    bind:this={mouse}
    class="fixed h-8 aspect-square -translate-x-1/3 -translate-y-1/3 z-50 pointer-events-none cursor-none glitchForever"
    style={`left: ${$x}px; top: ${$y}px`}>
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