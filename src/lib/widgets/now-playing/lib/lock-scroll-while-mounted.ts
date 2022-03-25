export function lockScrollWhileMounted() {
  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = 'visible';
  };
}
