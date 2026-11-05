document.querySelectorAll('a[data-language]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = new URL(link.href);
    target.search = location.search;
    target.hash = location.hash;
    if (target.search || target.hash) { event.preventDefault(); location.assign(target.href); }
  });
});
