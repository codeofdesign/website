<script>
  import { onMount } from 'svelte'
  import { Link } from 'svelte-routing'
  import Logo from './Logo.svelte'
  import AppNav from './AppNav.svelte'

  let header
  let shadow

  const onResize = () => {
    shadow.style.height = header.offsetHeight + 'px'
  }

  onMount(() => {
    onResize()
    window.addEventListener('resize', onResize, { passive: true })
  })
</script>

<span class="header-shadow" bind:this={shadow}/>

<header
  class="header"
  bind:this={header}
>
  <div class="header-logo">
    <Link to="/"><Logo/></Link>
  </div>
  <h2 class="header-intro">
    <span>
      Design needs a code of ethics. This is a start—but we only know what we know. Our point of view is limited to our own experiences.
    </span>
    <span>
      This code belongs to you. Make it yours, make it great.
    </span>
  </h2>
  <div class="header-nav">
    <AppNav/>
  </div>
</header>

<style lang="scss">
  @use '../assets/styles/mixins';

  .header {
    @extend %col-grid;
    flex-direction: row;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: auto;
    padding: 1rem;

    &-logo {
      grid-column: span 2;
    }
    &-intro {
      grid-column: span 10;
      width: 100%;
      max-width: 24rem;
      white-space: pre-line;
      line-height: 0.95em;

      span {
        margin-bottom: 0.35rem;
        display: inline-block;
        text-indent: 2em;
      }
    }
    &-nav {
      grid-column: 13 / span 6;
    }
  }

  .header-shadow {
    display: block;
    width: 100%;
  }
</style>