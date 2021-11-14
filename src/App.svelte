<script>
	import { onMount } from 'svelte'
	import versions from 'codeofdesign'

	let content
	let lang
	let detectedLang
	let translations = []

	const getTranslation = id => {
		lang = id
		return versions.find(t => t.metadata.id === id) || false
	}

	const handleChange = () => {
		if (lang === 'contribute') {
			window.open('https://github.com/codeofdesign/code#contributing')
			lang = detectedLang
		}
		content = getTranslation(lang).html
	}

	const getUserLanguage = () => {
		// Not very smart way of detecting. @TODO: make something better
		let loc = 'en_US'

		try {
			let userLangs = window.navigator.languages
			loc = userLangs.find(l => {
				return translations.find(t => t === l)
			})
		} catch (e) {
			console.error(e)
		} finally {
			return loc
		}
	}

	onMount(() => {
		translations = versions
			.filter(f => f.metadata.complete)
			.map(f => f.metadata.id)

		detectedLang = getUserLanguage()
		const translation = getTranslation(detectedLang)
		content = translation.html
	})
</script>

<main>
	<select bind:value={lang} on:change={handleChange}>
		{#each versions.filter(v => v.metadata.complete) as opt}
			<option value={opt.metadata.id}>{opt.metadata.name}</option>
		{/each}
		<option disabled>---</option>
		<option value="contribute">Add translation</option>
	</select>

	{@html content}
</main>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');

	main {
		font-size: clamp(2rem, 4vw, 3rem);
		font-family: 'Inter', sans-serif;
	}

	select {
		font-size: 0.75em;
		margin: 0;
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