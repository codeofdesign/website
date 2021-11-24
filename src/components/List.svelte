<script>
  import ListItem from './ListItem.svelte'

  export let mode = 'read'
  export let expanded = false
  export let content = []
</script>

<ol class="list">
  {#each content as item, index}
    <ListItem {item} {index} />
  {/each}
</ol>

<style lang="scss">
  .list {
    width: 100%;
    display: block;
  }
</style>
