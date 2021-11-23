<script>
	import { onMount } from 'svelte'
	import Code from 'codeofdesign'

	import AppHeader from './components/AppHeader.svelte'
	import AppFooter from './components/AppFooter.svelte'

	let lang
	let content

	onMount(() => {
    console.log(Code)

		const id = 'nb'
    setTimeout(async () => {
      const res = await import(`../public/versions/${id}.json`)
      console.log(res)
    }, 2000)

		// translations = versions
		// 	.filter(f => f.metadata.complete)
		// 	.map(f => f.metadata.id)

		// detectedLang = getUserLanguage()
		// const translation = getTranslation(detectedLang)
		// content = translation.html
	})
</script>

<AppHeader />

<main>
</main>

<AppFooter />

<style lang="scss">
	@use './assets/styles/main';
  @use './public/fonts/fk-raster-roman/blended';
  @use './public/fonts/public-sans';

	main {
		font-size: clamp(2rem, 4vw, 3rem);
		font-family: 'Public Sans', Helvetica, sans-serif;
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