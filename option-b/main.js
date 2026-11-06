/* Option B - "Red Dirt Iron". Progressive enhancement only: the page is complete without this file. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var narrow = window.matchMedia('(max-width: 899px)');

  /* ---------- Hero video: autoplay only when motion is OK ---------- */
  var video = document.querySelector('[data-hero-video]');
  var toggle = document.querySelector('[data-video-toggle]');

  function setToggle(paused) {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
    toggle.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    toggle.querySelector('.hero__toggle-label').textContent = paused ? 'Play' : 'Pause';
  }

  if (video && toggle) {
    toggle.hidden = false;

    if (!reduceMotion.matches) {
      video.autoplay = true;
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { setToggle(true); });
      }
      setToggle(false);
    } else {
      setToggle(true);
    }

    toggle.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        setToggle(false);
      } else {
        video.pause();
        setToggle(true);
      }
    });

    reduceMotion.addEventListener('change', function (e) {
      if (e.matches && !video.paused) { video.pause(); setToggle(true); }
    });
  }

  /* ---------- Scroll reveals (content is visible until this runs) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (!reduceMotion.matches && 'IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el) {
      // Anything already on screen at load is shown straight away (after the hero stagger).
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0 && !el.closest('.hero')) {
        el.classList.add('is-in');
      } else {
        io.observe(el);
      }
    });
    document.documentElement.classList.add('motion-ok');
    // The hero items fade in on the next frame so the stagger plays.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.querySelectorAll('.hero .reveal').forEach(function (el) { el.classList.add('is-in'); });
      });
    });
  }

  /* ---------- Sample footage dialog ---------- */
  var dialog = document.getElementById('footage');
  var opener = document.querySelector('[data-dialog-open="footage"]');
  var frame = dialog && dialog.querySelector('[data-footage-frame]');
  var closeBtn = dialog && dialog.querySelector('[data-dialog-close]');

  if (dialog && opener && frame && typeof dialog.showModal === 'function') {
    opener.hidden = false;

    opener.addEventListener('click', function () {
      var v = document.createElement('video');
      v.controls = true;
      v.muted = true;
      v.playsInline = true;
      v.setAttribute('playsinline', '');
      v.preload = 'auto';
      v.poster = '../assets/img/poster-aerial-tractor-red-soil.webp';
      v.src = narrow.matches
        ? '../assets/video/aerial-tractor-red-soil-720.mp4'
        : '../assets/video/aerial-tractor-red-soil.mp4';
      v.setAttribute('aria-label', 'Sample footage: aerial view of a tractor crossing red-soil rows');
      frame.appendChild(v);
      dialog.showModal();
      closeBtn.focus();
      if (!reduceMotion.matches) {
        var pp = v.play();
        if (pp && typeof pp.catch === 'function') pp.catch(function () {});
      }
    });

    closeBtn.addEventListener('click', function () { dialog.close(); });

    // Click on the backdrop closes too
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });

    // Esc fires "cancel" then "close"; both paths end here.
    dialog.addEventListener('close', function () {
      var v = frame.querySelector('video');
      if (v) {
        v.pause();
        v.removeAttribute('src');
        v.load();
        v.remove();
      }
      opener.focus();
    });
  }

  /* ---------- Preview form ---------- */
  var form = document.querySelector('[data-preview-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) {
        status.textContent = '';
        // Re-set on the next frame so repeat submits are announced again.
        requestAnimationFrame(function () { status.textContent = 'Preview only. Nothing was sent.'; });
      }
    });
  }
})();
