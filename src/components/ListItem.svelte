<script>
  import { onMount, tick } from 'svelte'
  import { map, mapClamp, lerp } from '../util/math'
  import { remToPx } from '../util/dom'

  export let item
  export let index
  export let collapsed = false

  let opacity = 1
  let height
  let toHeight

  let min
  let max
  let minScroll
  let maxScroll

  let wrapperEl
  let fadeEl

  const parseContent = c => {
    // replace all newline characters with closing and opening
    // paragraph tags - *unless* it's all the way at the end
    return '<p>' + c.replace(/(?!\n$)\n/g, '</p><p>') + '</p>'
  }

  const update = () => {
    if (height) height = lerp(height, toHeight, 0.15)
    if (fadeEl) fadeEl.style.opacity = opacity

    requestAnimationFrame(update)
  }

  const defineMinMax = () => {
    const { innerWidth, innerHeight } = window
    max = wrapperEl.offsetHeight
    min = innerHeight / (innerWidth < 700 ? 6 : 4)
    minScroll = 0
    maxScroll = innerHeight * 0.2

    setItemHeights()
  }

  const setItemHeights = () => {
    const y = window.scrollY
    if (y < maxScroll) {
      toHeight = map(y, minScroll, maxScroll, min, max)
      opacity = map(y, minScroll, maxScroll, 1, 0)
    } else if (y <= minScroll) {
      toHeight = min
      opacity = 1
    } else if (y > maxScroll) {
      toHeight = max
      opacity = 0
    }
  }

  $: body = parseContent(item.body)

  onMount(async () => {
    if (collapsed) {
      await tick()

      defineMinMax()

      height = min
      toHeight = min

      requestAnimationFrame(update)

      window.addEventListener('scroll', setItemHeights, { passive: true })
      window.addEventListener('resize', defineMinMax, { passive: true })
    }
  })
</script>

<li
  class="list-item"
  class:collapsed={collapsed}
  style={`
    z-index: ${index};
    ${height ? ('height: ' + Math.round(height * 10) / 10 + 'px;') : ''}
  `}
>
  <span class="fade" bind:this={fadeEl}/>

  <div class="wrapper" bind:this={wrapperEl}>
    <span class="number"/>
    <h3 class="title">{item.title}</h3>
    <div class="body">
      {@html body}
    </div>
  </div>
</li>

<style lang="scss">
  @use '../assets/styles/mixins' as *;

  .list-item {
    margin: 0;
    border-top: solid 1px var(--color-dark);
    counter-increment: item;
    transition: 0.15s background-color;
    position: relative;
    height: auto;
    background-color: var(--color-active-bg);

    .fade {
      display: block;
      position: absolute;
      background-image: url('/img/gradient-salmon.png');
      background-size: auto 100%;
      background-repeat: repeat-x;
      pointer-events: none;
      backface-visibility: hidden;
      bottom: calc(100% + 1px);
      left: 0;
      width: 100%;
      height: 5rem;
      transition: ease 0.15s background-image;
    }

    .number {
      position: absolute;
      font-feature-settings: 'tnum' on, 'lnum' on;

      &::before {
        content: counter(item);
      }

      @include from(medium) {
        position: relative;
        position: sticky;
        top: 7rem;
        height: 3rem;
      }
    }

    .wrapper {
      @extend %col-grid;
      padding: 1.5rem 1rem;
      position: relative;
      height: auto;
      align-items: flex-start;

      @include from(medium) {
        padding: 2rem 1rem;
      }
    }

    .title {
      font-family: 'FK Raster Roman Blended';
      font-size: 2.1rem;
      margin: 0 0 1.5rem;
      padding-left: 1.1em;

      @include from(medium) {
        font-size: 4rem;
        font-size: clamp(2.75rem, 5vw, 4rem);
        letter-spacing: 0.03em;
        grid-column: 4 / span 20;
        padding-left: 0;
        margin: 0 0 2rem;
      }
      @include from(large) {
        grid-column: 3 / span 9;
        font-size: clamp(2.75rem, 3.8vw, 3.85rem);
      }
    }
    .body {
      grid-column: span 12;
      white-space: pre-line;

      @include from(medium) {
        grid-column: 4 / span 20;
      }
      @include from(large) {
        grid-column: 13 / span 10;
      }
    }

    &:first-child {
      border-top: none;
      .fade {
        display: none;
      }
    }

    @include until(medium) {
      .wrapper {
        display: flex;
        flex-direction: column;
      }
    }
  }

  :global(.list-item p) {
    text-indent: 2em;
    margin-bottom: 0.35rem;
    line-height: 1em;
  }

  :global(.scrolled .list .list-item .fade) {
    background-image: url('/img/gradient-light.png');
  }
</style>
