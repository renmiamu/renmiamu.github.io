(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var glow = document.createElement('div');
  glow.className = 'pointer-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  window.addEventListener('pointermove', function (event) {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) {
      return;
    }

    glow.style.transform = 'translate3d(' + event.clientX + 'px, ' + event.clientY + 'px, 0) translate(-50%, -50%)';
    glow.classList.add('is-visible');
  }, { passive: true });

  function hideGlow() {
    glow.classList.remove('is-visible');
  }

  document.documentElement.addEventListener('pointerleave', hideGlow);
  window.addEventListener('blur', hideGlow);

  window.addEventListener('click', function (event) {
    if (event.button !== 0 || event.detail === 0 || reducedMotion.matches) {
      return;
    }

    if (event.pointerType && event.pointerType !== 'mouse') {
      return;
    }

    var pulse = document.createElement('span');
    pulse.className = 'pointer-pulse';
    pulse.setAttribute('aria-hidden', 'true');
    pulse.style.left = event.clientX + 'px';
    pulse.style.top = event.clientY + 'px';
    pulse.addEventListener('animationend', function () {
      pulse.remove();
    }, { once: true });

    var dialog = event.target instanceof Element && event.target.closest('dialog[open]');
    (dialog || document.body).appendChild(pulse);
  }, { capture: true, passive: true });
})();
