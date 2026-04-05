(function () {
  function unwrapNestedPanels() {
    document.querySelectorAll('.mm-menu .mm-panels > .mm-panels.mm-panel').forEach((wrap) => {
      const parent = wrap.parentElement; // the real .mm-panels
      // Move wrapper children up one level
      while (wrap.firstChild) parent.insertBefore(wrap.firstChild, wrap);
      wrap.remove();
    });
  }

  // Run once on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', unwrapNestedPanels);
  } else {
    unwrapNestedPanels();
  }

  // Also catch late DOM changes (some setups build the menu after load)
  const mo = new MutationObserver(() => unwrapNestedPanels());
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();