document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Efecto del Navbar al hacer scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Actualizar el año del Footer
    const yearSpan = document.getElementById("year");
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Animación de Scroll Reveal para tarjetas y secciones
    const elementsToReveal = document.querySelectorAll(".card, .fade-in, .testimonial-card");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Retraso escalonado para las tarjetas de tours
                if(entry.target.classList.contains('card')) {
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, 150 * Array.from(elementsToReveal).indexOf(entry.target));
                } else {
                    entry.target.classList.add("visible");
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elementsToReveal.forEach(el => {
        observer.observe(el);
    });

    // 4. Scroll suave para los enlaces del menú
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});