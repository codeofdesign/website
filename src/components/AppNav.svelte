<script>
  import { Link } from 'svelte-routing'

  const links = [
    { to: 'about', title: 'About' },
    { to: 'contribute', title: 'Contribute' },
    { to: 'license', title: 'License' },
    { to: 'resources', title: 'Resources' },
  ]
</script>

<nav class="nav">
  <ul class="nav-list">
    <li class="nav-item">English (US)</li>
    <hr>
    <li class="nav-item">
      <a href="/">List</a> / <a href="/">Read</a>
    </li>
    <hr>

    {#each links as { to, title }}
      <li class="nav-item">
        <Link {to} class="link">{title}</Link>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  .nav {
    hr {
      appearance: none;
      border: none;
      margin: 0.35rem 0;
    }
    &-list {

    }
    &-item {

    }
  }

  :global(.nav a) {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
</style>