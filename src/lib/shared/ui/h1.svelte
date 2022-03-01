<script lang="ts">
  import cx from 'clsx';

  let _class = '';
  export { _class as class };
</script>

<h1
  class={cx('font-raleway', 'font-extrabold', 'text-lg', 'leading-6', 'text-slate-100', _class)}
  {...$$restProps}
>
  <slot />
</h1>
