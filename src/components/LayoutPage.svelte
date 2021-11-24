<script>
  export let title
</script>

<div class="page">
  <div class="page-title">
    <h1 class="heading">{title}</h1>
  </div>
  <div class="page-content">
    <slot/>
  </div>
</div>

<style lang="scss">
  @use '../assets/styles/mixins';

  .page {
    @extend %col-grid;

    &-title {
      grid-column: 3 / span 9;

      .heading {
        font-size: 4rem;
      }
    }

    &-content {
      padding: 3rem 0;
      grid-column: 3 / span 20;
    }
  }
</style>