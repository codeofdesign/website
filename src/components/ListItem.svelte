<script>
  import { onMount } from 'svelte'

  export let item
  export let index

  onMount(() => {
    console.log(item)
  })
</script>

<li class="list-item">
  <h3 class="title">{item.title}</h3>
  <div class="body">
    {item.body}
  </div>
</li>

<style lang="scss">
  @use '../assets/styles/mixins' as *;

  .list-item {
    @extend %col-grid;
    margin-bottom: 2rem;
    padding: 0 1rem 2rem;
    border-bottom: solid 1px var(--color-dark);
    counter-increment: item;

    &::before {
      content: counter(item);
      font-feature-settings: 'tnum' on, 'lnum' on;
    }

    .title {
      font-family: 'FK Raster Roman Blended';
      font-size: 3.25rem;
      margin: 2rem 0;
      @include from(medium) {
        font-size: 4rem;
        margin: 0 0 2rem;
        grid-column: 4 / span 20;
      }
      @include from(large) {
        grid-column: 3 / span 8;
      }
    }
    .body {
      grid-column: span 12;
      line-height: 1em;
      letter-spacing: 0.03em;
      text-indent: 2em;
      white-space: pre-line;

      @include from(medium) {
        grid-column: 4 / span 20;
      }
      @include from(large) {
        grid-column: 13 / span 10;
      }
    }

    @include until(medium) {
      display: flex;
      flex-direction: column;
    }
  }
</style>
