<script>
  import { onMount, tick } from 'svelte'
  import { Router, Route } from 'svelte-routing'
  import { lang } from './store'
  import { remToPx } from './util/dom'

  // Components
  import AppHeader from './components/AppHeader.svelte'
  import AppFooter from './components/AppFooter.svelte'

  // Routes
  import Home from './pages/Home.svelte'
  import About from './pages/About.svelte'
  import Contribute from './pages/Contribute.svelte'
  import License from './pages/License.svelte'
  import Resources from './pages/Resources.svelte'

  let url = ''
  let content

  /**
   *  Scroll
   */
  let hasScrolled = false
  let header
  let headerEl
  let main
  let mainY

  const onScroll = ev => {
    const y = window.scrollY
    if (!hasScrolled && y > 50) {
      hasScrolled = true
      document.documentElement.style.setProperty('--color-active-bg', 'var(--color-light)')
    } else if (hasScrolled && y < 50) {
      hasScrolled = false
      document.documentElement.style.setProperty('--color-active-bg', 'var(--color-salmon)')
    }

    if (hasScrolled && mainY && y > mainY) {
      header.moveForward()
    } else {
      header.moveBack()
    }
  }

  const setHeaderTransition = () => {
    const { scrollY, innerWidth } = window
    const mainPos = main.getBoundingClientRect().top
    const headerHeight = innerWidth > 400
      ? remToPx(5.3)
      : remToPx(4.8)

    mainY = scrollY + mainPos - headerHeight
  }

  const loadContent = async () => {
    const id = $lang
    const res = await import(`./content/${id}.json`)
    content = res.default
    return Promise.resolve(res => res())
  }

  const handleChangeLocale = () => {
    loadContent()
  }

  $: { $lang; handleChangeLocale() }

  onMount(async () => {
    await loadContent()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', setHeaderTransition, { passive: true })
    await tick()
    setHeaderTransition()
  })
</script>

<div
  class="root"
  class:scrolled={hasScrolled}
>
  <Router url={url}>
    <AppHeader
      bind:header={headerEl}
      bind:this={header}
      {content}
    />

    <main bind:this={main}>
      <Route path="about" component={About}/>
      <Route path="contribute" component={Contribute}/>
      <Route path="license" component={License}/>
      <Route path="resources" component={Resources}/>
      <Route path="/"><Home {hasScrolled} /></Route>
    </main>

    <AppFooter {content} />
  </Router>
</div>

<style lang="scss">
  @use './assets/styles/main';
  @use './assets/styles/mixins' as *;
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

    @include until(medium) {
      main {
        border-top-color: var(--color-dark);
      }
    }
  }

  main {
    position: relative;
    font-family: 'Public Sans', Helvetica, sans-serif;
    margin: 5rem 0 0;
    padding: 0;
    min-height: 200vh;
    background-color: inherit;
    border-top: solid 1px transparent;
    transition: ease 0.15s border-color;

    @include from(medium) {
      margin: 10rem 0 0;
    }
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