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
			const userLangs = window.navigator.languages
			const foundLang = userLangs.find(l => {
				return translations.find(t => t === l)
			})

      console.log(userLangs)
      if (typeof foundLang !== 'undefined') {
        loc = foundLang
      }
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
    console.log(detectedLang)
		const translation = getTranslation(detectedLang)
		content = translation.html
	})
</script>

<main>
	<select 
    label="Select language"
    bind:value={lang}
    on:change={handleChange}
  >
    <option disabled>Select language</option>
		{#each versions.filter(v => v.metadata.complete) as opt}
			<option value={opt.metadata.id}>{opt.metadata.name}</option>
		{/each}
		<option disabled>---</option>
		<option value="contribute">Add translation</option>
	</select>

	{@html content}
</main>

<hr>

<footer>
  <p>
    Design needs a code of ethics. This is a start—but we only know what we know. Our point of view is limited to our own experiences.
  </p>
  <p>
    This code belongs to you. Make it yours. Make it great.
  </p>
  <p>
    <a target="_blank" href="https://github.com/codeofdesign/code">Contribute</a>,
    <a target="_blank" href="https://github.com/codeofdesign/code#license">License</a>,
    <a target="_blank" href="https://are.na/code-of-design">Arena</a>.
  </p>
</footer>

<style lang="scss">
	select {
		font-size: clamp(20px, 0.5em, 40px);
		margin: 0;
    appearance: none;
    -webkit-apperance: none;
    border: none;
    box-shadow: none;
    background: transparent;
    border: 0.1em solid black;
    color: black;
    padding: 0.5em 0.5em;
    font-weight: 500;
    font-family: 'Inter';
	}

  select:focus {
    background: black;
    color: #0f0;
    outline: solid 0.1em black;
    outline-offset: 0.2em;
  }

  footer {
    width: 50%;
    min-width: 9rem;
    max-width: 32ch;
    padding: 0 0 0.5rem;
    font-size: clamp(16px, 0.5em, 1rem);
  }

	:global(h1:first-child) {
		margin: 0;
	}

	:global(h1, h2, h3, h4, h5, h6, p, li) {
		line-height: 1.1em;
	}
</style>