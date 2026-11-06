/* Equipment Experts | Option A "Diamond & Steel" (design preview) */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var smallScreen = window.matchMedia('(max-width: 899px)');

    /* ---------- Hero video: autoplay only when motion is OK ---------- */
    var video = document.querySelector('.hero-video');
    var toggle = document.querySelector('.video-toggle');

    function setToggleState(paused) {
        if (!toggle) return;
        toggle.classList.toggle('is-paused', paused);
        toggle.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    }

    if (video) {
        // Serve the 720p file under 900px even where <source media> is unsupported.
        var base = '../assets/video/aerial-combines-red-dirt-sunset';
        var wanted = base + (smallScreen.matches ? '-720.mp4' : '.mp4');
        if (video.currentSrc && video.currentSrc.indexOf(wanted.replace('../', '')) === -1) {
            video.src = wanted;
        }

        if (toggle) {
            toggle.hidden = false;
            setToggleState(true);
            toggle.addEventListener('click', function () {
                if (video.paused) {
                    var p = video.play();
                    if (p && p.catch) p.catch(function () { setToggleState(true); });
                } else {
                    video.pause();
                }
            });
        }

        video.addEventListener('play', function () { setToggleState(false); });
        video.addEventListener('pause', function () { setToggleState(true); });

        if (!reduceMotion.matches) {
            video.autoplay = true;
            var playAttempt = video.play();
            if (playAttempt && playAttempt.catch) {
                playAttempt.catch(function () { setToggleState(true); });
            }
        }
    }

    /* ---------- Modal "Sample footage" ---------- */
    var opener = document.querySelector('[data-footage]');
    var dialog = document.querySelector('.footage-dialog');

    if (opener && dialog && typeof dialog.showModal === 'function') {
        var stage = dialog.querySelector('.dialog-stage');
        var closeBtn = dialog.querySelector('.dialog-close');
        var srcBase = opener.getAttribute('data-footage');

        opener.addEventListener('click', function (e) {
            e.preventDefault();
            var v = document.createElement('video');
            v.controls = true;
            v.playsInline = true;
            v.muted = true;
            v.preload = 'auto';
            v.poster = '../assets/img/poster-aerial-tractor-red-soil.webp';
            v.setAttribute('aria-label', 'Sample footage: aerial view of a tractor crossing red-soil rows');
            v.src = srcBase + (smallScreen.matches ? '-720.mp4' : '.mp4');
            stage.appendChild(v);
            dialog.showModal();
            closeBtn.focus();
            if (!reduceMotion.matches) {
                var p = v.play();
                if (p && p.catch) p.catch(function () {});
            }
        });

        closeBtn.addEventListener('click', function () { dialog.close(); });

        // Click on the backdrop closes too.
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog) dialog.close();
        });

        // Fires for Esc and for close(): remove the video and restore focus.
        dialog.addEventListener('close', function () {
            var v = stage.querySelector('video');
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
    var form = document.querySelector('.request-form');
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

    /* ---------- Diamond rules drawing in (opt-in, motion OK only) ---------- */
    if (!reduceMotion.matches && 'IntersectionObserver' in window) {
        // Above the fold: header band, hero chains. Pure CSS keyframes, added only when motion is OK.
        document.querySelectorAll('.site-header .draw, .hero .draw').forEach(function (el) {
            el.classList.add('draw-now');
        });
        var seam = document.querySelector('.hero-media');
        if (seam) seam.classList.add('draw-seam');
        var rules = document.querySelectorAll('main > .draw, .section .draw');
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-drawn');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        rules.forEach(function (el) {
            el.classList.add('will-draw');
            // Let the hidden state paint before observing so above-the-fold rules still animate.
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () { io.observe(el); });
            });
        });
    }
})();
