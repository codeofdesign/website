<script>
  import { parseContent } from '../util/dom'
  export let content
</script>

<footer class="footer">
  <p class="footer-intro">
    {#if content}
      {@html parseContent(content.footer.intro, 'span')}
    {/if}
  </p>
</footer>

<style lang="scss">
  @use '../assets/styles/mixins' as *;

  .footer {
    @extend %col-grid;
    flex-direction: row;
    width: 100vw;
    height: auto;
    padding: 3rem 1rem;

    &-intro {
      grid-column: 3 / span 8;
      white-space: pre-line;
    }

    @include until(medium) {
      display: flex;
    }
  }

  :global(.footer .footer-intro span) {
    margin-bottom: 0.35rem;
    display: inline-block;
    text-indent: 2em;
  }
</style>