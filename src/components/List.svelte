<script>
  import ListItem from './ListItem.svelte'

  export let mode = 'read'
  export let content = []
</script>

<ol class="list">
  {#each content as item, index}
    <ListItem {item} {index} collapsed={index < 4} />
  {/each}
</ol>

<style lang="scss">
  .list {
    width: 100%;
    display: block;
  }
</style>
