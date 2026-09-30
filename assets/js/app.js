(function () {
  "use strict";

  var D = window.INJECT_RESPECT;
  if (!D) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k.indexOf("data-") === 0 || k.indexOf("aria-") === 0) node.setAttribute(k, attrs[k]);
        else node[k] = attrs[k];
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  var glossaryMap = {};
  D.glossary.forEach(function (g) { glossaryMap[g[0]] = g[1]; });

  /* ---------- Question text with glossary links ---------- */

  var linkPattern = new RegExp(
    "(" + D.glossaryLinks.map(function (l) {
      return l[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("|") + ")",
    "i"
  );

  function linkTerm(phrase) {
    var lower = phrase.toLowerCase();
    for (var i = 0; i < D.glossaryLinks.length; i++) {
      if (D.glossaryLinks[i][0] === lower) return D.glossaryLinks[i][1];
    }
    return null;
  }

  function renderQuestionText(text) {
    var frag = document.createDocumentFragment();
    var rest = text;
    var guard = 0;
    while (rest && guard++ < 20) {
      var m = rest.match(linkPattern);
      if (!m) { frag.appendChild(document.createTextNode(rest)); break; }
      var before = rest.slice(0, m.index);
      if (before) frag.appendChild(document.createTextNode(before));
      var term = linkTerm(m[0]);
      if (term && glossaryMap[term]) {
        frag.appendChild(el("button", {
          type: "button",
          class: "term",
          text: m[0],
          "data-term": term,
          "aria-haspopup": "dialog",
          "aria-label": m[0] + " (glossary definition)"
        }));
      } else {
        frag.appendChild(document.createTextNode(m[0]));
      }
      rest = rest.slice(m.index + m[0].length);
    }
    return frag;
  }

  function normalise(q) {
    return typeof q === "string" ? { text: q, priority: false } : q;
  }

  /* ---------- Mnemonic strip ---------- */

  function buildMnemonic() {
    var nav = $("#mnemonic");
    var words = [D.domains.slice(0, 6), D.domains.slice(6)];
    words.forEach(function (group, gi) {
      var word = el("div", { class: "mnemonic-word" });
      group.forEach(function (d) {
        word.appendChild(el("a", { class: "mnemonic-item", href: "#d-" + d.id }, [
          el("span", { class: "mnemonic-letter", "aria-hidden": "true", text: d.letter }),
          el("span", { class: "mnemonic-name", text: d.name })
        ]));
      });
      nav.appendChild(word);
      if (gi === 0) nav.appendChild(el("span", { class: "mnemonic-hyphen", "aria-hidden": "true", text: "-" }));
    });
  }

  /* ---------- Before you begin ---------- */

  function buildBefore() {
    var box = $("#instructions");
    D.instructions.forEach(function (p) { box.appendChild(el("p", { text: p })); });
    var lead = $("#framing-lead");
    [].concat(D.framing.lead).forEach(function (p) { lead.appendChild(el("p", { text: p })); });
    $("#framing-intro").textContent = D.framing.pointsIntro || "";
    var ul = $("#framing-points");
    D.framing.points.forEach(function (p) { ul.appendChild(el("li", { text: p })); });
    $("#framing-more").textContent = D.framing.more || "";
  }

  /* ---------- Guide ---------- */

  function buildQuestionList(items) {
    var list = el("ul", { class: "questions" });
    items.map(normalise).forEach(function (q) {
      var li = el("li", { class: "question" + (q.priority ? " is-priority" : "") });
      li.appendChild(renderQuestionText(q.text));
      if (q.priority) li.appendChild(el("span", { class: "priority", text: "Priority" }));
      list.appendChild(li);
    });
    return list;
  }

  function buildGuide() {
    var wrap = $("#domains");
    var rail = $("#rail-list");

    D.domains.forEach(function (d) {
      var section = el("section", { class: "domain", id: "d-" + d.id, "aria-labelledby": "h-" + d.id });

      var head = el("div", { class: "domain-head" }, [
        el("span", { class: "domain-letter", "aria-hidden": "true", text: d.letter }),
        el("div", { class: "domain-title" }, [
          el("h3", { id: "h-" + d.id, text: d.name }),
          d.keywords ? el("p", { class: "domain-keywords", text: d.keywords }) : null
        ])
      ]);

      var groups = el("div", { class: "domain-groups" }, [
        el("div", { class: "group group-quick" }, [
          el("h4", { text: "Quick interview" }),
          buildQuestionList(d.quick)
        ]),
        d.detailed && d.detailed.length ? el("div", { class: "group group-detailed" }, [
          el("h4", { text: "Detailed interview" }),
          buildQuestionList(d.detailed)
        ]) : null
      ]);

      section.appendChild(head);
      section.appendChild(groups);
      wrap.appendChild(section);

      rail.appendChild(el("li", {}, [
        el("a", { href: "#d-" + d.id, "data-rail": d.id }, [
          el("span", { class: "rail-letter", "aria-hidden": "true", text: d.letter }),
          el("span", { class: "rail-name", text: d.name })
        ])
      ]));
    });
  }

  function bindGuide() {
    $$(".js-print").forEach(function (b) {
      b.addEventListener("click", function () { window.print(); });
    });
  }

  /* ---------- Rail: highlight the domain in view ---------- */

  function bindRailSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    $$("[data-rail]").forEach(function (a) { links[a.getAttribute("data-rail")] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id.replace(/^d-/, "");
        Object.keys(links).forEach(function (k) {
          if (k === id) links[k].setAttribute("aria-current", "true");
          else links[k].removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    $$(".domain").forEach(function (s) { io.observe(s); });
  }

  /* ---------- Jump highlight ---------- */

  function flash(target) {
    if (!target) return;
    target.classList.remove("is-flash");
    void target.offsetWidth;
    target.classList.add("is-flash");
  }

  function bindJumps() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#d-"]');
      if (a) flash(document.getElementById(a.getAttribute("href").slice(1)));
    });
    if (location.hash && location.hash.indexOf("#d-") === 0) {
      flash(document.getElementById(location.hash.slice(1)));
    }
  }

  /* ---------- Glossary ---------- */

  function buildGlossary() {
    var dl = $("#glossary-list");
    var sorted = D.glossary.slice().sort(function (a, b) {
      return a[0].localeCompare(b[0], "en", { sensitivity: "base" });
    });
    sorted.forEach(function (g) {
      var item = el("div", { class: "g-item", id: "g-" + slug(g[0]) }, [
        el("dt", { text: g[0] }),
        el("dd", { text: g[1] })
      ]);
      item.setAttribute("data-search", (g[0] + " " + g[1]).toLowerCase());
      dl.appendChild(item);
    });
    updateGlossaryStatus(sorted.length, sorted.length, "");
  }

  function updateGlossaryStatus(shown, total, q) {
    var s = $("#glossary-status");
    if (!q) s.textContent = total + " terms";
    else if (shown === 0) s.textContent = "No terms match “" + q + "”. Try a shorter word, or clear the search to see all " + total + ".";
    else s.textContent = shown + " of " + total + " terms match “" + q + "”";
  }

  function bindGlossary() {
    var input = $("#glossary-search");
    var items = $$(".g-item");
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (it) {
        var hit = !q || it.getAttribute("data-search").indexOf(q) !== -1;
        it.hidden = !hit;
        if (hit) shown++;
      });
      updateGlossaryStatus(shown, items.length, input.value.trim());
    });
  }

  /* ---------- Term popover ---------- */

  function bindTermPop() {
    var pop = $("#term-pop");
    var opener = null;

    function close(returnFocus) {
      if (pop.hidden) return;
      pop.hidden = true;
      if (opener) {
        opener.setAttribute("aria-expanded", "false");
        if (returnFocus) opener.focus();
      }
      opener = null;
    }

    function place(btn) {
      var r = btn.getBoundingClientRect();
      var pw = Math.min(340, window.innerWidth - 32);
      pop.style.width = pw + "px";
      var left = Math.max(16, Math.min(r.left, window.innerWidth - pw - 16));
      var top = r.bottom + 8;
      pop.style.left = left + window.scrollX + "px";
      pop.style.top = top + window.scrollY + "px";
      var ph = pop.offsetHeight;
      if (r.bottom + 8 + ph > window.innerHeight && r.top - 8 - ph > 0) {
        pop.style.top = r.top - 8 - ph + window.scrollY + "px";
      }
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".term");
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        if (opener === btn) { close(false); return; }
        close(false);
        var term = btn.getAttribute("data-term");
        $("#term-pop-title").textContent = term;
        $("#term-pop-def").textContent = glossaryMap[term];
        $("#term-pop-link").setAttribute("href", "#g-" + slug(term));
        pop.hidden = false;
        place(btn);
        opener = btn;
        btn.setAttribute("aria-expanded", "true");
        return;
      }
      if (!pop.contains(e.target)) close(false);
    });

    $("#term-pop-link").addEventListener("click", function () {
      var target = document.getElementById(this.getAttribute("href").slice(1));
      var search = $("#glossary-search");
      if (search.value) { search.value = ""; search.dispatchEvent(new Event("input")); }
      close(false);
      if (target) {
        target.classList.remove("is-flash");
        void target.offsetWidth;
        target.classList.add("is-flash");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close(true);
    });
    window.addEventListener("resize", function () { close(false); });
  }

  /* ---------- About ---------- */

  function buildAbout() {
    var a = D.authors;
    $("#authors").textContent = a.slice(0, -1).join(", ") + ", and " + a[a.length - 1];

    var refs = $("#references");
    D.references.forEach(function (r) {
      refs.appendChild(el("li", {}, [
        r.text + " ",
        el("a", { href: r.url, text: r.label, rel: "noopener" })
      ]));
    });

    var attribution = "“The INJECT-RESPECT Tool” by " +
      "Edward C. Traver, Sarah A. Schmalzle, Christopher Welsh, and Sarah Kattakuzhy, " +
      "© " + D.year + ", licensed under " + D.license.name + " (" + D.license.url + ").";
    $("#attribution-text").textContent = attribution;

    $("#copy-attribution").addEventListener("click", function () {
      var btn = this;
      var done = function () {
        btn.textContent = "Attribution copied";
        setTimeout(function () { btn.textContent = "Copy attribution"; }, 2000);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(attribution).then(done, function () { selectText(); });
      } else {
        selectText();
      }
      function selectText() {
        var range = document.createRange();
        range.selectNodeContents($("#attribution-text"));
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        btn.textContent = "Selected. Press Ctrl+C to copy";
      }
    });
  }

  /* ---------- Init ---------- */

  buildMnemonic();
  buildBefore();
  buildGuide();
  buildGlossary();
  buildAbout();
  bindGuide();
  bindRailSpy();
  bindJumps();
  bindGlossary();
  bindTermPop();
})();
