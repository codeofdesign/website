<script>
  import { Link } from 'svelte-routing'
  import Code from 'codeofdesign'
  import { lang } from '../store'

  export let content

  const links = [
    { id: 'about', to: 'about' },
    { id: 'contribute', to: 'contribute' },
    { id: 'license', to: 'license' },
    { id: 'resources', to: 'resources' },
  ]

  const versions = Code.versions.filter(v => v.complete).map(v => v.id)
</script>

<nav class="nav">
  {#if content}
    <ul class="nav-list">
      <li class="nav-item">
        <select bind:value={$lang}>
          {#each versions as ver}
            <option value={ver}>{ver.replace('_', '-')}</option>
          {/each}
        </select>
      </li>
      <hr>
      <li class="nav-item">
        <a href="/">{content.nav.list}</a> / <a href="/">{content.nav.read}</a>
      </li>
      <hr>

      {#each links as { to, id }}
        <li class="nav-item">
          <Link {to} class="link">{content.nav[id]}</Link>
        </li>
      {/each}
    </ul>
  {/if}
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

  select {
    appearance: none;
    padding: 0;
    margin: 0;
    display: inline-block;
    font-size: inherit;
    background: transparent;
    box-shadow: none;
    border: 0px;
    font-family: 'Public Sans', Helvetica, sans-serif;
    font-weight: 400;
    text-transform: lowercase;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    &:focus {
      outline: none;
      text-decoration: underline;
      cursor: auto;
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