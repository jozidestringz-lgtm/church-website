/* =============================================
   UNITING REFORMED CHURCH — script.js
============================================= */

// ---- EMAILJS INIT ----
(function () {
  emailjs.init("UYtN5fZjMzFRNNvI3");
})();

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

// Close menu when a link is clicked
navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  }
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".branch-card, .ministry-card, .pastor-card, .giving-card, .event-card, .vacancy-card, .branch-hist-card, .min-com-card, .history-block, .urcsa-history p"
  );
  elements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}
initScrollReveal();

// Stagger reveal for grid children
function staggerReveal(selector) {
  const grid = document.querySelector(selector);
  if (!grid) return;
  const children = grid.querySelectorAll(".reveal");
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
}
staggerReveal(".cards-grid");
staggerReveal(".ministries-grid");
staggerReveal(".giving-grid");

// ---- COMMITTEE TABS ----
const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    // Remove active from all buttons
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach((tc) => {
      tc.classList.remove("active");
    });

    // Show target
    const targetEl = document.getElementById(target);
    if (targetEl) targetEl.classList.add("active");
  });
});

// ---- ACCORDION ----
const accordionBtns = document.querySelectorAll(".accordion-btn");
accordionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const isOpen  = btn.classList.contains("open");

    // Close all
    accordionBtns.forEach((b) => {
      b.classList.remove("open");
      const c = b.nextElementSibling;
      c.classList.remove("open");
      c.style.maxHeight = null;
    });

    // Open clicked if it was closed
    if (!isOpen) {
      btn.classList.add("open");
      content.classList.add("open");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// ---- CAROUSEL ----
const carousel     = document.getElementById("carousel");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");
const dotsWrap     = document.getElementById("carouselDots");

let currentSlide = 0;
const slides = carousel ? carousel.querySelectorAll(".carousel-slide") : [];
const totalSlides = slides.length;

// Create dots
if (dotsWrap && totalSlides > 0) {
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
}

function updateDots() {
  const dots = dotsWrap ? dotsWrap.querySelectorAll(".carousel-dot") : [];
  dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
}

function goToSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  if (carousel) carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

if (carouselPrev) carouselPrev.addEventListener("click", () => goToSlide(currentSlide - 1));
if (carouselNext) carouselNext.addEventListener("click", () => goToSlide(currentSlide + 1));

// Auto-advance
if (totalSlides > 0) {
  setInterval(() => goToSlide(currentSlide + 1), 5000);
}

// Swipe support
let touchStartX = 0;
if (carousel) {
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });
  carousel.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
    }
  });
}

// ---- CONTACT FORM / EMAILJS ----
const contactForm = document.getElementById("contactForm");
const formStatus  = document.getElementById("formStatus");
const submitBtn   = document.getElementById("submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const templateParams = {
      from_name:  document.getElementById("from_name").value.trim(),
      from_email: document.getElementById("from_email").value.trim(),
      message:    document.getElementById("message").value.trim(),
    };

    // Basic validation
    if (!templateParams.from_name || !templateParams.from_email || !templateParams.message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.className   = "form-status error";
      return;
    }

    submitBtn.textContent = "Sending…";
    submitBtn.disabled    = true;

    emailjs
      .send("service_x7uihsa", "template_89us4tp", templateParams)
      .then(() => {
        formStatus.textContent = "✓ Message sent! We will get back to you soon.";
        formStatus.className   = "form-status success";
        contactForm.reset();
        submitBtn.textContent = "Send Message";
        submitBtn.disabled    = false;
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        formStatus.textContent =
          "✕ Something went wrong. Please try again or contact us via WhatsApp.";
        formStatus.className   = "form-status error";
        submitBtn.textContent = "Send Message";
        submitBtn.disabled    = false;
      });
  });
}

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((link) => {
          link.style.color = "";
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.style.color = "var(--gold)";
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((s) => sectionObserver.observe(s));
