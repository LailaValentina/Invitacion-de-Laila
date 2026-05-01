let carouselInterval;
let currentSlide = 0;

// --- FUNCIÓN PRINCIPAL: ABRIR SOBRE ---
function abrirSobre(elemento) {
    if (!elemento.classList.contains('open')) {
        elemento.classList.add('open');
        
        // 1. Manejo del Scroll de la carta (Mejorado)
        const cartaContenido = elemento.querySelector('.carta-contenido');
        if (cartaContenido) {
            // Esperamos a que la carta suba completamente antes de habilitar el scroll
            setTimeout(() => {
                cartaContenido.style.overflowY = 'auto';
                cartaContenido.style.webkitOverflowScrolling = 'touch'; // Suavidad en iPhone
            }, 1000);
        }

        // 2. Música
        const cancion = document.getElementById('miMusica');
        if (cancion) {
            cancion.volume = 0.4;
            cancion.play().catch(e => console.log("Interacción requerida para audio"));
        }

        // 3. Iniciar Efectos
        setInterval(crearBurbuja, 400);
        iniciarCarrusel();
        verificarDesbloqueo();
    }
}

// --- CARRUSEL DINÁMICO ---
function iniciarCarrusel() {
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        moverCarrusel(1);
    }, 5000);
}

// Agregamos 'e' para capturar el evento correctamente
function moverCarrusel(direccion, e = null) {
    const track = document.getElementById('carousel-track');
    const items = track.querySelectorAll('.polaroid-item');
    
    if (items.length === 0) return;

    currentSlide = (currentSlide + direccion + items.length) % items.length;
    
    const targetItem = items[currentSlide];
    
    track.scrollTo({
        left: targetItem.offsetLeft,
        behavior: 'smooth'
    });

    // Reiniciar intervalo si el clic fue manual
    if (e) {
        clearInterval(carouselInterval);
        iniciarCarrusel();
    }
}

// --- GENERADOR DE BURBUJAS (Sin cambios, está perfecto) ---
function crearBurbuja() {
    const container = document.getElementById('bubble-container');
    if (!container) return;

    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 20 + 10 + "px";
    b.style.width = size;
    b.style.height = size;
    b.style.left = Math.random() * 100 + "%";
    b.style.animationDuration = Math.random() * 3 + 4 + "s";
    
    container.appendChild(b);
    setTimeout(() => b.remove(), 6000);
}

// --- CONTADOR REGRESIVO ---
const fechaEvento = new Date("June 14, 2026 11:00:00").getTime();

setInterval(() => {
    const ahora = new Date().getTime();
    const diff = fechaEvento - ahora;
    const countdownEl = document.getElementById("countdown");

    if (diff <= 0) {
        if (countdownEl) countdownEl.innerHTML = "<b style='font-family: Pacifico; color: #0077be; font-size: 1.2rem;'>¡ES HOY EL GRAN DÍA! 🧜‍♀️</b>";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const updateElement = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value.toString().padStart(2, '0');
    };

    updateElement("days", d);
    updateElement("hours", h);
    updateElement("minutes", m);
    updateElement("seconds", s);
}, 1000);

// --- LÓGICA DE LA SORPRESA ---
function verificarDesbloqueo() {
    const ahora = new Date();
    // 5 representa Junio (0-11)
    const fechaSorpresa = new Date(2026, 5, 6); 
    
    const contenedor = document.getElementById('seccion-sorpresa');
    const contenido = document.getElementById('contenido-sorpresa');

    if (contenedor && ahora >= fechaSorpresa) {
        contenedor.classList.remove('bloqueado');
        contenedor.classList.add('desbloqueado');
        
        contenido.innerHTML = `
            <h3 style="color: #d81b60; font-family: 'Pacifico'; margin-bottom: 10px;">✨ ¡Sesión Especial! ✨</h3>
            <p style="font-size: 0.75rem; color: #666; margin-bottom: 10px;">(Mantén presionada una foto para guardarla)</p>
            <div class="grid-sesion">
                <img src="media/sesion1.jpg" alt="Laila 1">
                <img src="media/sesion2.jpg" alt="Laila 2">
                <img src="media/sesion3.jpg" alt="Laila 3">
                <img src="media/sesion4.jpg" alt="Laila 4">
            </div>
            <p style="font-size: 0.85rem; margin-top: 10px; color: #444;">¡Celebrando 4 años mágicos!</p>
        `;
    }
}
