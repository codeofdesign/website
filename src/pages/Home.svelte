<script>
  import { onMount } from 'svelte'
  import { lang } from '../store'
  import Page from '../components/LayoutPage.svelte'
  import List from '../components/List.svelte'

  let content

  const loadContent = async () => {
    const id = $lang
    const res = await import(`../../public/versions/${id}.json`)
    content = res.content.sections
  }

  const handleChangeLocale = () => {
    loadContent()
  }

  $: { $lang; handleChangeLocale() }

  onMount(() => {
    loadContent()
  })
</script>

<List
  mode="read"
  expanded={false}
  {content}
/>