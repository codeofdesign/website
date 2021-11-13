<script>
	import { onMount } from 'svelte'
	import translations from 'codeofdesign'

	let content

	// @TODO: use 'metadata?'

	onMount(() => {
		const translation = translations.find(t => t.id === 'en_US')
		content = translation.content.html
	})
</script>

<main>
	<h2>Code of Design:</h2>
	{@html content}
</main>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');

	main {
		font-size: clamp(2rem, 4vw, 3rem);
		font-family: 'Inter', sans-serif;
	}

	h2 {
		font-size: 1em;
		margin-top: 0;
	}

	:global(h1:first-of-type) {
		margin: 0.5em 0;
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