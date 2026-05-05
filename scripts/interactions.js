/**
 * interactions.js - Touch Swipe, Animations, and Interactive Behaviors
 * Handles card swipe functionality, animations, and mobile-specific interactions
 */

'use strict';

// ========== Touch Swipe Detection for Project Cards ==========
/**
 * Detects horizontal swipe gestures on project cards
 * Allows left/right swipe to navigate between cards on mobile
 */
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  // Calculate swipe distance
  const swipeDistance = touchStartX - touchEndX;
  
  // Minimum swipe distance threshold (50px)
  const swipeThreshold = 50;
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
      const cardsContainer = document.querySelector('.projects-grid');
      
      // Swipe left (next card)
      if (swipeDistance > 0) {
        cardsContainer.scrollBy({
          left: 350,
          behavior: 'smooth'
        });
      }
      // Swipe right (previous card)
      else {
        cardsContainer.scrollBy({
          left: -350,
          behavior: 'smooth'
        });
      }
    }
  }
}

// Listen for touch start
document.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, false);

// Listen for touch end and detect swipe
document.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
}, false);

// ========== Fade-In Animation on Scroll ==========
/**
 * Observes elements as they enter the viewport
 * Triggers fade-in-up animation when visible
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add animation class
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply to all cards and articles
document.querySelectorAll('article, section').forEach(element => {
  element.style.opacity = '0';
  fadeInObserver.observe(element);
});

// Define animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ========== Hover Effects on Cards ==========
/**
 * Enhances card hover state with subtle animation
 * Provides visual feedback for interactive elements
 */
document.querySelectorAll('.project-card, .journey-step').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
    this.style.transition = 'all 0.3s ease-in-out';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ========== Button Click Feedback ==========
/**
 * Adds visual feedback on button clicks
 * Ripple effect for better UX
 */
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    // Get click position
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = ripple.style.height = size + 'px';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ========== Mobile Device Detection ==========
/**
 * Detects if user is on mobile device
 * Disables certain interactions on mobile for better performance
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Log device info
console.log('%c🎯 Portfolio Interactive Features Loaded', 'color: #10b981; font-size: 14px; font-weight: bold;');
console.log('%cMobile Device:', isMobileDevice() ? 'Yes ✓' : 'No');
console.log('%cTouch Support:', 'ontouchstart' in window ? 'Yes ✓' : 'No');
console.log('%cViewport:', `${window.innerWidth}x${window.innerHeight}`);
