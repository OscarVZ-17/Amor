// Navigation and Sidebar Toggle
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.createElement('button');
toggleButton.className = 'toggle-sidebar';
toggleButton.innerHTML = '<i class="fas fa-heart"></i>';
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    document.body.classList.toggle('sidebar-active');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active link
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Show active section with animation
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-section');
        });
        const targetSection = document.getElementById(targetId);
        targetSection.classList.add('active-section');
        
        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-active');
        }
    });
});

// Carousel functionality with touch support
const carousel = document.querySelector('.carousel');
const carouselContainer = document.querySelector('.carousel-container');
const images = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&q=80'
];

let currentSlide = 0;
let startX;
let isDragging = false;

// Create slides with lazy loading
images.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = `Recuerdo ${index + 1}`;
    
    slide.appendChild(img);
    carouselContainer.appendChild(slide);
});

// Create interactive dots
const dotsContainer = document.querySelector('.carousel-dots');
images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
});

function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Touch and mouse events for carousel
carousel.addEventListener('mousedown', startDragging);
carousel.addEventListener('touchstart', e => startDragging(e.touches[0]));
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('touchmove', e => drag(e.touches[0]));
carousel.addEventListener('mouseup', endDragging);
carousel.addEventListener('touchend', endDragging);
carousel.addEventListener('mouseleave', endDragging);

function startDragging(e) {
    isDragging = true;
    startX = e.pageX - carouselContainer.offsetLeft;
    carousel.style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselContainer.offsetLeft;
    const walk = (x - startX) * 2;
    const transform = -currentSlide * 100 + (walk / carousel.offsetWidth) * 100;
    carouselContainer.style.transform = `translateX(${transform}%)`;
}

function endDragging() {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.cursor = 'grab';
    
    const x = parseInt(carouselContainer.style.transform.replace('translateX(', ''));
    if (x < -currentSlide * 100 - 20) {
        goToSlide(Math.min(currentSlide + 1, images.length - 1));
    } else if (x > -currentSlide * 100 + 20) {
        goToSlide(Math.max(currentSlide - 1, 0));
    } else {
        goToSlide(currentSlide);
    }
    resetAutoPlay();
}

// Enhanced carousel controls
document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % images.length;
    updateCarousel();
    resetAutoPlay();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    updateCarousel();
    resetAutoPlay();
});

// Auto-rotate carousel with reset on interaction
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
        updateCarousel();
    }, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

startAutoPlay();

// Interactive Poems
document.querySelectorAll('.poem-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.add('expanded');
        
        // Create floating hearts animation
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart floating-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            this.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }
    });
});

// Enhanced Diary functionality
const diaryForm = document.querySelector('.diary-form');
const entriesContainer = document.querySelector('.diary-entries');
let currentMood = 'feliz';

// Load entries from localStorage with animation
let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');

function updateEntries() {
    entriesContainer.innerHTML = '';
    diaryEntries.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.className = 'diary-entry';
        entryElement.style.animationDelay = `${index * 0.1}s`;
        entryElement.innerHTML = `
            <div class="entry-header">
                <span class="entry-author">${entry.author}</span>
                <span class="entry-date">${entry.date}</span>
            </div>
            <div class="entry-content">
                <p>${entry.content}</p>
            </div>
        `;
        
        // Add click interaction
        entryElement.addEventListener('click', () => {
            entryElement.classList.toggle('expanded');
        });
        
        entriesContainer.appendChild(entryElement);
    });
}

// Interactive mood selection with animation
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMood = btn.dataset.mood;
        
        // Add pulse animation
        btn.style.animation = 'none';
        btn.offsetHeight; // Trigger reflow
        btn.style.animation = 'pulse 0.5s';
    });
});

// Enhanced save entry with animation
document.querySelector('.save-entry').addEventListener('click', () => {
    const content = document.querySelector('textarea').value.trim();
    if (!content) return;

    const entry = {
        content,
        author: sessionStorage.getItem('currentUser') || 'Usuario',
        date: new Date().toLocaleDateString(),
        mood: currentMood
    };

    diaryEntries.unshift(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
    
    document.querySelector('textarea').value = '';
    updateEntries();

    // Show success message with animation
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Entrada guardada!';
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
});

// Initialize
updateEntries();
document.querySelector('nav a[href="#inicio"]').click();

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});