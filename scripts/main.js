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

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

const projects = document.querySelectorAll('.projects-grid');

projects.forEach(project => {
  project.addEventListener('click', () => {
    project.classList.toggle('flipped');
  });
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = [];
const LINE_COUNT = 28;

for (let i = 0; i < LINE_COUNT; i++){
  lines.push({
     x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: 80 + Math.random() * 120,
    angle: Math.random() * Math.PI * 2,
    speed: 0.007 + Math.random() * 0.005,
    opacity: 0.14 + Math.random() * 0.08,
    thickness: 0.5 + Math.random() * 1.2,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  });
}

// CIRCLES
const circles = Array.from({ length: 8 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: 10 + Math.random() * 30,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  rot: (Math.random() - 0.5) * 0.01,
  angle: 0,
  opacity: 0.15 + Math.random() * 0.1,
  thickness: 0.5 + Math.random() * 1,
}));

// TRIANGLES
const triangles = Array.from({ length: 7 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: 12 + Math.random() * 24,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  angle: Math.random() * Math.PI * 2,
  rot: (Math.random() - 0.5) * 0.012,
  opacity: 0.15 + Math.random() * 0.1,
  thickness: 0.5 + Math.random() * 1,
}));

// DOTS (berkedip)
const dots = Array.from({ length: 20 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: 1.5 + Math.random() * 3,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  angle: 0, rot: 0,
  pulse: Math.random() * Math.PI * 2,
  pulseSpeed: 0.02 + Math.random() * 0.03,
  opacity: 0.18 + Math.random() * 0.12,
}));

// CROSSES
const crosses = Array.from({ length: 8 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: 8 + Math.random() * 18,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  angle: Math.random() * Math.PI * 2,
  rot: (Math.random() - 0.5) * 0.012,
  opacity: 0.05 + Math.random() * 0.1,
  thickness: 0.8 + Math.random() * 1.2,
}));

function wrapEdge(obj) {
  obj.x += obj.vx;
  obj.y += obj.vy;
  obj.angle += obj.rot;
  if (obj.x < -200) obj.x = canvas.width + 200;
  if (obj.x > canvas.width + 200) obj.x = -200;
  if (obj.y < -200) obj.y = canvas.height + 200;
  if (obj.y > canvas.height + 200) obj.y = -200;
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  lines.forEach(line => {
    line.angle += line.speed;
    line.x += line.vx;
    line.y += line.vy;

    if (line.x < -200) line.x = canvas.width + 200;
    if (line.x > canvas.width + 200) line.x = -200;
    if (line.y < -200) line.y = canvas.height + 200;
    if (line.y > canvas.height + 200) line.y = -200;
    
    const x2 = line.x + Math.cos(line.angle) * line.length;
    const y2 = line.y + Math.sin(line.angle) * line.length;

    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `rgba(99, 102, 241, ${line.opacity})`;
    ctx.lineWidth = line.thickness;
    ctx.stroke();
  });

  // CIRCLES
circles.forEach(c => {
  wrapEdge(c);
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(99, 102, 241, ${c.opacity})`;
  ctx.lineWidth = c.thickness;
  ctx.stroke();
});

// TRIANGLES
triangles.forEach(t => {
  wrapEdge(t);
  ctx.save();
  ctx.translate(t.x, t.y);
  ctx.rotate(t.angle);
  ctx.beginPath();
  ctx.moveTo(0, -t.size);
  ctx.lineTo(t.size * 0.866, t.size * 0.5);
  ctx.lineTo(-t.size * 0.866, t.size * 0.5);
  ctx.closePath();
  ctx.strokeStyle = `rgba(99, 102, 241, ${t.opacity})`;
  ctx.lineWidth = t.thickness;
  ctx.stroke();
  ctx.restore();
});

// DOTS
dots.forEach(d => {
  wrapEdge(d);
  d.pulse += d.pulseSpeed;
  const op = d.opacity * (0.6 + 0.4 * Math.sin(d.pulse));
  ctx.beginPath();
  ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(99, 102, 241, ${op})`;
  ctx.fill();
});

// CROSSES
crosses.forEach(c => {
  wrapEdge(c);
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.rotate(c.angle);
  ctx.strokeStyle = `rgba(99, 102, 241, ${c.opacity})`;
  ctx.lineWidth = c.thickness;
  ctx.beginPath(); ctx.moveTo(-c.size, 0); ctx.lineTo(c.size, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -c.size); ctx.lineTo(0, c.size); ctx.stroke();
  ctx.restore();
});

  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});