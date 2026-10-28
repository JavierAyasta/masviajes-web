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

    // 3. Animación de Scroll Reveal
    const elementsToReveal = document.querySelectorAll(".card, .fade-in, .testimonial-card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    elementsToReveal.forEach(el => { observer.observe(el); });

    // 4. Scroll suave para los enlaces del menú
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 5. Acordeón del FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const parent = this.parentElement;
            const answer = this.nextElementSibling;
            
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            parent.classList.toggle('active');
            if (parent.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 6. Lógica del Modal de Tours
    const modal = document.getElementById("tourModal");
    if(modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    }
});

// Datos de los tours (Fácil de editar)
const toursData = {
    'paracas': {
        title: 'Tour Paracas - Ica',
        img: 'images/tour-paracas.jpg',
        desc: 'Disfruta de un increíble Full Day en la Reserva Nacional de Paracas. Visita las Islas Ballestas, el Candelabro y relájate en la Huacachina.',
        wa: 'Hola,%20quiero%20reservar%20el%20Tour%20a%20Paracas'
    },
    'huancayo': {
        title: 'Tour Huancayo',
        img: 'images/tour-huancayo.jpg',
        desc: 'Explora la hermosa ciudad de Huancayo. Visita la Laguna de Ñahuimpuquio, el Valle del Mantaro y disfruta de su exquisita gastronomía.',
        wa: 'Hola,%20quiero%20reservar%20el%20Tour%20a%20Huancayo'
    },
    'cusco': {
        title: 'Tour Cusco Mágico',
        img: 'images/tour-cusco.jpg',
        desc: 'Sumérgete en la historia del Imperio Incaico. Recorre la Plaza de Armas, Qorikancha, Sacsayhuamán y disfruta de la magia de Cusco.',
        wa: 'Hola,%20quiero%20reservar%20el%20Tour%20a%20Cusco'
    },
    'lima': {
        title: 'City Tour Lima',
        img: 'images/tour-lima.jpg',
        desc: 'Conoce la "Ciudad de los Reyes". Visita el Centro Histórico, la Plaza Mayor, el Convento de San Francisco y disfruta de las mejores vistas al océano.',
        wa: 'Hola,%20quiero%20reservar%20el%20City%20Tour%20en%20Lima'
    }
};

function openModal(tourId) {
    const tour = toursData[tourId];
    if(!tour) return;

    document.getElementById('modalTitle').innerText = tour.title;
    document.getElementById('modalImg').src = tour.img;
    document.getElementById('modalDesc').innerText = tour.desc;
    document.getElementById('modalWhatsapp').href = `https://wa.me/51942634514?text=${tour.wa}`;
    
    document.getElementById('tourModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('tourModal').style.display = 'none';
}