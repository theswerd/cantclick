<script lang="ts">
    import { onMount } from "svelte";
    let width: number, height: number;
    onMount(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        window.addEventListener("resize", () => {
            width = window.innerWidth;
            height = window.innerHeight;
        });
    });
</script>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white  w-full p-4">
    <p
      class=" w-full text-xl"
    >
     This window is too small, make it bigger.
    </p>
    <br />
    <p class="font-bold"> Trust me, its worth it</p>
    <p class="text-gray-300">Or don't <span class="glitchForever">🤷‍♂️</span></p>
  </div>