<script lang="ts">
  import clsx from 'clsx';

  let _class = '';
  export { _class as class };
</script>

<h1
  class={clsx('font-raleway', 'font-extrabold', 'text-lg', 'leading-6', 'text-slate-100', _class)}
>
  <slot />
</h1>
