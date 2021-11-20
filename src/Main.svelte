<script>
  import { onMount } from 'svelte'
  // import versions from 'codeofdesign'

  let disp = ''

  function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  // our previous Base64-encoded string

  onMount(() => {
    console.log('hei')
    // const str = versions[0]

    // // disp = b64DecodeUnicode('4pyTIMOgIGxhIG1vZGU')
    // disp = b64DecodeUnicode(str.substring(str.indexOf(",") + 1))
    // console.log(disp)
  })
</script>

heisann!

{disp}

<style lang="scss">
  @use './public/fonts/fk-raster-roman/blended';

  $color: #f30;

  :global(body) {
    background-color: $color;
    color: #000;
    font-family: 'FK Raster Roman Blended';
  }
</style>