<script>
  import { onMount, tick } from 'svelte'
  import { map, mapClamp, lerp } from '../util/math'

  export let item
  export let index
  export let collapsed = false

  let height = undefined
  let toHeight = undefined
  let opacity = 1

  let titleEl
  let wrapperEl
  let fadeEl

  const parseContent = c => {
    // replace all newline characters with closing and opening
    // paragraph tags - *except* if it's all the way at the end
    return '<p>' + c.replace(/(?!\n$)\n/g, '</p><p>') + '</p>'
  }

  const remToPx = (rem) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  }

  const update = () => {
    height = lerp(height, toHeight, 0.25)
    fadeEl.style.opacity = opacity

    requestAnimationFrame(update)
  }

  $: body = parseContent(item.body)

  onMount(async () => {
    if (index < 3) {
      await tick()
      let max = wrapperEl.offsetHeight
      // const min = titleEl.offsetHeight
      const min = remToPx(8)
      const minScroll = 20
      const maxScroll = 220

      height = min
      toHeight = min

      setTimeout(() => max = wrapperEl.offsetHeight, 500)

      requestAnimationFrame(update)

      window.addEventListener('scroll', () => {
        const y = window.scrollY
        if (y > minScroll && y < maxScroll) {
          toHeight = map(y, minScroll, maxScroll, min, max)
          opacity = map(y, minScroll, maxScroll, 1, 0)
        } else if (y < minScroll) {
          toHeight = min
          opacity = 1
        } else if (y > maxScroll) {
          toHeight = max
          opacity = 0
        }
      })
    }
  })
</script>

<li
  class="list-item"
  class:collapsed={collapsed}
  style={`
    z-index: ${index};
    ${height ? ('height: ' + height + 'px;') : ''}
  `}
>
  <span class="fade" bind:this={fadeEl}/>
  <div class="wrapper" bind:this={wrapperEl}>
    <span class="number"/>
    <h3 class="title" bind:this={titleEl}>{item.title}</h3>
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
      position: relative;
      height: 100%;
      font-feature-settings: 'tnum' on, 'lnum' on;

      &::before {
        content: counter(item);
      }

      @include from(medium) {
        position: sticky;
        top: 6.5rem;
        height: 3rem;
      }
    }

    .wrapper {
      @extend %col-grid;
      padding: 2rem 1rem;
      position: relative;
      height: auto;
      align-items: flex-start;

      // &::after {
      //   content: "";
      //   pointer-events: none;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 100%;
      //   opacity: 1;
      //   transition: 0.3s opacity;

      //   @include from(large) {
      //     // left: 50%;
      //     // width: 50%;
      //   }
      // }

      // &::after {
      //   background: linear-gradient(to bottom, rgba(var(--color-salmon-rgb), 0), var(--color-salmon) 30%);
      // }
      // &::before {
      //   background: linear-gradient(to bottom, rgba(var(--color-light-rgb), 0), var(--color-light) 30%);
      // }
    }

    .title {
      font-family: 'FK Raster Roman Blended';
      font-size: 2.5rem;
      margin: 2rem 0;

      @include from(medium) {
        font-size: 4rem;
        font-size: clamp(2.75rem, 5vw, 4rem);
        letter-spacing: 0.03em;
        margin: 0 0 2rem;
        grid-column: 4 / span 20;
      }
      @include from(large) {
        grid-column: 3 / span 9;
        font-size: clamp(2.75rem, 3.8vw, 4rem);
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
    }

    // &.collapsed {
    //   .wrapper::before {
    //     opacity: 1;
    //   }
    // }

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
    letter-spacing: 0.03em;
  }

  :global(.scrolled .list .list-item .fade) {
    background-image: url('/img/gradient-light.png');
  }
</style>
