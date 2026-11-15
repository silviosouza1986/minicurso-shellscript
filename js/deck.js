/* Minicurso: Terminal Linux e Shell Script — navegação do deck.
   Palco 1920×1080, hash #/N, passos (.step), cronômetro, atalhos. */
(function () {
  'use strict';

  var W = 1920, H = 1080;
  var stage = document.getElementById('stage');
  var slides = Array.prototype.slice.call(document.querySelectorAll('#deck > .slide'));
  var N = slides.length;
  var counter = document.getElementById('counter');
  var progress = document.getElementById('progress');
  var timerEl = document.getElementById('timer');
  var notesEl = document.getElementById('notes');
  var notesBody = document.getElementById('notes-body');
  var ovEl = document.getElementById('overview');
  var ovGrid = document.getElementById('ov-grid');
  var helpEl = document.getElementById('help');

  var cur = -1;
  var origin = -1; // slide de onde o usuário saiu com E ou C (tecla B volta)
  var state = slides.map(function (sl) {
    return { steps: Array.prototype.slice.call(sl.querySelectorAll('.step')), shown: 0, all: false };
  });

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- Palco: escala para caber na janela (letterbox) ---------- */
  function fit() {
    var s = Math.min(window.innerWidth / W, window.innerHeight / H);
    stage.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
  }
  window.addEventListener('resize', function () { fit(); scaleThumbs(); });
  fit();

  /* ---------- Passos ---------- */
  function reveal(i, upto) {
    var st = state[i];
    st.shown = upto;
    st.steps.forEach(function (el, j) { el.classList.toggle('on', j < upto); });
  }

  /* ---------- Troca de slide ---------- */
  function show(i, revealAll) {
    if (i < 0 || i >= N || i === cur) return;
    if (cur >= 0) slides[cur].classList.remove('active');
    cur = i;
    var sl = slides[i];
    sl.classList.add('active');
    state[i].all = !!revealAll;
    reveal(i, revealAll ? state[i].steps.length : 0);

    counter.textContent = pad(i + 1) + ' / ' + N;
    progress.style.width = ((i + 1) / N * 100) + '%';
    document.title = 'Terminal Linux e Shell Script · ' + pad(i + 1) + '/' + N;
    try { history.replaceState(null, '', '#/' + (i + 1)); } catch (e) {}

    var layout = sl.getAttribute('data-layout');
    stage.classList.toggle('no-footer', layout === 'cover' || layout === 'closing');

    stopTimer();
    armTimer(sl);

    var notes = sl.getAttribute('data-notes') || '';
    notesBody.textContent = notes;
    notesEl.dataset.has = notes ? '1' : '';
  }

  function next() {
    var st = state[cur];
    if (st.shown < st.steps.length) { reveal(cur, st.shown + 1); return; }
    show(cur + 1, false);
  }
  function prev() {
    var st = state[cur];
    if (!st.all && st.shown > 0) { reveal(cur, st.shown - 1); return; }
    show(cur - 1, true);
  }
  function revealAll() {
    reveal(cur, state[cur].steps.length);
    state[cur].all = false; // ← ainda pode esconder passo a passo
  }

  /* ---------- Hash #/N ---------- */
  function hashIndex() {
    var m = location.hash.match(/^#\/(\d+)/);
    return m ? parseInt(m[1], 10) - 1 : -1;
  }
  window.addEventListener('hashchange', function () {
    var i = hashIndex();
    if (i >= 0 && i !== cur) show(i, true);
  });

  function jumpToId(id) {
    for (var i = 0; i < N; i++) {
      if (slides[i].id === id) {
        if (i !== cur) origin = cur;
        show(i, true);
        return true;
      }
    }
    return false;
  }

  /* ---------- Cronômetro regressivo (T pausa/retoma, R reinicia) ---------- */
  var T = null;
  function armTimer(sl) {
    var m = parseFloat(sl.getAttribute('data-timer'));
    T = m > 0 ? { total: Math.round(m * 60), left: Math.round(m * 60), running: false, ended: false, active: false, iv: 0, endAt: 0 } : null;
    renderTimer();
  }
  function stopTimer() { if (T && T.iv) { clearInterval(T.iv); T.iv = 0; } }
  function fmt(s) { return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }
  function renderTimer() {
    if (!T || !T.active) { timerEl.hidden = true; timerEl.className = ''; return; }
    timerEl.hidden = false;
    timerEl.textContent = fmt(T.left);
    timerEl.className =
      (T.left <= 60 ? 'red' : T.left <= 300 ? 'amber' : '') +
      (T.ended ? ' ended' : '') +
      (slides[cur].getAttribute('data-layout') === 'break' ? ' giant' : '');
  }
  function tick() {
    if (!T || !T.running) return;
    T.left = Math.max(0, Math.round((T.endAt - Date.now()) / 1000));
    if (T.left === 0) { T.running = false; T.ended = true; stopTimer(); }
    renderTimer();
  }
  function toggleTimer() {
    if (!T || T.ended) return;
    T.active = true;
    T.running = !T.running;
    if (T.running) { T.endAt = Date.now() + T.left * 1000; if (!T.iv) T.iv = setInterval(tick, 200); }
    renderTimer();
  }
  function resetTimer() {
    if (!T) return;
    T.left = T.total; T.ended = false; T.active = true;
    if (T.running) T.endAt = Date.now() + T.left * 1000;
    renderTimer();
  }

  /* ---------- Notas (N) ---------- */
  function toggleNotes() {
    if (!notesEl.dataset.has) return;
    notesEl.hidden = !notesEl.hidden;
  }

  /* ---------- Visão geral (O) ---------- */
  var ovBuilt = false;
  function scaleThumbs() {
    if (!ovBuilt) return;
    Array.prototype.forEach.call(ovGrid.querySelectorAll('.thumb-in'), function (el) {
      el.style.transform = 'scale(' + (el.parentNode.clientWidth / W) + ')';
    });
  }
  function buildOverview() {
    ovBuilt = true;
    slides.forEach(function (sl, i) {
      var b = document.createElement('div');
      b.className = 'thumb';
      b.setAttribute('role', 'button');
      b.setAttribute('tabindex', '0');
      b.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
      var num = document.createElement('span');
      num.className = 'thumb-num';
      num.textContent = pad(i + 1);
      var inner = document.createElement('div');
      inner.className = 'thumb-in';
      var clone = sl.cloneNode(true);
      clone.removeAttribute('id');
      clone.classList.add('active');
      Array.prototype.forEach.call(clone.querySelectorAll('.step'), function (x) { x.classList.add('on'); });
      inner.appendChild(clone);
      b.appendChild(num);
      b.appendChild(inner);
      function go() { ovEl.hidden = true; origin = -1; show(i, true); }
      b.addEventListener('click', go);
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
      ovGrid.appendChild(b);
    });
  }
  function toggleOverview() {
    if (ovEl.hidden) {
      if (!ovBuilt) buildOverview();
      Array.prototype.forEach.call(ovGrid.children, function (el, i) {
        el.classList.toggle('cur', i === cur);
      });
      ovEl.hidden = false;
      scaleThumbs();
      var c = ovGrid.children[cur];
      if (c && c.scrollIntoView) c.scrollIntoView({ block: 'center' });
    } else {
      ovEl.hidden = true;
    }
  }

  /* ---------- Ajuda (?) ---------- */
  function toggleHelp() { helpEl.hidden = !helpEl.hidden; }
  function closeOverlays() { ovEl.hidden = true; helpEl.hidden = true; }

  /* ---------- Tela cheia (F) ---------- */
  function toggleFullscreen() {
    if (document.fullscreenElement) { document.exitFullscreen(); }
    else if (document.documentElement.requestFullscreen) { document.documentElement.requestFullscreen(); }
  }

  /* ---------- Teclado ---------- */
  window.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    var overlayOpen = !ovEl.hidden || !helpEl.hidden;

    if (k === 'Escape') { closeOverlays(); return; }
    if (k === '?') { e.preventDefault(); if (!ovEl.hidden) ovEl.hidden = true; toggleHelp(); return; }
    if (k === 'o' || k === 'O') { e.preventDefault(); helpEl.hidden = true; toggleOverview(); return; }
    if (k === 'n' || k === 'N') { toggleNotes(); return; }

    if (overlayOpen) {
      // Navegação com sobreposição aberta: fecha e continua
      if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'ArrowLeft' || k === 'PageUp' ||
          k === 'Home' || k === 'End' || k === 'Enter') { closeOverlays(); }
      else { return; }
    }

    switch (k) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        if (e.shiftKey) revealAll(); else next();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prev();
        break;
      case 'Home': e.preventDefault(); origin = -1; show(0, true); break;
      case 'End': e.preventDefault(); origin = -1; show(N - 1, true); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case 't': case 'T': toggleTimer(); break;
      case 'r': case 'R': resetTimer(); break;
      case 'e': case 'E': jumpToId('a1'); break;
      case 'c': case 'C': jumpToId('a2'); break;
      case 'b': case 'B':
        if (origin >= 0) { var o = origin; origin = -1; show(o, true); }
        break;
    }
  });

  /* ---------- Clique: metade direita avança, esquerda volta ---------- */
  stage.addEventListener('click', function (e) {
    if (!ovEl.hidden || !helpEl.hidden) return;
    if (e.target.closest && e.target.closest('.overlay, #notes, a, button, .thumb')) return;
    if (e.clientX > window.innerWidth / 2) next(); else prev();
  });

  /* ---------- Toque: swipe ---------- */
  var tX = null, tY = null;
  stage.addEventListener('touchstart', function (e) {
    tX = e.touches[0].clientX; tY = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (tX === null) return;
    var dx = e.changedTouches[0].clientX - tX;
    var dy = e.changedTouches[0].clientY - tY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next(); else prev();
    }
    tX = tY = null;
  }, { passive: true });

  /* ---------- Início: hash #/N ou slide 1 ---------- */
  var start = hashIndex();
  show(start >= 0 ? start : 0, start >= 0);
})();
