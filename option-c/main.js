/* Option C "Field Report": progressive enhancement only. Everything is visible without this file. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Stamps thunk in and rules draw across as they enter view */
  /* The hero stamp sits above the fold: thunk it in right away */
  var heroStamp = document.querySelector('.stamp--ticket');
  if (heroStamp) heroStamp.classList.add('is-in');

  var animated = document.querySelectorAll('.rule, .stamp-in');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    animated.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.2 });
    animated.forEach(function (el) { io.observe(el); });
    /* Safety net: never leave anything hidden */
    window.setTimeout(function () {
      animated.forEach(function (el) { el.classList.add('is-in'); });
    }, 6000);
  }

  /* Sample footage dialog */
  var dialog = document.getElementById('video-dialog');
  var frame = dialog && dialog.querySelector('.video-dialog__frame');
  var closeBtn = dialog && dialog.querySelector('.video-dialog__close');
  var opener = null;

  function cleanup() {
    var v = frame && frame.querySelector('video');
    if (v) {
      v.pause();
      v.removeAttribute('src');
      v.load();
      v.remove();
    }
    if (opener) {
      var o = opener;
      opener = null;
      o.focus();
    }
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
    cleanup();
  }

  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-video]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var name = btn.getAttribute('data-video');
        var small = window.matchMedia('(max-width: 899px)').matches;
        var video = document.createElement('video');
        video.controls = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.poster = '../assets/img/poster-' + name + '.webp';
        video.preload = 'metadata';
        video.src = '../assets/video/' + name + (small ? '-720' : '') + '.mp4';
        video.setAttribute('aria-label', 'Sample footage: a tractor crossing red-soil rows, seen from above');
        if (!reduceMotion) video.autoplay = true;
        frame.appendChild(video);
        dialog.showModal();
        closeBtn.focus();
      });
    });

    closeBtn.addEventListener('click', closeDialog);
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) closeDialog(); /* backdrop click */
    });
    /* Esc (cancel) and any other close path */
    dialog.addEventListener('close', cleanup);
  }

  /* Preview form: never sends */
  var form = document.getElementById('request-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      window.setTimeout(function () {
        status.textContent = 'Preview only. Nothing was sent.';
      }, 50);
    });
  }
})();
