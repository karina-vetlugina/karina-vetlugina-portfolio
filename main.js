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
