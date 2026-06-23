/**
 * main.js - Core Navigation & Scroll Behavior
 * Handles smooth scrolling, navbar interactions, and page setup
 */

"use strict";

// ========== Smooth Scroll for Navigation Links ==========
/**
 * Intercepts anchor link clicks and provides smooth scrolling behavior
 * Automatically adjusts scroll position to account for sticky navbar
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Get the navbar height to offset the scroll position
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      // Calculate target scroll position
      const targetPosition = targetElement.offsetTop - navbarHeight;

      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ========== Active Navigation Link Indicator ==========
/**
 * Updates active navigation link based on current scroll position
 * Highlights which section user is currently viewing
 */
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("main section, header");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  let currentSection = "";

  // Determine which section is currently in viewport
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbarHeight - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // Update active link styling
  navLinks.forEach((link) => {
    link.style.color = "";
    link.style.borderBottom = "";

    if (currentSection && link.getAttribute("href") === `#${currentSection}`) {
      link.style.color = "var(--color-emerald)";
      link.style.borderBottom = "2px solid var(--color-emerald)";
    }
  });
});

// ========== Navbar Scroll Effect ==========
/**
 * Adds shadow to navbar when user scrolls down
 * Provides visual feedback that content is scrolling
 */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (navbar) {
    if (window.scrollY > 0) {
      navbar.style.boxShadow = "var(--shadow-lg)";
    } else {
      navbar.style.boxShadow = "var(--shadow-sm)";
    }
  }
});

// ========== Intersection Observer for Fade-In Animation ==========
/**
 * Observes elements as they enter viewport
 * Triggers fade-in animation for better visual impact
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all articles for fade-in animation
document.querySelectorAll("article, section > div").forEach((element) => {
  observer.observe(element);
});

// ========== Keyboard Navigation ==========
/**
 * Allows keyboard navigation using arrow keys
 * Up/Down arrows scroll between sections
 */
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    const nextSection = getNextSection();
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  } else if (event.key === "ArrowUp") {
    const prevSection = getPreviousSection();
    if (prevSection) {
      prevSection.scrollIntoView({ behavior: "smooth" });
    }
  }
});

/**
 * Helper function to get next section in viewport
 * @returns {HTMLElement|null} Next section element or null
 */
function getNextSection() {
  const sections = Array.from(
    document.querySelectorAll("main section, header"),
  );
  const currentScroll = window.scrollY;

  return sections.find((section) => section.offsetTop > currentScroll) || null;
}

/**
 * Helper function to get previous section in viewport
 * @returns {HTMLElement|null} Previous section element or null
 */
function getPreviousSection() {
  const sections = Array.from(
    document.querySelectorAll("main section, header"),
  );
  const currentScroll = window.scrollY;

  const prevSections = sections.filter(
    (section) => section.offsetTop < currentScroll,
  );
  return prevSections[prevSections.length - 1] || null;
}

// ========== Mobile Viewport Check ==========
/**
 * Detects if user is on mobile device
 * Used for responsive interactions and feature toggles
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

// Log initialization
console.log(
  "%c🎯 Evi Lestari Portfolio Loaded",
  "color: #00d4ff; font-size: 14px; font-weight: bold;",
);
console.log("%cMobile Device:", isMobileDevice() ? "Yes" : "No");
console.log("%cViewport Size:", `${window.innerWidth}x${window.innerHeight}`);
