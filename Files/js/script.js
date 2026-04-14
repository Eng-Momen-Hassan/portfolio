'use strict';

/* ─── element toggle ─────────────────────────────────────────── */
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

/* ─── sidebar ────────────────────────────────────────────────── */
const sidebar    = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


/* ─── SCROLL PROGRESS BAR ────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const scrollTop  = window.scrollY || document.documentElement.scrollTop;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = pct + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
})();


/* ─── MATRIX RAIN ────────────────────────────────────────────── */
(function initMatrix() {
  const canvas  = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx     = canvas.getContext('2d');
  const GREEN   = '#00e639';
  const CHARS   = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[];:/\\';
  const FONT_SZ = 13;
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / FONT_SZ);
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -canvas.height / FONT_SZ));
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = FONT_SZ + 'px JetBrains Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const y    = drops[i] * FONT_SZ;
      ctx.fillStyle = drops[i] > 2 ? GREEN : '#afffaf';
      ctx.fillText(char, i * FONT_SZ, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  // Debounce resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
  setInterval(draw, 45);
})();


/* ─── CUSTOM CURSOR ──────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  }, { passive: true });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = 'a, button, .content-card, .project-item, .Certifications-item, .service-item, .arsenal-item, .proj-card-link';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  document.addEventListener('mousedown', () => dot.classList.add('clicked'));
  document.addEventListener('mouseup',   () => dot.classList.remove('clicked'));
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();


/* ─── TYPEWRITER EFFECT ──────────────────────────────────────── */
function runTypewriter() {
  const nameEl  = document.querySelector('.info-content .name');
  const titleEl = document.querySelector('.info-content .title');
  if (!nameEl || !titleEl) return;

  const nameText  = nameEl.textContent.trim();
  const titleText = titleEl.textContent.trim();

  function typeText(el, text, speed, callback) {
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.textContent = '█';
    el.appendChild(cursor);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i++]), cursor);
      } else {
        clearInterval(interval);
        cursor.remove();
        if (callback) setTimeout(callback, 300);
      }
    }, speed);
  }

  typeText(nameEl, nameText, 55, () => typeText(titleEl, titleText, 35));
}
document.addEventListener('DOMContentLoaded', runTypewriter);


/* ─── BOOT SEQUENCE ──────────────────────────────────────────── */
function runBootSequence() {
  const GREEN  = '#00e639';
  const GREEN2 = '#7effa0';
  const lines = [
    { text: '> Initializing secure connection...',  color: GREEN  },
    { text: '> Loading profile: Mo\'men Hassan...',  color: GREEN  },
    { text: '> Auth: OK | Role: NetSec Engineer',   color: GREEN2 },
    { text: '> Firewall: ACTIVE | Encryption: ON',  color: GREEN2 },
    { text: '> System ready. Welcome.',              color: GREEN  },
  ];

  const bootEl = document.createElement('div');
  bootEl.id = 'boot-terminal';
  Object.assign(bootEl.style, {
    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
    background: '#050505', zIndex: '99999',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'flex-start',
    padding: '40px',
    fontFamily: "'JetBrains Mono', monospace", fontSize: '14px',
    color: GREEN, pointerEvents: 'none',
  });

  const matrixHint = document.createElement('div');
  Object.assign(matrixHint.style, {
    position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
    opacity: '0.04',
    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,230,57,0.3) 3px, rgba(0,230,57,0.3) 4px)',
    pointerEvents: 'none',
  });
  bootEl.appendChild(matrixHint);
  document.body.appendChild(bootEl);

  let lineIndex = 0, charIndex = 0, currentLine = null;

  function nextLine() {
    if (lineIndex >= lines.length) {
      bootEl.style.transition = 'opacity 0.65s ease';
      bootEl.style.opacity = '0';
      setTimeout(() => bootEl.remove(), 750);
      return;
    }
    currentLine = document.createElement('p');
    Object.assign(currentLine.style, { margin: '5px 0', opacity: '0.92', color: lines[lineIndex].color });
    bootEl.appendChild(currentLine);
    charIndex = 0;
    typeChar();
  }

  function typeChar() {
    const text = lines[lineIndex].text;
    if (charIndex < text.length) {
      currentLine.textContent += text[charIndex++];
      setTimeout(typeChar, 22);
    } else {
      lineIndex++;
      setTimeout(nextLine, 260);
    }
  }
  nextLine();
}

document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('booted')) {
    sessionStorage.setItem('booted', '1');
    runBootSequence();
  }
});


/* ─── CV / CERT DOWNLOAD HANDLER ────────────────────────────── */
document.querySelectorAll('a[data-download]').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = this.href;
    link.download = this.dataset.filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});


