/* =====================================================================
   Barbearia — lógica do site
   Lê tudo de window.BARBEARIA (js/config.js). Não precisa editar aqui.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.BARBEARIA || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // *palavra* -> <em>palavra</em>
  function emph(t) { return esc(t).replace(/\*(.+?)\*/g, "<em>$1</em>"); }
  function brl(v) { return "R$ " + Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }); }
  function initials(n) { return String(n).split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p[0]; }).join("").toUpperCase(); }
  function waUrl(msg) { return "https://wa.me/" + String(C.whatsapp || "").replace(/\D/g, "") + (msg ? "?text=" + encodeURIComponent(msg) : ""); }

  /* ---------------- Cores ---------------- */
  if (C.cores) {
    var rs = document.documentElement.style;
    if (C.cores.fundo) rs.setProperty("--bg", C.cores.fundo);
    if (C.cores.destaque) rs.setProperty("--accent", C.cores.destaque);
    if (C.cores.listra) rs.setProperty("--stripe", C.cores.listra);
  }

  /* ---------------- Textos simples ---------------- */
  document.title = (C.nome || "Barbearia") + " · Barbearia em " + (C.cidade || "");
  var meta = $('meta[name="description"]');
  if (meta && C.heroTexto) meta.setAttribute("content", C.heroTexto);

  $$("[data-nome]").forEach(function (el) { el.textContent = C.nome || ""; });
  $$("[data-sigla]").forEach(function (el) { el.textContent = C.sigla || ""; });
  $$("[data-cidade]").forEach(function (el) { el.textContent = C.cidade || ""; });
  $$("[data-desde]").forEach(function (el) { el.textContent = C.desde || ""; });
  $$("[data-hero-texto]").forEach(function (el) { el.textContent = C.heroTexto || ""; });
  $$("[data-endereco]").forEach(function (el) { el.textContent = C.endereco || ""; });
  $$("[data-telefone]").forEach(function (el) { el.textContent = C.telefoneExibicao || ""; });
  $$("[data-maps]").forEach(function (el) { el.href = C.mapsLink || "#"; });
  $$("[data-wa-link]").forEach(function (el) { el.href = waUrl("Olá! Vim pelo site da " + (C.nome || "barbearia") + "."); });
  $$("[data-instagram-link]").forEach(function (el) { el.href = "https://instagram.com/" + (C.instagram || ""); });
  $$("[data-instagram-text]").forEach(function (el) { el.textContent = "@" + (C.instagram || ""); });
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- Hero ---------------- */
  var heroTitle = $("#heroTitle");
  heroTitle.innerHTML = (C.heroTitulo || [C.nome]).map(function (l, i) {
    return '<span class="line"><span style="--d:' + (0.12 + i * 0.12).toFixed(2) + 's">' + emph(l) + "</span></span>";
  }).join("");
  $$("[data-hero-item]").forEach(function (el, i) { el.style.setProperty("--d", (0.45 + i * 0.1).toFixed(2) + "s"); });
  var bt = $("#badgeText");
  if (bt) bt.textContent = (C.nome + " · desde " + C.desde + " · ").toUpperCase();

  /* ---------------- Marquee ---------------- */
  var star = '<svg class="marquee__sep" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>';
  var words = (C.servicos || []).map(function (s) { return s.nome; });
  var group = '<div class="marquee__group">' + words.map(function (w, i) {
    return '<span class="marquee__item' + (i % 2 ? " marquee__item--outline" : "") + '">' + esc(w) + "</span>" + star;
  }).join("") + "</div>";
  $("#marquee").innerHTML = group + group;

  /* ---------------- Manifesto ---------------- */
  var mt = $("#manifestoText");
  mt.innerHTML = String(C.manifesto || "").split(/\s+/).map(function (w) {
    var acc = /^\*.*\*[.,!?]?$/.test(w);
    return '<span class="w' + (acc ? " accent" : "") + '">' + esc(w.replace(/\*/g, "")) + "</span>";
  }).join(" ");
  var mWords = $$(".w", mt);

  $("#stats").innerHTML = (C.numeros || []).map(function (n, i) {
    return '<div class="stat" data-reveal style="--d:' + (i * 0.1) + 's"><span class="stat__n" data-count="' + n.valor + '" data-dec="' + (n.decimais || 0) + '" data-suf="' + esc(n.sufixo || "") + '">0</span><span class="stat__l">' + esc(n.rotulo) + "</span></div>";
  }).join("");

  /* ---------------- Serviços ---------------- */
  $("#servicesList").innerHTML = (C.servicos || []).map(function (s, i) {
    return '<li class="menu__item" data-reveal style="--d:' + (i * 0.06).toFixed(2) + 's">' +
      '<button type="button" class="menu__btn" data-pick-service="' + i + '">' +
      '<span class="menu__idx">' + String(i + 1).padStart(2, "0") + "</span>" +
      '<span><span class="menu__name">' + esc(s.nome) + (s.destaque ? '<span class="menu__tag">Mais pedido</span>' : "") + "</span>" +
      '<span class="menu__desc">' + esc(s.descricao) + "</span></span>" +
      '<span class="menu__meta"><span class="menu__price">' + brl(s.preco) + '</span><span class="menu__time">' + s.duracao + " min</span></span>" +
      "</button></li>";
  }).join("");

  /* ---------------- Equipe ---------------- */
  $("#teamGrid").innerHTML = (C.barbeiros || []).map(function (b, i) {
    var media = b.foto
      ? '<img src="' + esc(b.foto) + '" alt="' + esc(b.nome) + '" loading="lazy" onerror="this.outerHTML=\'<div class=card__mono>' + esc(initials(b.nome)) + '</div>\'">'
      : '<div class="card__mono" aria-hidden="true">' + esc(initials(b.nome)) + "</div>";
    return '<article class="card" data-reveal style="--d:' + (i * 0.09).toFixed(2) + 's"><div class="card__inner">' + media +
      '<span class="card__shine"></span><div class="card__info"><h3 class="card__name">' + esc(b.nome) + '</h3><p class="card__role">' + esc(b.cargo) + "</p></div></div></article>";
  }).join("");

  /* ---------------- Galeria ---------------- */
  var icons = [
    // tesoura
    '<svg viewBox="0 0 64 64"><circle cx="16" cy="48" r="9"/><circle cx="48" cy="48" r="9"/><path d="M22 41L50 6M42 41L14 6"/></svg>',
    // navalha
    '<svg viewBox="0 0 64 64"><path d="M6 40l30-30c4-4 10-4 14 0L20 40z"/><path d="M20 40l6 6-14 14-6-6z"/><circle cx="17" cy="51" r="1.5"/></svg>',
    // pente
    '<svg viewBox="0 0 64 64"><rect x="6" y="18" width="52" height="10" rx="2"/><path d="M10 28v20M16 28v20M22 28v20M28 28v20M34 28v20M40 28v20M46 28v20M52 28v20"/></svg>',
    // máquina
    '<svg viewBox="0 0 64 64"><rect x="20" y="16" width="24" height="44" rx="10"/><path d="M18 8h28v8H18zM22 4v4M28 4v4M34 4v4M40 4v4M28 32h8"/></svg>',
    // poste
    '<svg viewBox="0 0 64 64"><rect x="24" y="10" width="16" height="44" rx="8"/><path d="M24 22l16-8M24 32l16-8M24 42l16-8M24 52l16-8M22 6h20M22 58h20"/></svg>',
    // pincel
    '<svg viewBox="0 0 64 64"><path d="M24 4h16l-2 22H26z"/><path d="M26 26h12v8c0 4-2 6-6 6s-6-2-6-6z"/><rect x="26" y="40" width="12" height="20" rx="3"/></svg>',
  ];
  var tileStyles = ["tile--a", "tile--b", "tile--c", "tile--a", "tile--d", "tile--c"];
  var fotos = C.fotos || [];
  var gItems = fotos.length ? fotos : (C.servicos || []).slice(0, 6);
  $("#galleryGrid").innerHTML = gItems.map(function (g, i) {
    var art = function (s) {
      return '<div class="tile__art">' + icons[i % icons.length] + '<p class="tile__label">' + esc(s ? s.nome : "") +
        "<small>" + esc(s ? s.descricao : "") + "</small></p></div>";
    };
    var inner = fotos.length
      ? '<img src="' + esc(g) + '" alt="Trabalho ' + (i + 1) + ' da ' + esc(C.nome) + '" loading="lazy" data-par>'
      : art(g);
    return '<figure class="tile ' + (fotos.length ? "" : tileStyles[i % tileStyles.length]) + '" data-reveal style="--d:' + ((i % 3) * 0.08).toFixed(2) + 's; margin:0">' + inner + "</figure>";
  }).join("");
  $$("#galleryGrid img").forEach(function (img) {
    img.addEventListener("error", function () { img.closest(".tile").classList.add("tile--a"); img.remove(); });
  });

  /* ---------------- Depoimentos ---------------- */
  var deps = C.depoimentos || [];
  $("#quotes").innerHTML = deps.map(function (d, i) {
    return '<blockquote class="quote' + (i === 0 ? " is-active" : "") + '"><p>“' + esc(d.texto) + '”</p><cite><b>' + esc(d.autor) + "</b> · " + esc(d.origem || "") + "</cite></blockquote>";
  }).join("");
  $("#quoteDots").innerHTML = deps.map(function (d, i) {
    return '<button type="button" role="tab" aria-label="Depoimento ' + (i + 1) + '" aria-selected="' + (i === 0) + '"></button>';
  }).join("");
  var qi = 0, qTimer = null;
  var qEls = $$(".quote"), qDots = $$("#quoteDots button");
  function showQuote(n) {
    qi = (n + qEls.length) % qEls.length;
    qEls.forEach(function (q, i) { q.classList.toggle("is-active", i === qi); });
    qDots.forEach(function (d, i) {
      d.setAttribute("aria-selected", "false");
      if (i === qi) { void d.offsetWidth; d.setAttribute("aria-selected", "true"); }
    });
  }
  function startQuotes() { stopQuotes(); if (!reduced && qEls.length > 1) qTimer = setInterval(function () { showQuote(qi + 1); }, 6000); }
  function stopQuotes() { if (qTimer) clearInterval(qTimer); qTimer = null; }
  qDots.forEach(function (d, i) { d.addEventListener("click", function () { showQuote(i); startQuotes(); }); });
  $(".quotes").addEventListener("mouseenter", stopQuotes);
  $(".quotes").addEventListener("mouseleave", startQuotes);
  startQuotes();

  /* ---------------- Horários ---------------- */
  $("#hours").innerHTML = (C.horariosTexto || []).map(function (h) {
    return "<dt>" + esc(h.dias) + "</dt><dd>" + esc(h.horas) + "</dd>";
  }).join("");

  /* =====================================================================
     AGENDAMENTO
     ===================================================================== */
  var state = { service: null, barber: null, day: null, time: null };
  var WEEK = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  var WEEK_FULL = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

  function pressGroup(container, btn) {
    $$("[aria-pressed]", container).forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
  }

  // Serviços
  var chipServices = $("#chipServices");
  chipServices.innerHTML = (C.servicos || []).map(function (s, i) {
    return '<button type="button" class="chip" aria-pressed="false" data-i="' + i + '">' + esc(s.nome) + " <small>" + brl(s.preco) + "</small></button>";
  }).join("");
  function selectService(i) {
    state.service = C.servicos[i];
    pressGroup(chipServices, chipServices.children[i]);
    renderTimes();
    updateSummary();
  }
  chipServices.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (b) selectService(+b.dataset.i);
  });
  // clicar num serviço da lista já seleciona e leva pro agendamento
  $("#servicesList").addEventListener("click", function (e) {
    var b = e.target.closest("[data-pick-service]"); if (!b) return;
    selectService(+b.dataset.pickService);
    $("#agendar").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  });

  // Barbeiros
  var chipBarbers = $("#chipBarbers");
  var barberList = [{ nome: "Sem preferência" }].concat(C.barbeiros || []);
  chipBarbers.innerHTML = barberList.map(function (b, i) {
    return '<button type="button" class="chip" aria-pressed="false" data-i="' + i + '">' + esc(b.nome) + "</button>";
  }).join("");
  chipBarbers.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    state.barber = barberList[+b.dataset.i].nome;
    pressGroup(chipBarbers, b); updateSummary();
  });

  // Dias
  var chipDays = $("#chipDays");
  var days = [];
  var today = new Date(); today.setHours(0, 0, 0, 0);
  for (var d = 0; d < (C.diasParaAgendar || 14); d++) {
    var dt = new Date(today); dt.setDate(today.getDate() + d); days.push(dt);
  }
  chipDays.innerHTML = days.map(function (dt, i) {
    var open = !!(C.funcionamento || {})[dt.getDay()];
    var lbl = i === 0 ? "hoje" : WEEK[dt.getDay()];
    return '<button type="button" class="day" aria-pressed="false" data-i="' + i + '"' + (open ? "" : " disabled") +
      ' aria-label="' + WEEK_FULL[dt.getDay()] + ", " + dt.getDate() + (open ? "" : " (fechado)") + '"><span>' + lbl + "</span><b>" + String(dt.getDate()).padStart(2, "0") + "</b></button>";
  }).join("");
  chipDays.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b || b.disabled) return;
    state.day = days[+b.dataset.i]; state.time = null;
    pressGroup(chipDays, b); renderTimes(); updateSummary();
  });

  // Horários
  var chipTimes = $("#chipTimes");
  function renderTimes() {
    if (!state.day) return;
    var hrs = (C.funcionamento || {})[state.day.getDay()];
    if (!hrs) { chipTimes.innerHTML = '<p class="muted small">Fechado neste dia.</p>'; return; }
    var step = C.intervaloMinutos || 30;
    var dur = state.service ? state.service.duracao : step;
    var now = new Date();
    var isToday = state.day.getTime() === today.getTime();
    var html = [];
    for (var m = hrs[0] * 60; m + dur <= hrs[1] * 60; m += step) {
      var hh = String(Math.floor(m / 60)).padStart(2, "0"), mm = String(m % 60).padStart(2, "0");
      var t = hh + ":" + mm;
      var past = isToday && m <= now.getHours() * 60 + now.getMinutes() + 30;
      html.push('<button type="button" class="chip" aria-pressed="' + (state.time === t && !past) + '" data-t="' + t + '"' + (past ? " disabled" : "") + ">" + t + "</button>");
    }
    if (state.time && !html.some(function (h) { return h.indexOf('data-t="' + state.time + '"') > -1 && h.indexOf("disabled") < 0; })) state.time = null;
    var anyFree = html.some(function (h) { return h.indexOf("disabled") < 0; });
    chipTimes.innerHTML = anyFree ? html.join("") : '<p class="muted small">Sem horários livres neste dia. Escolha outro.</p>';
  }
  chipTimes.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b || b.disabled) return;
    state.time = b.dataset.t; pressGroup(chipTimes, b); updateSummary();
  });

  // Resumo
  var nameInput = $("#clientName");
  function dayLabel(dt) { return WEEK_FULL[dt.getDay()] + ", " + String(dt.getDate()).padStart(2, "0") + "/" + String(dt.getMonth() + 1).padStart(2, "0"); }
  function updateSummary() {
    var parts = [];
    if (state.service) parts.push(state.service.nome);
    if (state.barber) parts.push(state.barber);
    if (state.day) parts.push(dayLabel(state.day));
    if (state.time) parts.push(state.time);
    $("#summaryLine").textContent = parts.length ? parts.join(" · ") : "Nada escolhido ainda.";
    $("#summaryPrice").textContent = state.service ? brl(state.service.preco) : "";
    $("#formError").textContent = "";
  }
  nameInput.addEventListener("input", function () { $("#formError").textContent = ""; });

  $("#bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    var missing = [];
    if (!state.service) missing.push("serviço");
    if (!state.barber) missing.push("barbeiro");
    if (!state.day) missing.push("dia");
    if (!state.time) missing.push("horário");
    if (!name) missing.push("seu nome");
    if (missing.length) {
      $("#formError").textContent = "Falta escolher: " + missing.join(", ") + ".";
      var s = $("#summary"); s.classList.remove("is-shake"); void s.offsetWidth; s.classList.add("is-shake");
      return;
    }
    var msg = "Olá! Quero agendar na " + C.nome + ":\n\n" +
      "• Serviço: " + state.service.nome + " (" + brl(state.service.preco) + ")\n" +
      "• Barbeiro: " + state.barber + "\n" +
      "• Dia: " + dayLabel(state.day) + "\n" +
      "• Horário: " + state.time + "\n" +
      "• Nome: " + name;
    window.open(waUrl(msg), "_blank", "noopener");
  });

  /* =====================================================================
     NAVEGAÇÃO
     ===================================================================== */
  var header = $("#header"), nav = $("#nav"), burger = $("#burger");
  function closeMenu() {
    nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menu"); document.body.classList.remove("menu-open");
  }
  burger.addEventListener("click", function () {
    var open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open); burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", open);
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  // link ativo
  if ("IntersectionObserver" in window) {
    var links = $$(".nav__link");
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["servicos", "equipe", "galeria", "contato"].forEach(function (id) { var el = document.getElementById(id); if (el) secObs.observe(el); });
  }

  /* =====================================================================
     ANIMAÇÕES
     ===================================================================== */
  // Entrada do hero
  function loaded() { document.body.classList.add("is-loaded"); }
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(function () { requestAnimationFrame(loaded); });
  } else { setTimeout(loaded, 100); }

  // Reveal ao rolar
  function countUp(el) {
    var end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, suf = el.dataset.suf || "";
    var fmt = function (v) { return v.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; };
    if (reduced) { el.textContent = fmt(end); return; }
    var t0 = null, D = 1600;
    function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / D, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * e);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var revealEls = $$("[data-reveal]");
  // stagger automático para irmãos sem --d definido
  revealEls.forEach(function (el) {
    if (el.style.getPropertyValue("--d")) return;
    var sibs = $$(":scope > [data-reveal]", el.parentElement);
    el.style.setProperty("--d", (sibs.indexOf(el) * 0.08).toFixed(2) + "s");
  });
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
    $$("[data-count]").forEach(countUp);
  }

  // Inclinação dos cartões da equipe (só mouse)
  if (finePointer && !reduced) {
    $$(".card").forEach(function (card) {
      var inner = $(".card__inner", card);
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        inner.style.transform = "rotateY(" + ((x - 0.5) * 10).toFixed(2) + "deg) rotateX(" + ((0.5 - y) * 10).toFixed(2) + "deg)";
        inner.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        inner.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      });
      card.addEventListener("pointerleave", function () { inner.style.transform = ""; });
    });
  }

  // Scroll: header, manifesto, parallax, botão flutuante
  var lastY = window.scrollY, ticking = false;
  var desktopMotion = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
  var parEls = $$("[data-speed]");
  var parImgs = $$("[data-par]");
  var waFloat = $(".wa-float"), booking = $("#agendar");

  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight;

    // header
    header.classList.toggle("is-scrolled", y > 40);
    if (!nav.classList.contains("is-open")) header.classList.toggle("is-hidden", y > lastY && y > 400);
    lastY = y;

    // manifesto: palavras acendem conforme a seção passa
    if (mWords.length) {
      var r = mt.getBoundingClientRect();
      var p = reduced ? 1 : Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
      var lit = Math.round(p * mWords.length);
      for (var i = 0; i < mWords.length; i++) mWords[i].classList.toggle("on", i < lit);
    }

    // parallax suave (desktop)
    if (desktopMotion.matches) {
      parEls.forEach(function (el) { el.style.translate = "0 " + (y * parseFloat(el.dataset.speed)).toFixed(1) + "px"; });
      parImgs.forEach(function (img) {
        var rr = img.parentElement.getBoundingClientRect();
        if (rr.bottom < 0 || rr.top > vh) return;
        var q = (rr.top + rr.height / 2 - vh / 2) / vh;
        img.style.translate = "0 " + (-7 - q * 7).toFixed(2) + "%";
      });
    }

    // esconde o botão flutuante quando o formulário está na tela
    var br = booking.getBoundingClientRect();
    waFloat.classList.toggle("is-hidden", br.top < vh * 0.6 && br.bottom > vh * 0.4);
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
