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

	onMount(() => {
    console.log(Code)

		const id = 'nb'
    setTimeout(async () => {
      const res = await import(`../public/versions/${id}.json`)
      console.log(res)
    }, 2000)
	})
</script>

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

<style lang="scss">
	@use './assets/styles/main';
  @use './public/fonts/fk-raster-roman/blended';
  @use './public/fonts/public-sans';

	main {
		font-size: clamp(2rem, 4vw, 3rem);
		font-family: 'Public Sans', Helvetica, sans-serif;
    padding: 5rem 1rem;
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