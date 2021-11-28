<script>
  import { onMount } from 'svelte'
  import { lang } from '../store'
  import Page from '../components/LayoutPage.svelte'
  import List from '../components/List.svelte'

  export let hasScrolled = false

  let content
  let mode = 'read'

  const loadContent = async () => {
    const id = $lang
    const res = await import(`../../public/versions/${id}.json`)
    content = res.content.sections
  }

  const handleChangeLocale = () => {
    loadContent()
  }

  $: { $lang; handleChangeLocale() }

  $: collapsed = !hasScrolled

  onMount(() => {
    loadContent()
  })
</script>

<List
  {content}
  {mode}
/>