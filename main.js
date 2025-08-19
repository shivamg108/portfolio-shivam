// Project data
const projects = [
    {

        title: "Image Store and Rename (Manangae Products Windows Application)",
        description: "A project to store and rename product images in a folder. It generates unique IDs for each product and provides management capabilities. Features include searching for products by name or ID through a custom search bar on the customer side.",
        technologies: ["Python ", "Flask ", "PyQt5 ","PostgreSQL ", "HTML/CSS/JS ", "Bootstrap "],
        image: "https://via.placeholder.com/600x400?text=HRMS+Project",
        github: "#",
        demo: "#"
    },
    {
        title: "HRMS (Human Resource Management System)",
        description: "A comprehensive HR management system developed as an academic project to streamline HR processes, employee management, and organizational workflows.",
        technologies: ["Python ", "Flask ", "sqlite ", "HTML/CSS/JS ", "Bootstrap "],
        image: "https://via.placeholder.com/600x400?text=HRMS+Project",
        github: "#",
        demo: "#"
    }
];

// DOM Elements
const projectsContainer = document.querySelector('.projects-grid');
const yearElement = document.getElementById('year');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const menuBtn = document.querySelector('.menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

// Mobile Menu Toggle
function toggleMenu() {
    menuBtn.classList.toggle('open');
    navLinksContainer.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Close menu when clicking on a nav link
function closeMenu() {
    menuBtn.classList.remove('open');
    navLinksContainer.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Set current year in footer
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

// Render projects
function renderProjects() {
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card fade-in">
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>
                    ${project.demo ? `<a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Highlight active section in navigation
function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
        } else {
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (navLink) navLink.classList.remove('active');
        }
    });
}

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Initialize
function init() {
    renderProjects();
    
    // Set initial active link
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            document.querySelector(`.nav-link[href="${window.location.hash}"]`).classList.add('active');
        }
    } else {
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }
    
    // Add event listeners
    menuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', highlightActiveSection);
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
