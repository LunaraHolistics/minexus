/**
 * ARCHIVE + NEXUS Audio System v4.0 — Som procedural de cinema
 * UI + ambientes + ticking + SIRENE / TIROS / ALGEMAS / RÁDIO
 */
(function () {
  "use strict";
  var STORAGE_KEY = "nexus_audio_prefs";
  var audioCtx = null,
    masterGain = null,
    isMuted = false,
    isSupported = true,
    masterVolume = 0.3,
    initialized = false;

  function loadPreferences() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        var p = JSON.parse(s);
        isMuted = !!p.muted;
        masterVolume =
          typeof p.volume === "number"
            ? Math.max(0, Math.min(1, p.volume))
            : 0.3;
        return;
      }
    } catch (e) {}
    isMuted = false;
    masterVolume = 0.3;
  }
  function savePreferences() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ muted: isMuted, volume: masterVolume }),
      );
    } catch (e) {}
  }
  function initAudioContext() {
    if (initialized) return audioCtx;
    try {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) {
        isSupported = false;
        return null;
      }
      audioCtx = new C();
      masterGain = audioCtx.createGain();
      masterGain.connect(audioCtx.destination);
      updateMasterVolume();
      initialized = true;
      return audioCtx;
    } catch (e) {
      isSupported = false;
      return null;
    }
  }
  function ctx() {
    if (!audioCtx) initAudioContext();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(function () {});
    }
    return audioCtx;
  }
  function updateMasterVolume() {
    if (masterGain) {
      masterGain.gain.setValueAtTime(
        isMuted ? 0 : masterVolume,
        audioCtx.currentTime,
      );
    }
  }

  function noiseBuffer(sec) {
    var c = ctx();
    if (!c) return null;
    var len = Math.floor(c.sampleRate * sec),
      b = c.createBuffer(1, len, c.sampleRate),
      d = b.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  function playTone(freq, type, dur, vol) {
    vol = typeof vol === "number" ? vol : 0.1;
    if (!isSupported) return;
    var c = ctx();
    if (!c) return;
    try {
      var o = c.createOscillator(),
        g = c.createGain();
      o.type = type || "sine";
      o.frequency.setValueAtTime(freq, c.currentTime);
      var t = c.currentTime,
        a = Math.min(0.01, dur * 0.1);
      g.gain.setValueAtTime(0.001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + a);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g);
      g.connect(masterGain || c.destination);
      o.start(t);
      o.stop(t + dur);
    } catch (e) {}
  }
  function playSweep(f0, f1, dur, type, vol) {
    vol = typeof vol === "number" ? vol : 0.1;
    var c = ctx();
    if (!c) return;
    try {
      var o = c.createOscillator(),
        g = c.createGain();
      o.type = type || "sawtooth";
      o.frequency.setValueAtTime(f0, c.currentTime);
      o.frequency.exponentialRampToValueAtTime(
        Math.max(f1, 0.001),
        c.currentTime + dur,
      );
      g.gain.setValueAtTime(vol, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      o.connect(g);
      g.connect(masterGain || c.destination);
      o.start(c.currentTime);
      o.stop(c.currentTime + dur);
    } catch (e) {}
  }
  function playNoise(dur, vol) {
    vol = typeof vol === "number" ? vol : 0.02;
    var c = ctx();
    if (!c) return;
    try {
      var s = c.createBufferSource();
      s.buffer = noiseBuffer(dur);
      var g = c.createGain();
      g.gain.setValueAtTime(vol, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      var f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(2000, c.currentTime);
      s.connect(f);
      f.connect(g);
      g.connect(masterGain || c.destination);
      s.start(c.currentTime);
      s.stop(c.currentTime + dur);
    } catch (e) {}
  }

  /* ---------- SFX de UI ---------- */
  function playClick() {
    playTone(880, "sine", 0.04, 0.08);
  }
  function playSoftClick() {
    playTone(660, "sine", 0.03, 0.04);
  }
  function playHover() {
    playTone(1200, "sine", 0.025, 0.02);
  }
  function playSuccess() {
    playTone(523.25, "sine", 0.12, 0.12);
    setTimeout(function () {
      playTone(659.25, "sine", 0.12, 0.12);
    }, 80);
    setTimeout(function () {
      playTone(783.99, "sine", 0.18, 0.12);
    }, 160);
  }
  function playSuccessShort() {
    playTone(880, "sine", 0.08, 0.1);
    setTimeout(function () {
      playTone(1108.73, "sine", 0.1, 0.1);
    }, 60);
  }
  function playError() {
    playTone(220, "sawtooth", 0.15, 0.1);
    setTimeout(function () {
      playTone(150, "sawtooth", 0.2, 0.1);
    }, 150);
    playNoise(0.2, 0.03);
  }
  function playWarning() {
    playTone(440, "square", 0.08, 0.06);
    setTimeout(function () {
      playTone(440, "square", 0.08, 0.06);
    }, 150);
  }
  function playBoot() {
    playSweep(100, 800, 0.4, "sawtooth", 0.06);
    setTimeout(function () {
      playTone(440, "sine", 0.1, 0.08);
    }, 400);
    setTimeout(function () {
      playTone(659.25, "sine", 0.2, 0.1);
    }, 600);
    playNoise(0.5, 0.015);
  }
  function playLogin() {
    playTone(293.66, "sine", 0.1, 0.1);
    setTimeout(function () {
      playTone(440, "sine", 0.1, 0.1);
    }, 100);
    setTimeout(function () {
      playTone(587.33, "sine", 0.2, 0.12);
    }, 200);
  }
  function playLogout() {
    playTone(587.33, "sine", 0.1, 0.1);
    setTimeout(function () {
      playTone(440, "sine", 0.1, 0.1);
    }, 100);
    setTimeout(function () {
      playTone(293.66, "sine", 0.2, 0.1);
    }, 200);
  }
  function playTransition() {
    playSweep(300, 600, 0.15, "sine", 0.06);
    playNoise(0.1, 0.02);
  }
  function playNotification() {
    playTone(1318.51, "sine", 0.06, 0.1);
    setTimeout(function () {
      playTone(1567.98, "sine", 0.1, 0.1);
    }, 70);
  }
  function playSelect() {
    playTone(659.25, "triangle", 0.08, 0.1);
    setTimeout(function () {
      playTone(987.77, "triangle", 0.1, 0.1);
    }, 50);
  }
  function playDeselect() {
    playTone(987.77, "triangle", 0.08, 0.1);
    setTimeout(function () {
      playTone(659.25, "triangle", 0.1, 0.1);
    }, 50);
  }
  function playType() {
    playTone(1800 + Math.random() * 200, "square", 0.015, 0.02);
  }
  function playMissionAccept() {
    playTone(523.25, "sine", 0.2, 0.1);
    playTone(659.25, "sine", 0.2, 0.1);
    playTone(783.99, "sine", 0.2, 0.1);
    setTimeout(function () {
      playSweep(400, 1200, 0.3, "sine", 0.08);
    }, 250);
  }
  function playMissionComplete() {
    [523.25, 659.25, 783.99, 1046.5].forEach(function (n, i) {
      setTimeout(function () {
        playTone(n, "sine", 0.15, 0.12);
      }, i * 120);
    });
    setTimeout(function () {
      playSweep(1500, 3000, 0.4, "sine", 0.05);
    }, 500);
  }
  function playArtifactFound() {
    playTone(261.63, "sine", 0.3, 0.08);
    playTone(523.25, "sine", 0.3, 0.06);
    setTimeout(function () {
      playTone(783.99, "triangle", 0.4, 0.08);
    }, 200);
    playNoise(0.4, 0.02);
  }

  /* ---------- 🚨 SIRENE DE POLÍCIA (loop) ---------- */
  var sirenNodes = null;
  function startSiren() {
    var c = ctx();
    if (!c || sirenNodes) return;
    try {
      var o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = 700;
      var bp = c.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 900;
      bp.Q.value = 2;
      var g = c.createGain();
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.linearRampToValueAtTime(0.045, c.currentTime + 0.6);
      var lfo = c.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.5;
      var lg = c.createGain();
      lg.gain.value = 350;
      lfo.connect(lg);
      lg.connect(o.frequency);
      o.connect(bp);
      bp.connect(g);
      g.connect(masterGain);
      o.start();
      lfo.start();
      sirenNodes = { o: o, lfo: lfo, g: g };
    } catch (e) {}
  }
  function stopSiren() {
    if (!sirenNodes) return;
    var c = ctx();
    var n = sirenNodes;
    sirenNodes = null;
    try {
      n.g.gain.setTargetAtTime(0.0001, c.currentTime, 0.2);
      setTimeout(function () {
        try {
          n.o.stop();
          n.lfo.stop();
        } catch (e) {}
      }, 400);
    } catch (e) {}
  }

  /* ---------- 🔫 TIROS ---------- */
  function playGunshot() {
    var c = ctx();
    if (!c) return;
    var t = c.currentTime;
    try {
      var s = c.createBufferSource();
      s.buffer = noiseBuffer(0.3);
      var f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(3000, t);
      f.frequency.exponentialRampToValueAtTime(200, t + 0.25);
      var g = c.createGain();
      g.gain.setValueAtTime(0.5, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      s.connect(f);
      f.connect(g);
      g.connect(masterGain);
      s.start(t);
      var o = c.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(120, t);
      o.frequency.exponentialRampToValueAtTime(40, t + 0.2);
      var og = c.createGain();
      og.gain.setValueAtTime(0.4, t);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.connect(og);
      og.connect(masterGain);
      o.start(t);
      o.stop(t + 0.25);
    } catch (e) {}
  }
  function playGunshots(n) {
    n = n || 3;
    for (var i = 0; i < n; i++) {
      setTimeout(playGunshot, i * (180 + Math.random() * 120));
    }
  }

  /* ---------- ⛓️ ALGEMAS + 📻 RÁDIO ---------- */
  function playHandcuffs() {
    var c = ctx();
    if (!c) return;
    var t = c.currentTime;
    [0, 0.12].forEach(function (off) {
      var o = c.createOscillator();
      o.type = "square";
      o.frequency.value = 2200;
      var g = c.createGain();
      var st = t + off;
      g.gain.setValueAtTime(0.0001, st);
      g.gain.exponentialRampToValueAtTime(0.08, st + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, st + 0.08);
      o.connect(g);
      g.connect(masterGain);
      o.start(st);
      o.stop(st + 0.1);
    });
  }
  function playRadioStatic() {
    var c = ctx();
    if (!c) return;
    var t = c.currentTime;
    var s = c.createBufferSource();
    s.buffer = noiseBuffer(0.25);
    var f = c.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 1500;
    var g = c.createGain();
    g.gain.setValueAtTime(0.04, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    s.connect(f);
    f.connect(g);
    g.connect(masterGain);
    s.start(t);
  }

  /* ---------- Ambientes ---------- */
  var ambient = null;
  function stopAmbient() {
    if (ambient) {
      try {
        ambient.src.stop();
      } catch (e) {}
      if (ambient.extra)
        try {
          ambient.extra.stop();
        } catch (e) {}
      if (ambient.lfo)
        try {
          ambient.lfo.stop();
        } catch (e) {}
      ambient = null;
    }
  }
  function startRain() {
    stopAmbient();
    var c = ctx();
    if (!c) return;
    var s = c.createBufferSource();
    s.buffer = noiseBuffer(2);
    s.loop = true;
    var hp = c.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 500;
    var lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 6000;
    var g = c.createGain();
    g.gain.value = 0.04;
    s.connect(hp);
    hp.connect(lp);
    lp.connect(g);
    g.connect(masterGain);
    s.start();
    ambient = { src: s, g: g };
  }
  function startWind() {
    stopAmbient();
    var c = ctx();
    if (!c) return;
    var s = c.createBufferSource();
    s.buffer = noiseBuffer(3);
    s.loop = true;
    var bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 400;
    bp.Q.value = 0.8;
    var lfo = c.createOscillator();
    lfo.frequency.value = 0.1;
    var lg = c.createGain();
    lg.gain.value = 200;
    lfo.connect(lg);
    lg.connect(bp.frequency);
    var g = c.createGain();
    g.gain.value = 0.06;
    s.connect(bp);
    bp.connect(g);
    g.connect(masterGain);
    s.start();
    lfo.start();
    ambient = { src: s, g: g, lfo: lfo };
  }
  function startDrone() {
    stopAmbient();
    var c = ctx();
    if (!c) return;
    var o1 = c.createOscillator(),
      o2 = c.createOscillator();
    o1.type = "sawtooth";
    o2.type = "sawtooth";
    o1.frequency.value = 55;
    o2.frequency.value = 55.7;
    var lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 300;
    var g = c.createGain();
    g.gain.value = 0.03;
    o1.connect(lp);
    o2.connect(lp);
    lp.connect(g);
    g.connect(masterGain);
    o1.start();
    o2.start();
    ambient = { src: o1, g: g, extra: o2 };
  }

  /* ---------- Ticking ---------- */
  var tickTimer = null,
    tickAlt = false,
    intensity = 0.3;
  function tick(f, v) {
    playTone(f, "square", 0.04, v);
  }
  function heartbeat() {
    var c = ctx();
    if (!c) return;
    var t = c.currentTime;
    [0, 0.18].forEach(function (off) {
      var o = c.createOscillator();
      o.type = "sine";
      o.frequency.value = 55;
      var g = c.createGain();
      var st = t + off;
      g.gain.setValueAtTime(0.0001, st);
      g.gain.exponentialRampToValueAtTime(0.2, st + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, st + 0.12);
      o.connect(g);
      g.connect(masterGain);
      o.start(st);
      o.stop(st + 0.15);
    });
  }
  function startTicking() {
    var c = ctx();
    if (!c || tickTimer) return;
    tickTimer = setInterval(function () {
      tick(tickAlt ? 1500 : 2200, (tickAlt ? 0.04 : 0.07) + intensity * 0.04);
      tickAlt = !tickAlt;
      if (intensity > 0.6) heartbeat();
    }, 1000);
  }
  function stopTicking() {
    if (tickTimer) {
      clearInterval(tickTimer);
      tickTimer = null;
    }
  }
  function setIntensity(v) {
    intensity = Math.max(0, Math.min(1, v));
  }

  /* ---------- Auto-adaptação por tela ---------- */
  function observe(sel, cb) {
    var last = null;
    function chk() {
      var now = !!document.querySelector(sel);
      if (now !== last) {
        last = now;
        cb(now);
      }
    }
    try {
      var mo = new MutationObserver(chk);
      mo.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    } catch (e) {}
    setTimeout(chk, 300);
  }
  var path = location.pathname;
  function scene() {
    if (path.indexOf("06-captura") > -1) {
      startTicking();
      setIntensity(0.3);
      observe(".decision-panel", function (on) {
        setIntensity(on ? 1 : 0.3);
      });
      observe(".stamp.captured", function (on) {
        if (on) {
          stopTicking();
        }
      });
    } else if (path.indexOf("04-cidade") > -1) {
      var city = "";
      try {
        var d = JSON.parse(localStorage.getItem("minexus_case_001"));
        var cur = (d.cities || []).find(function (x) {
          return x.current;
        });
        city = cur ? cur.name : "";
      } catch (e) {}
      if (/Tóquio|Londres|Paris/.test(city)) startRain();
      else if (/Cusco|Cairo|Luxor|Atenas/.test(city)) startWind();
      else startDrone();
    } else if (path.indexOf("03-globo") > -1) {
      startDrone();
      observe(".travel-overlay.active", function (on) {
        if (on) {
          playSweep(200, 3000, 1, "bandpass", 0.1);
          startWind();
        } else {
          stopAmbient();
          startDrone();
        }
      });
    } else if (
      path.indexOf("05-crimenet") > -1 ||
      path.indexOf("07-museu") > -1
    ) {
      startDrone();
    }
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", scene);
  else scene();

  /* ---------- Mute ---------- */
  function toggleMute() {
    isMuted = !isMuted;
    if (masterGain) updateMasterVolume();
    savePreferences();
    var b = document.getElementById("nexus-mute");
    if (b) b.textContent = isMuted ? "🔇" : "🔊";
    if (!isMuted) playClick();
    return isMuted;
  }
  (function () {
    function make() {
      if (document.getElementById("nexus-mute")) return;
      var b = document.createElement("button");
      b.id = "nexus-mute";
      b.textContent = isMuted ? "🔇" : "";
      b.style.cssText =
        "position:fixed;bottom:12px;right:12px;z-index:999;width:40px;height:40px;border-radius:50%;border:1px solid #C5A059;background:rgba(10,13,18,.8);color:#e9c176;font-size:16px;cursor:pointer;";
      b.onclick = function () {
        toggleMute();
      };
      document.body.appendChild(b);
    }
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", make);
    else make();
  })();

  window.ArchiveAudio = {
    init: function () {
      loadPreferences();
      initAudioContext();
      return Promise.resolve(true);
    },
    playClick: playClick,
    playSoftClick: playSoftClick,
    playHover: playHover,
    playSuccess: playSuccess,
    playSuccessShort: playSuccessShort,
    playError: playError,
    playWarning: playWarning,
    playBoot: playBoot,
    playLogin: playLogin,
    playLogout: playLogout,
    playTransition: playTransition,
    playNotification: playNotification,
    playSelect: playSelect,
    playDeselect: playDeselect,
    playType: playType,
    playMissionAccept: playMissionAccept,
    playMissionComplete: playMissionComplete,
    playArtifactFound: playArtifactFound,
    startSiren: startSiren,
    stopSiren: stopSiren,
    playGunshot: playGunshot,
    playGunshots: playGunshots,
    playHandcuffs: playHandcuffs,
    playRadioStatic: playRadioStatic,
    startRain: startRain,
    startWind: startWind,
    startDrone: startDrone,
    stopAmbient: stopAmbient,
    startTicking: startTicking,
    stopTicking: stopTicking,
    setIntensity: setIntensity,
    toggleMute: toggleMute,
    setMuted: function (m) {
      isMuted = !!m;
      updateMasterVolume();
      savePreferences();
    },
    isMuted: function () {
      return isMuted;
    },
    setVolume: function (v) {
      masterVolume = Math.max(0, Math.min(1, v));
      updateMasterVolume();
      savePreferences();
    },
    getVolume: function () {
      return masterVolume;
    },
    isSupported: function () {
      return isSupported;
    },
    resume: function () {
      if (audioCtx && audioCtx.state === "suspended") return audioCtx.resume();
      return Promise.resolve();
    },
  };
  loadPreferences();
  function autoInit() {
    initAudioContext();
    document.removeEventListener("click", autoInit);
    document.removeEventListener("keydown", autoInit);
    document.removeEventListener("touchstart", autoInit);
  }
  document.addEventListener("click", autoInit, { passive: true });
  document.addEventListener("keydown", autoInit, { passive: true });
  document.addEventListener("touchstart", autoInit, { passive: true });
  console.log("[AUDIO] v4.0 — sirene/tiros/algemas/rádio ativos");
})();
