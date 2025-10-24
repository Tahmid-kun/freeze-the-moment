// ==================== MOBILE MENU TOGGLE ====================
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    });
  });
}

// ==================== LIGHTBOX FUNCTIONALITY ====================
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const viewButtons = document.querySelectorAll(".view-btn");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentImageIndex = 0;
let allImages = [];

// Initialize lightbox
function initializeLightbox() {
  // Collect all images
  const photoCards = document.querySelectorAll(".photo-card:not(.hidden)");
  allImages = Array.from(photoCards)
    .map((card) => {
      const btn = card.querySelector(".view-btn");
      return btn ? btn.dataset.image : null;
    })
    .filter((img) => img !== null);

  // Add click event to view buttons
  viewButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const imageSrc = btn.dataset.image;
      openLightbox(imageSrc);
    });
  });
}

function openLightbox(imageSrc) {
  currentImageIndex = allImages.indexOf(imageSrc);
  lightboxImage.src = imageSrc;
  lightboxImage.alt = "Full size photo";
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

function showPreviousImage() {
  currentImageIndex =
    (currentImageIndex - 1 + allImages.length) % allImages.length;
  lightboxImage.src = allImages[currentImageIndex];
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % allImages.length;
  lightboxImage.src = allImages[currentImageIndex];
}

// Event listeners for lightbox
if (closeButton) {
  closeButton.addEventListener("click", closeLightbox);
}

if (prevButton) {
  prevButton.addEventListener("click", showPreviousImage);
}

if (nextButton) {
  nextButton.addEventListener("click", showNextImage);
}

// Close lightbox when clicking outside the image
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    showPreviousImage();
  } else if (e.key === "ArrowRight") {
    showNextImage();
  }
});

// Initialize lightbox on page load
initializeLightbox();

// ==================== GALLERY FILTER FUNCTIONALITY ====================
const filterButtons = document.querySelectorAll(".filter-btn");
const photoCards = document.querySelectorAll(".photo-card");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Get filter value
      const filterValue = button.dataset.filter;

      // Filter photos
      filterPhotos(filterValue);
    });
  });
}

function filterPhotos(category) {
  photoCards.forEach((card) => {
    const cardCategory = card.dataset.category;

    if (category === "all" || cardCategory === category) {
      card.classList.remove("hidden");
      // Add fade-in animation
      card.style.animation = "fadeInUp 0.5s ease";
    } else {
      card.classList.add("hidden");
    }
  });

  // Reinitialize lightbox with filtered images
  initializeLightbox();
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all photo cards for scroll animation
document.querySelectorAll(".photo-card").forEach((card) => {
  observer.observe(card);
});

// Observe feature cards and other elements
document
  .querySelectorAll(".feature-card, .contact-method, .faq-item")
  .forEach((element) => {
    observer.observe(element);
  });

// ==================== LAZY LOADING IMAGES ====================
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.src; // Trigger loading
      img.classList.add("loaded");
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
  imageObserver.observe(img);
});

// ==================== ADD TO CART ANIMATION (Optional) ====================
const orderButtons = document.querySelectorAll(".btn-order");

orderButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // Add a visual feedback animation
    const originalText = this.innerHTML;
    this.style.transform = "scale(0.95)";

    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 100);
  });
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  }

  lastScroll = currentScroll;
});

// ==================== FORM VALIDATION (if needed later) ====================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ==================== MESSENGER LINK TRACKING (Optional Analytics) ====================
const messengerLinks = document.querySelectorAll('a[href*="m.me"]');

messengerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // You can add analytics tracking here
    console.log("Messenger link clicked:", link.href);

    // Example: Send to Google Analytics if available
    if (typeof gtag !== "undefined") {
      gtag("event", "messenger_click", {
        event_category: "engagement",
        event_label: "Order on Messenger",
      });
    }
  });
});

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==================== PAGE LOAD ANIMATIONS ====================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger any entrance animations
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = "1";
  }
});

// ==================== CONSOLE MESSAGE ====================
console.log(
  "%c🎨 Paraloid Photography",
  "font-size: 20px; font-weight: bold; color: #667eea;"
);
console.log("%cWebsite developed with ❤️", "font-size: 14px; color: #666;");
console.log(
  "%cFor inquiries, contact us on Messenger!",
  "font-size: 12px; color: #0084ff;"
);
