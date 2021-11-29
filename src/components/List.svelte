<script>
  import ListItem from './ListItem.svelte'

  export let mode = 'read'
  export let content = []

  const collapsedAmount = 4
</script>

<ol class="list">
  {#each content as item, index}
    <ListItem {item} {index} collapsed={index < collapsedAmount} />
  {/each}
</ol>

<style lang="scss">
  .list {
    width: 100%;
    display: block;
  }
</style>
