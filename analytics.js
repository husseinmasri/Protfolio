/* ============================================================
   Google Analytics 4 — visitor, engagement and interaction tracking
   Set your Measurement ID in index.html:  window.GA_MEASUREMENT_ID
   Nothing is loaded or sent until a real ID (G-XXXX...) is set.
   ============================================================ */
(function () {
  "use strict";

  var ID = window.GA_MEASUREMENT_ID;
  if (!ID || ID.indexOf("G-") !== 0 || ID === "G-XXXXXXXXXX") {
    console.info("[analytics] Measurement ID not set — tracking disabled.");
    return;
  }

  /* ---------- load gtag.js ---------- */
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ID);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", ID, {
    anonymize_ip: true,
    send_page_view: true
  });

  function track(name, params) {
    gtag("event", name, params || {});
  }

  /* ---------- helpers ---------- */
  function textOf(el, max) {
    return ((el && el.textContent) || "").replace(/\s+/g, " ").trim().slice(0, max || 60);
  }

  function fileName(href) {
    try { return decodeURIComponent(href.split("/").pop().split("?")[0]); }
    catch (e) { return href; }
  }

  function buttonLocation(el) {
    if (el.closest("#case-study-drawer")) return "case_study";
    if (el.closest(".contact-section, #contact")) return "contact_section";
    if (el.closest(".mobile-nav, .mobile-menu")) return "mobile_menu";
    if (el.closest("nav, header, .navbar")) return "navbar";
    if (el.closest(".hero-section, .hero-content")) return "hero";
    if (el.closest("footer")) return "footer";
    return "page";
  }

  /* ---------- clicks: downloads, contact, outbound ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var label = textOf(a, 60);
    var where = buttonLocation(a);

    /* CV / portfolio PDF downloads */
    if (/\.pdf($|\?)/i.test(href)) {
      var file = fileName(href);
      track("file_download", {            // GA4 recommended event
        file_name: file,
        file_extension: "pdf",
        link_text: label,
        link_url: a.href,
        button_location: where
      });
      if (/resume/i.test(file)) {
        track("cv_download", { file_name: file, button_location: where });
      } else if (/portfolio/i.test(file)) {
        track("portfolio_download", { file_name: file, button_location: where });
      }
      return;
    }

    /* email / phone */
    if (/^mailto:/i.test(href) || /^tel:/i.test(href)) {
      track("contact_click", {
        method: /^mailto:/i.test(href) ? "email" : "phone",
        link_url: href,
        button_location: where
      });
      return;
    }

    /* outbound links (LinkedIn, Behance, …) */
    if (/^https?:\/\//i.test(href) && a.hostname && a.hostname !== location.hostname) {
      var network = /linkedin/i.test(a.hostname) ? "linkedin"
                  : /behance/i.test(a.hostname) ? "behance"
                  : /instagram/i.test(a.hostname) ? "instagram"
                  : a.hostname;
      track("click_outbound", {
        link_domain: a.hostname,
        link_url: a.href,
        network: network,
        link_text: label,
        button_location: where
      });
      return;
    }

    /* internal CTA / nav clicks */
    if (a.classList.contains("btn") || a.classList.contains("nav-link") ||
        a.classList.contains("mobile-nav-link")) {
      track("cta_click", {
        link_text: label,
        link_url: href,
        button_location: where
      });
    }
  }, true);

  /* ---------- project case-study opens ---------- */
  document.addEventListener("click", function (e) {
    var card = e.target.closest("[data-project-id]");
    if (!card) return;
    var name = textOf(card.querySelector(".card-project-category"), 60) ||
               textOf(card.querySelector(".card-project-title, h3, h4"), 60) ||
               card.getAttribute("data-project-id");
    track("view_project", {
      project_id: card.getAttribute("data-project-id"),
      project_name: name
    });
  }, true);

  /* ---------- scroll depth ---------- */
  var marks = [25, 50, 75, 100], seen = {};
  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var pct = Math.min(100, Math.round((window.scrollY / max) * 100));
    for (var i = 0; i < marks.length; i++) {
      var m = marks[i];
      if (pct >= m && !seen[m]) {
        seen[m] = true;
        track("scroll_depth", { percent_scrolled: m });
      }
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- which sections were actually read ---------- */
  if ("IntersectionObserver" in window) {
    var viewed = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var id = en.target.id;
        if (en.isIntersecting && en.intersectionRatio >= 0.5 && id && !viewed[id]) {
          viewed[id] = true;
          track("section_view", { section_id: id });
        }
      });
    }, { threshold: [0.5] });
    document.querySelectorAll("section[id]").forEach(function (sec) { io.observe(sec); });
  }

  /* ---------- time spent on the page (sent once, on leave) ---------- */
  var start = Date.now(), sent = false;
  function sendTime() {
    if (sent) return;
    sent = true;
    var seconds = Math.round((Date.now() - start) / 1000);
    if (seconds < 2) return;
    track("time_on_page", {
      seconds: seconds,
      bucket: seconds < 15 ? "0-15s" : seconds < 60 ? "15-60s"
            : seconds < 180 ? "1-3min" : seconds < 600 ? "3-10min" : "10min+"
    });
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") sendTime();
  });
  window.addEventListener("pagehide", sendTime);
})();
