const projects = [
    {
        title: "HRMS (Company Project)",
        problem: "Companies struggle with managing HR processes efficiently, leading to disorganized employee records, manual attendance tracking, and inconsistent performance evaluations.",
        solution: "Developed a comprehensive HR management system that streamlines HR processes, employee management, and organizational workflows. Implemented employee management, attendance tracking, and performance evaluation features with an intuitive user interface and role-based access control.",
        technologies: ["Python", "React", "MUI", "PostgreSQL"],
        image: "https://via.placeholder.com/600x400?text=HRMS+Project",
        github: "#",
        demo: "#"
    },
    {
        title: "Image Store and Rename (Manage Products Windows Application)",
        problem: "Businesses need an efficient way to organize and manage product images with proper identification and search capabilities.",
        solution: "Created a Windows application that stores and renames product images in folders with unique IDs. Implemented product management capabilities and a custom search bar allowing customers to find products by name or ID.",
        technologies: ["Python", "Flask", "PyQt5", "PostgreSQL", "HTML/CSS/JS", "Bootstrap"],
        image: "https://via.placeholder.com/600x400?text=Image+Store+Project",
        github: "#",
        demo: "#"
    },
    {
        title: "HRMS (Human Resource Management System)",
        problem: "Educational institutions and small organizations need a cost-effective solution to manage HR processes without complex enterprise systems.",
        solution: "Built an academic HR management system that streamlines HR processes, employee management, and organizational workflows using lightweight technologies for easy deployment and maintenance.",
        technologies: ["Python", "Flask", "SQLite", "HTML/CSS/JS", "Bootstrap"],
        image: "https://via.placeholder.com/600x400?text=Academic+HRMS",
        github: "#",
        demo: "#"
    }
];

const projectsContainer = document.querySelector('.projects-grid');
const yearElement = document.getElementById('year');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const menuBtn = document.querySelector('.menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

function toggleMenu() {
    menuBtn.classList.toggle('open');
    navLinksContainer.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

function closeMenu() {
    menuBtn.classList.remove('open');
    navLinksContainer.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

function renderProjects() {
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card fade-in">
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3>${project.title}</h3>
                
                <div class="project-section">
                    <h4>Problem</h4>
                    <p>${project.problem}</p>
                </div>
                
                <div class="project-section">
                    <h4>Solution</h4>
                    <p>${project.solution}</p>
                </div>
                
                <div class="project-section">
                    <h4>Tech Stack</h4>
                    <div class="technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-links">
                    <a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>
                    ${project.demo ? `<a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

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
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

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

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        console.log('Form submitted:', formObject);
        alert('this section is under maintenance. Please contact me via email directly.');
        this.reset();
    });
}

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

sections.forEach(section => {
    observer.observe(section);
});

function init() {
    renderProjects();
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            document.querySelector(`.nav-link[href="${window.location.hash}"]`).classList.add('active');
        }
    } else {
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }
    menuBtn.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    window.addEventListener('scroll', highlightActiveSection);
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', init);
