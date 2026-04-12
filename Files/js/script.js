'use strict';

/* ─── element toggle ─────────────────────────────────────────── */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/* ─── sidebar ────────────────────────────────────────────────── */
const sidebar    = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

/* ─── typewriter effect ──────────────────────────────────────── */
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

/* ─── CV / cert download handler (removed inline onclick) ────── */
document.querySelectorAll('a[data-download]').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href     = this.href;
    link.download = this.dataset.filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

/* ─── achievements modal ─────────────────────────────────────── */
const achievementsItems = document.querySelectorAll("[data-Achievements-item]");
const modalContainer    = document.querySelector("[data-modal-container]");
const modalCloseBtn     = document.querySelector("[data-modal-close-btn]");
const overlay           = document.querySelector("[data-overlay]");

const modalImg   = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText  = document.querySelector("[data-modal-text]");

const toggleAchievementsModal = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

achievementsItems.forEach(item => {
  item.addEventListener("click", function () {
    const avatar = this.querySelector("[data-Achievements-avatar]");
    const title  = this.querySelector("[data-Achievements-title]");
    const text   = this.querySelector("[data-Achievements-text]");

    modalImg.src             = avatar.src;
    modalImg.alt             = avatar.alt;
    modalTitle.textContent   = title.textContent;
    modalText.innerHTML      = text.innerHTML;

    toggleAchievementsModal();
  });
});

modalCloseBtn.addEventListener("click", toggleAchievementsModal);
overlay.addEventListener("click", toggleAchievementsModal);

/* ─── custom select & filter ─────────────────────────────────── */
const select      = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]"); // fixed: was data-selecct-value
const filterBtns  = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

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
    const val = this.innerText;
    selectValue.innerText = val;
    filterFunc(val);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

/* ─── contact form ───────────────────────────────────────────── */
const form       = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn    = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

/* ─── page navigation ────────────────────────────────────────── */
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
  });
});

/* ─── tsParticles — network topology feel ────────────────────── */
tsParticles.load("tsparticles", {
  background: {
    color: { value: "#0a0a0a" }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: true
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.7 } }
    }
  },
  particles: {
    color: { value: "#00ffc3" },
    links: {
      color: "#00ffc3",
      distance: 150,
      enable: true,
      opacity: 0.35,
      width: 1
    },
    collisions: { enable: false },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      speed: 0.8
    },
    number: {
      density: { enable: true, area: 800 },
      value: 60
    },
    opacity: { value: 0.6 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } }
  },
  detectRetina: true
});
