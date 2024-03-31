<script lang="ts">
  let website: HTMLAnchorElement;
  let email: HTMLAnchorElement;
</script>

<div class="fixed bottom-4 w-full text-center text-white z-30">
  <a
    class=" text-blue-100 cursor-none"
    bind:this={website}
    on:mouseenter={() => {
      website.classList.add("glitch");
    }}
    on:mouseleave={() => {
      website.classList.remove("glitch");
    }}
    href="https://swerdlow.dev">swerdlow.dev</a
  >
  |
  <a
    bind:this={email}
    on:mouseenter={() => {
      email.classList.add("glitch");
    }}
    on:mouseleave={() => {
      email.classList.remove("glitch");
    }}
    class=" cursor-none hover:glitch  text-purple-100"


    href="mailto:bas@uchicago.edu ">bas@uchicago.edu</a
  >
</div>
