(function () {
  var dialog = document.getElementById('wechat-dialog');
  var activeTrigger = null;

  if (!dialog || typeof dialog.showModal !== 'function') {
    return;
  }

  // Capture the click before the site's general image lightbox handles it.
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('a[data-wechat-popup]');

    if (!trigger || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (!dialog.open) {
      activeTrigger = trigger;
      dialog.showModal();
      document.documentElement.classList.add('has-wechat-dialog');
    }
  }, true);

  dialog.querySelector('.wechat-dialog__close').addEventListener('click', function () {
    dialog.close();
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      dialog.querySelector('.wechat-dialog__close').focus();
    }
  });

  dialog.addEventListener('click', function (event) {
    var bounds = dialog.getBoundingClientRect();

    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('has-wechat-dialog');

    if (activeTrigger) {
      activeTrigger.focus({ preventScroll: true });
    }
  });
})();