/* ─── ACHIEVEMENTS MODAL ─────────────────────────────────────── */
const achievementsItems = document.querySelectorAll("[data-Achievements-item]");
const modalContainer    = document.querySelector("[data-modal-container]");
const modalCloseBtn     = document.querySelector("[data-modal-close-btn]");
const overlay           = document.querySelector("[data-overlay]");
const modalImg          = document.querySelector("[data-modal-img]");
const modalTitle        = document.querySelector("[data-modal-title]");
const modalText         = document.querySelector("[data-modal-text]");

const toggleAchievementsModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

achievementsItems.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src           = this.querySelector("[data-Achievements-avatar]").src;
    modalImg.alt           = this.querySelector("[data-Achievements-avatar]").alt;
    modalTitle.textContent = this.querySelector("[data-Achievements-title]").textContent;
    modalText.innerHTML    = this.querySelector("[data-Achievements-text]").innerHTML;
    toggleAchievementsModal();
  });
});

modalCloseBtn.addEventListener("click", toggleAchievementsModal);
overlay.addEventListener("click", toggleAchievementsModal);


/* ─── CUSTOM SELECT & FILTER ────────────────────────────────── */
const select      = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtns  = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () { elementToggleFunc(this); });

function filterFunc(selectedValue) {
  const sel = selectedValue.toLowerCase().trim();
  filterItems.forEach(item => {
    const cat = item.dataset.category.toLowerCase().trim();
    item.classList.toggle("active", sel === "all" || cat === sel);
  });
}

selectItems.forEach(opt => {
  opt.addEventListener("click", function () {
    const val = this.innerText;
    selectValue.innerText = val;
    select.classList.remove("active");
    filterFunc(val);
    filterBtns.forEach(b => b.classList.remove("active"));
    filterBtns[0].classList.add("active");
  });
});

let lastClickedBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const val = this.innerText.replace(/\d+/g, '').trim(); // strip count number
    selectValue.innerText = val;
    filterFunc(val);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});


/* ─── PROJECT DETAIL MODAL ───────────────────────────────────── */
(function initProjectModal() {
  const overlay   = document.getElementById('projModalOverlay');
  const closeBtn  = document.getElementById('projModalClose');
  const modalImg  = document.getElementById('projModalImg');
  const modalCat  = document.getElementById('projModalCat');
  const modalTitle = document.getElementById('projModalTitle');
  const modalDesc = document.getElementById('projModalDesc');
  const toolsList = document.getElementById('projModalTools');
  const modalLink = document.getElementById('projModalLink');

  if (!overlay) return;

  // Open modal on project card click
  document.querySelectorAll('.proj-card-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const item = this.closest('.project-item');
      if (!item) return;

      const img   = item.querySelector('.project-img img');
      const title = item.dataset.title || item.querySelector('.project-title')?.textContent;
      const desc  = item.dataset.desc  || 'No description available.';
      const tools = item.dataset.tools || '';
      const href  = item.dataset.link  || '#';
      const cat   = item.dataset.category || '';

      modalImg.src          = img ? img.src : '';
      modalImg.alt          = title;
      modalCat.textContent  = cat;
      modalTitle.textContent = title;
      modalDesc.textContent  = desc;
      modalLink.href = href;
      modalLink.style.display = href === '#' ? 'none' : 'inline-flex';

      // Build tool pills
      toolsList.innerHTML = '';
      tools.split(',').forEach(t => {
        const s = document.createElement('span');
        s.textContent = t.trim();
        toolsList.appendChild(s);
      });

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();


/* ─── CONTACT FORM ───────────────────────────────────────────── */
const form       = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn    = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});


/* ─── PAGE NAVIGATION ────────────────────────────────────────── */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages    = document.querySelectorAll("[data-page]");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    pages.forEach((page, i) => {
      const match = link.innerText.toLowerCase() === page.dataset.page;
      page.classList.toggle("active", match);
      navLinks[i].classList.toggle("active", match);
    });
    window.scrollTo(0, 0);
    if (link.innerText.toLowerCase() === 'resume') {
      setTimeout(animateSkillBars, 80);
      setTimeout(animateSkillCounters, 80);
    }
    if (link.innerText.toLowerCase() === 'about') {
      setTimeout(animateStats, 200);
    }
  });
});


/* ─── SKILL BAR ANIMATION ────────────────────────────────────── */
function animateSkillBars() {
  document.querySelectorAll('.skill-progress-fill').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    bar.style.clipPath = 'inset(0 100% 0 0)';
    requestAnimationFrame(() => setTimeout(() => {
      bar.style.width = w;
      bar.style.clipPath = 'inset(0 0% 0 0)';
    }, 40));
  });
}


