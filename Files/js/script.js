'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar    = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// download CV function
function download() {
  const link = document.createElement('a');
  link.href = './assets/images/Mo\'men Hassan (CV).pdf';
  link.download = 'MomenHassan-CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Achievements modal variables
const achievementsItems = document.querySelectorAll("[data-Achievements-item]");
const modalContainer    = document.querySelector("[data-modal-container]");
const modalCloseBtn     = document.querySelector("[data-modal-close-btn]");
const overlay           = document.querySelector("[data-overlay]");

// modal content variables
const modalImg   = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText  = document.querySelector("[data-modal-text]");

// function to toggle modal
const toggleAchievementsModal = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// open modal on achievement item click
achievementsItems.forEach(item => {
  item.addEventListener("click", function () {
    const avatar = this.querySelector("[data-Achievements-avatar]");
    const title  = this.querySelector("[data-Achievements-title]");
    const text   = this.querySelector("[data-Achievements-text]");

    modalImg.src   = avatar.src;
    modalImg.alt   = avatar.alt;
    modalTitle.textContent = title.textContent;
    modalText.innerHTML    = text.innerHTML;

    toggleAchievementsModal();
  });
});

// close modal
modalCloseBtn.addEventListener("click", toggleAchievementsModal);
overlay.addEventListener("click", toggleAchievementsModal);

// custom select & filter variables
const select        = document.querySelector("[data-select]");
const selectItems   = document.querySelectorAll("[data-select-item]");
const selectValue   = document.querySelector("[data-selecct-value]");
const filterBtns    = document.querySelectorAll("[data-filter-btn]");
const filterItems   = document.querySelectorAll("[data-filter-item]");

// toggle dropdown select
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// filter function (case-insensitive)
function filterFunc(selectedValue) {
  const sel = selectedValue.toLowerCase().trim();
  filterItems.forEach(item => {
    const cat = item.dataset.category.toLowerCase().trim();
    if (sel === "all" || cat === sel) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// handle select dropdown choices
selectItems.forEach(opt => {
  opt.addEventListener("click", function () {
    const val = this.innerText;
    selectValue.innerText = val;
    select.classList.remove("active");
    filterFunc(val);

    // reset main filter buttons
    filterBtns.forEach(b => b.classList.remove("active"));
    filterBtns[0].classList.add("active");
  });
});

// handle filter buttons on large screens
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

// contact form variables
const form       = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn    = document.querySelector("[data-form-btn]");

// enable/disable send button based on form validity
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// page navigation variables
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages    = document.querySelectorAll("[data-page]");

// page navigation logic
navLinks.forEach((link, idx) => {
  link.addEventListener("click", function () {
    pages.forEach((page, i) => {
      if (link.innerText.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navLinks[i].classList.remove("active");
      }
    });
  });
});

// tsParticles configuration
tsParticles.load("tsparticles", {
  background: {
    color: { value: "#0a0a0a" }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  particles: {
    color: { value: "#00ffc3" },
    links: {
      color: "#00ffc3",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1
    },
    collisions: { enable: false },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      speed: 1
    },
    number: {
      density: { enable: true, area: 800 },
      value: 60
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } }
  },
  detectRetina: true
});
