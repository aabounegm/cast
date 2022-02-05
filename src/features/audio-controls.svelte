<script lang="ts">
  export let name: string;

  let buttonText = 'Button';

  function handleClick() {
    buttonText = 'Button Clicked';
  }
</script>

<div>
  <audio controls src="/media/cc0-audio/t-rex-roar.mp3">
    Your browser does not support the
    <code>audio</code> element.
  </audio>
</div>
