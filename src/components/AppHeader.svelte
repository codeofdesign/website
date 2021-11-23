<script>
  import Logo from './Logo.svelte'
  import AppNav from './AppNav.svelte'
</script>

<header class="header">
  <a href="/" class="header-logo">
    <Logo/>
  </a>
  <h2 class="header-intro">
    Design needs a code of ethics. This is a start—but we only know what we know. Our point of view is limited to our own experiences.
    This code belongs to you. Make it yours, make it great.
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

    &-intro {
      width: 70%;
      white-space: pre-line;
      line-height: 0.95em;
      text-indent: 2em;
    }
  }
</style>