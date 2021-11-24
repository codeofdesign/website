<script>
  import { onMount } from 'svelte'
  import { Router, Route } from 'svelte-routing'
  import Code from 'codeofdesign'

  // Components
  import AppHeader from './components/AppHeader.svelte'
  import AppFooter from './components/AppFooter.svelte'

  // Routes
  import Home from './pages/Home.svelte'
  import About from './pages/About.svelte'
  import Contribute from './pages/Contribute.svelte'
  import License from './pages/License.svelte'
  import Resources from './pages/Resources.svelte'

  let lang
  let content

  let url = ''

  /**
   *  Scroll
   */
  let hasScrolled = false

  const onScroll = ev => {
    const y = window.scrollY
    if (y > 50) {
      hasScrolled = true
      document.documentElement.style.setProperty('--color-active-bg', 'var(--color-light)')

    } else {
      hasScrolled = false
      document.documentElement.style.setProperty('--color-active-bg', 'var(--color-salmon)')
    }
  }

  onMount(() => {
    /*
    console.log(Code)
    const id = 'nb'
    setTimeout(async () => {
      const res = await import(`../public/versions/${id}.json`)
      console.log(res)
    }, 2000)
    */

    window.addEventListener('scroll', onScroll)
  })
</script>

<div class="root" class:scrolled={hasScrolled}>
  <Router url={url}>
    <AppHeader />

    <main>
      <Route path="about" component={About}/>
      <Route path="contribute" component={Contribute}/>
      <Route path="license" component={License}/>
      <Route path="resources" component={Resources}/>
      <Route path="/"><Home/></Route>
    </main>

    <AppFooter />
  </Router>
</div>

<style lang="scss">
  @use './assets/styles/main';
  @use './public/fonts/fk-raster-roman/blended';
  @use './public/fonts/public-sans';

  .root {
    transition: ease 0.15s background-color;
    background-color: var(--color-active-bg);

    &.scrolled {
      main {
        border-top-color: var(--color-dark);
      }
    }
  }

  main {
    position: relative;
    font-size: clamp(2rem, 4vw, 3rem);
    font-family: 'Public Sans', Helvetica, sans-serif;
    margin: 10rem 0;
    padding: 1rem;
    min-height: 200vh;
    background-color: inherit;
    border-top: solid 1px transparent;
    transition: ease 0.15s border-color;
  }

  :global(h1:first-child) {
    margin: 0;
  }

  :global(h1, h2, h3, h4, h5, h6, p, li) {
    line-height: 1.1em;
  }

  :global(a) {
    color: #f00;
  }
  :global(a:visited) {
    color: #E46F6F;
  }
</style>