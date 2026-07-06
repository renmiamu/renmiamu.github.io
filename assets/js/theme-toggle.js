(function () {
  var root = document.documentElement;
  var storageKey = 'theme-preference';
  var lightThemeColor = '#ffffff';
  var darkThemeColor = '#10151c';

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getCurrentTheme() {
    return root.getAttribute('data-theme') || getStoredTheme() || getSystemTheme();
  }

  function updateThemeColor(theme) {
    var themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute('content', theme === 'dark' ? darkThemeColor : lightThemeColor);
    }
  }

  function updateToggle(theme) {
    var toggle = document.querySelector('.theme-toggle');

    if (!toggle) {
      return;
    }

    var isDark = theme === 'dark';
    var label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    var icon = toggle.querySelector('.theme-toggle__icon');

    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    toggle.setAttribute('aria-pressed', String(isDark));

    if (icon) {
      icon.classList.toggle('fa-sun', isDark);
      icon.classList.toggle('fa-moon', !isDark);
    }
  }

  function setTheme(theme, shouldStore) {
    root.setAttribute('data-theme', theme);
    updateThemeColor(theme);
    updateToggle(theme);

    if (shouldStore) {
      storeTheme(theme);
    }
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  onReady(function () {
    var toggle = document.querySelector('.theme-toggle');
    var mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    setTheme(getCurrentTheme(), false);

    if (toggle) {
      toggle.addEventListener('click', function () {
        setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark', true);
      });
    }

    if (mediaQuery) {
      var handleSystemChange = function (event) {
        if (!getStoredTheme()) {
          setTheme(event.matches ? 'dark' : 'light', false);
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleSystemChange);
      }
    }
  });
})();
