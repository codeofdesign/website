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
  @use '../assets/styles/mixins' as *;

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
      order: 1;
      grid-column: span 4;

      @include from(medium) {
        grid-column: span 3;
      }
      @include from(large) {
        grid-column: span 2;
      }
    }
    &-intro {
      order: 3;
      grid-column: span 24;
      width: 100%;
      white-space: pre-line;
      line-height: 0.95em;
      margin-top: 4rem;

      span {
        margin-bottom: 0.35rem;
        display: inline-block;
        text-indent: 2em;
      }

      @include from(medium) {
        order: 2;
        grid-column: span 12;
        max-width: 24rem;
        margin-top: 0;
      }

      @include from(large) {
        grid-column: span 10;
      }
    }
    &-nav {
      order: 2;
      grid-column: 13 / span 12;

      @include from(medium) {
        order: 3;
        grid-column: 16 / span 6;
      }
      @include from(large) {
        grid-column: 13 / span 6;
      }
    }
  }

  .header-shadow {
    display: block;
    width: 100%;
  }
</style>