/* ─── SKILL COUNTER ANIMATION ────────────────────────────────── */
function animateSkillCounters() {
  document.querySelectorAll('.skill-counter').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const dur = 1200, step = 16, steps = dur / step, inc = target / steps;
    let current = 0;
    el.textContent = '0';
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else { el.textContent = Math.floor(current); }
    }, step);
  });
}


/* ─── STATS COUNTER ANIMATION ────────────────────────────────── */
function animateStats() {
  document.querySelectorAll('.stat-value[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const dur = 1400, step = 16, steps = dur / step, inc = target / steps;
    let current = 0;
    el.textContent = '0';
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else { el.textContent = Math.floor(current); }
    }, step);
  });
}
document.addEventListener('DOMContentLoaded', () => setTimeout(animateStats, 600));


/* ─── RANDOM HEX GLITCH ON NAME ──────────────────────────────── */
function randomHexGlitch() {
  const nameEl = document.querySelector('.info-content .name');
  if (!nameEl) return;
  const original = nameEl.textContent;
  const hex = '0123456789ABCDEF';
  let count = 0;
  const id = setInterval(() => {
    if (count >= 5) { nameEl.textContent = original; clearInterval(id); return; }
    const arr = original.split('');
    arr[Math.floor(Math.random() * arr.length)] = hex[Math.floor(Math.random() * 16)];
    nameEl.textContent = arr.join('');
    count++;
  }, 55);
}
function scheduleGlitch() {
  const delay = 8000 + Math.random() * 7000;
  setTimeout(() => { randomHexGlitch(); scheduleGlitch(); }, delay);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(scheduleGlitch, 5000));


/* ─── SCROLL REVEAL (IntersectionObserver) ───────────────────── */
(function initScrollReveal() {
  const items = document.querySelectorAll('.timeline-item, .service-item, .skills-item, .arsenal-item, .project-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  items.forEach((item, i) => {
    item.style.opacity    = '0';
    item.style.transform  = 'translateY(18px)';
    item.style.transition = `opacity 0.5s ease ${i * 0.03}s, transform 0.5s ease ${i * 0.03}s`;
    observer.observe(item);
  });
})();


/* ─── NEON SIDEBAR GLOW ──────────────────────────────────────── */
(function initSidebarGlow() {
  const sb = document.querySelector('.sidebar');
  if (!sb) return;
  sb.addEventListener('mouseenter', () => {
    sb.style.borderColor = 'hsla(120, 100%, 45%, 0.30)';
    sb.style.boxShadow   = '0 0 30px hsla(120, 100%, 45%, 0.08)';
  });
  sb.addEventListener('mouseleave', () => {
    sb.style.borderColor = '';
    sb.style.boxShadow   = '';
  });
})();


/* ─── ATTACK LOGS ────────────────────────────────────────────── */
(function initLogs() {
  const logsBox = document.querySelector('.logs-box');
  if (!logsBox) return;

  const logs = [
    "Scanning ports...",
    "Brute force attempt detected",
    "Access denied",
    "Encryption enabled",
    "Packet sniffing...",
    "Firewall blocking attack",
    "Unauthorized login attempt",
    "Reverse shell blocked",
    "SYN flood detected",
    "SSL handshake established",
    "Anomaly detected on port 4444",
    "IDS alert: port scan from external IP"
  ];

  setInterval(() => {
    const line = document.createElement('p');
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    line.textContent = `[${timestamp}] [+] ${logs[Math.floor(Math.random() * logs.length)]}`;
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.3s ease';
    logsBox.prepend(line);
    requestAnimationFrame(() => { line.style.opacity = '1'; });
    if (logsBox.children.length > 8) logsBox.removeChild(logsBox.lastChild);
  }, 2000);
})();


/* ─── ARSENAL ITEM RIPPLE ────────────────────────────────────── */
(function initArsenalRipple() {
  document.querySelectorAll('.arsenal-item').forEach(item => {
    item.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect   = item.getBoundingClientRect();
      Object.assign(ripple.style, {
        position: 'absolute',
        borderRadius: '50%',
        background: 'hsla(120, 100%, 45%, 0.25)',
        width: '80px', height: '80px',
        left: (e.clientX - rect.left - 40) + 'px',
        top:  (e.clientY - rect.top  - 40) + 'px',
        transform: 'scale(0)',
        animation: 'ripple-out 0.5s ease forwards',
        pointerEvents: 'none',
      });
      item.style.position = 'relative';
      item.style.overflow = 'hidden';
      item.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple-out { to { transform: scale(2.5); opacity: 0; } }`;
  document.head.appendChild(style);
})();
