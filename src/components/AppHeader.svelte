<script>
  import { onMount } from 'svelte'
  import { Link } from 'svelte-routing'
  import { remToPx } from '../util/dom'
  import Logo from './Logo.svelte'
  import AppNav from './AppNav.svelte'

  export let header = null

  let height
  let openHeight
  let shadow
  let fade
  let navEl

  let open = false
  let top = false

  export const moveForward = () => {
    if (!top) top = true
  }
  export const moveBack = () => {
    if (top) {
      onMouseleave()
      top = false
    }
  }

  const onResize = () => {
    const { innerWidth } = window

    if (innerWidth < 768) {
      openHeight = (navEl.offsetHeight + remToPx(2)) + 'px'
    }

    if (!top) height = header.offsetHeight + 'px'

    shadow.style.height = height
    fade.style.height = height
  }
  const onMouseenter = () => {
    open = true
    if (top && openHeight) header.style.height = openHeight
    else if (top) header.style.height = height
  }
  const onMouseleave = () => {
    open = false
    if (top) header.style = null
  }

  onMount(() => {
    onResize()
    window.addEventListener('resize', onResize, { passive: true })
  })
</script>

<span
  bind:this={shadow}
  class="header-shadow"
  aria-hidden="true"
/>

<header
  class="header"
  bind:this={header}
  class:top={top}
  class:open={top && open}
  on:mouseenter={onMouseenter}
  on:mouseleave={onMouseleave}
>
  <div class="header-logo">
    <Link to="/" title="Go to homepage"><Logo/></Link>
  </div>
  <h2 class="header-intro">
    <span>
      Design needs a code of ethics. This is a start—but we only know what we know. Our point of view is limited to our own experiences.
    </span>
    <span>
      This code belongs to you. Make it yours, make it great.
    </span>
  </h2>
  <div class="header-nav" bind:this={navEl}>
    <AppNav/>
  </div>
  <span class="header-fade" aria-hidden="true" bind:this={fade} />
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
    background-color: var(--color-active-bg);
    border-bottom: solid 1px transparent;
    transition: ease 0.15s background-color;

    &-logo {
      order: 1;
      grid-column: span 4;
      position: relative;
      z-index: 2;

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
      margin-top: 2rem;

      span {
        margin-bottom: 0.35rem;
        display: inline-block;
        text-indent: 2em;
      }

      @include from(small) {
        grid-column: 13 / span 12;
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
        grid-column: 17 / span 6;
      }
      @include from(large) {
        grid-column: 13 / span 6;
      }
    }

    &-fade {
      content: '';
      position: absolute;
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100%;
      height: 5.3rem;
      background-image: url('/img/gradient-salmon-long.png');
      background-size: auto 100%;
      background-repeat: repeat-x;
      backface-visibility: hidden;
      opacity: 0;
      transition: ease 0.3s opacity,
                  ease 0.15s background-image;
    }

    &.top {
      z-index: var(--z-header-hover);
      height: 4.8rem;
      overflow: hidden;
      border-color: var(--color-dark);
      transition: ease 0.15s background-color,
                  ease 0.3s height;

      .header-fade {
        opacity: 1;
      }

      &.open {
        .header-fade {
          opacity: 0;
        }
      }

      @include from(small) {
        height: 5.3rem;
      }
      @include from(medium) {
        .header-intro {
          display: block;
        }
      }
    }
  }

  .header-shadow {
    display: block;
    width: 100%;
  }

  :global(.scrolled .header .header-fade) {
    background-image: url('/img/gradient-light-long.png');
  }
</style>