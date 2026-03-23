(function () {
  "use strict";

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;

  var navCollapsedMq = window.matchMedia("(max-width: 960px)");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      document.body.classList.remove("header-bar-concealed");
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapsedMq.matches) {
        setOpen(false);
      }
    });
  });

  window.addEventListener("resize", function () {
    if (!navCollapsedMq.matches) {
      setOpen(false);
    }
  });
})();

(function () {
  "use strict";

  var hitbox = document.querySelector(".envelope-hitbox");
  if (!hitbox) return;

  var noHoverMq = window.matchMedia("(hover: none)");

  function touchPrimary() {
    return noHoverMq.matches;
  }

  function setExpanded(open) {
    hitbox.classList.toggle("is-open", open);
    hitbox.setAttribute("aria-expanded", open ? "true" : "false");
  }

  hitbox.addEventListener("click", function (e) {
    if (!touchPrimary()) return;
    if (e.target.closest("a")) return;
    setExpanded(!hitbox.classList.contains("is-open"));
  });

  hitbox.addEventListener("keydown", function (e) {
    if (!touchPrimary()) return;
    if (e.target !== hitbox) return;
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setExpanded(!hitbox.classList.contains("is-open"));
  });

  function onNoHoverChange() {
    if (!touchPrimary()) {
      hitbox.classList.remove("is-open");
      hitbox.setAttribute("aria-expanded", "false");
    }
  }

  if (typeof noHoverMq.addEventListener === "function") {
    noHoverMq.addEventListener("change", onNoHoverChange);
  } else if (typeof noHoverMq.addListener === "function") {
    noHoverMq.addListener(onNoHoverChange);
  }
  window.addEventListener("resize", onNoHoverChange);
})();

(function () {
  "use strict";

  var stack = document.querySelector(".folder-stack");
  if (!stack) return;

  stack.querySelectorAll('details[name="portfolio-project"]').forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (!detail.open) return;
      stack.querySelectorAll('details[name="portfolio-project"]').forEach(function (other) {
        if (other !== detail) {
          other.open = false;
        }
      });
    });
  });
})();

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  if (!header) return;

  function setHeaderScrollPadding() {
    var h = header.getBoundingClientRect().height;
    h = Math.max(0, h - 1);
    document.documentElement.style.setProperty("--site-header-px", h + "px");
  }

  setHeaderScrollPadding();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setHeaderScrollPadding);
  }
  window.addEventListener("load", setHeaderScrollPadding);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(setHeaderScrollPadding).observe(header);
  }
  window.addEventListener("resize", setHeaderScrollPadding);
})();

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var nav = document.getElementById("site-nav");
  var body = document.body;
  var lastY = window.scrollY || 0;
  var topThreshold = 8;
  var minScrollToHide = 56;

  function navMenuOpen() {
    return nav && nav.classList.contains("is-open");
  }

  function updateHeaderBar() {
    if (reduceMotion.matches) {
      body.classList.remove("header-bar-concealed");
      return;
    }
    var y = window.scrollY || 0;
    if (navMenuOpen()) {
      body.classList.remove("header-bar-concealed");
      lastY = y;
      return;
    }
    if (y <= topThreshold) {
      body.classList.remove("header-bar-concealed");
    } else if (y > lastY && y > minScrollToHide) {
      body.classList.add("header-bar-concealed");
    } else if (y < lastY) {
      body.classList.remove("header-bar-concealed");
    }
    lastY = y;
  }

  window.addEventListener("scroll", updateHeaderBar, { passive: true });
  window.addEventListener("resize", function () {
    lastY = window.scrollY || 0;
    if ((window.scrollY || 0) <= topThreshold) {
      body.classList.remove("header-bar-concealed");
    }
  });

  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", function () {
      body.classList.remove("header-bar-concealed");
    });
  }
})();

(function () {
  "use strict";

  if (!document.fonts) return;

  function hasBrittanySignatureFace() {
    var found = false;
    function consider(face) {
      if (!face || !face.family) return;
      var fam = face.family;
      if (/brittany/i.test(fam) && /signature/i.test(fam)) {
        found = true;
      }
    }
    if (typeof document.fonts.forEach === "function") {
      document.fonts.forEach(consider);
      return found;
    }
    try {
      var it = document.fonts.values();
      var next = it.next();
      while (!next.done) {
        consider(next.value);
        next = it.next();
      }
    } catch (e) {
      return true;
    }
    return found;
  }

  function syncHeroSignatureFallback() {
    var missing = !hasBrittanySignatureFace();
    document.documentElement.classList.toggle("signature-brittany-missing", missing);
  }

  document.fonts.ready.then(syncHeroSignatureFallback);
  if (document.fonts.addEventListener) {
    document.fonts.addEventListener("loadingdone", syncHeroSignatureFallback);
  }
  window.addEventListener("load", syncHeroSignatureFallback);
})();

(function () {
  "use strict";

  var storageKey = "portfolio-scroll-y";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  function getNavigationType() {
    if (!performance || typeof performance.getEntriesByType !== "function") {
      return "";
    }
    var navEntries = performance.getEntriesByType("navigation");
    if (!navEntries || !navEntries.length) {
      return "";
    }
    return navEntries[0].type || "";
  }

  function saveScrollPosition() {
    try {
      localStorage.setItem(storageKey, String(window.scrollY || 0));
    } catch (e) {}
  }

  function referrerIsSameOrigin() {
    var ref = document.referrer;
    if (!ref) return false;
    try {
      return new URL(ref).origin === window.location.origin;
    } catch (e) {
      return false;
    }
  }

  var navigationType = getNavigationType();
  var isReload = navigationType === "reload";
  var allowRestoreScroll =
    navigationType === "back_forward" ||
    (navigationType === "navigate" && referrerIsSameOrigin());

  if (isReload) {
    window.scrollTo(0, 0);
  } else if (!window.location.hash) {
    if (allowRestoreScroll) {
      try {
        var saved = Number(localStorage.getItem(storageKey) || "0");
        if (saved > 0) {
          window.requestAnimationFrame(function () {
            window.scrollTo(0, saved);
          });
        }
      } catch (e) {}
    } else {
      window.scrollTo(0, 0);
    }
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        saveScrollPosition();
        ticking = false;
      });
    },
    { passive: true }
  );
  window.addEventListener("pagehide", saveScrollPosition);
})();
