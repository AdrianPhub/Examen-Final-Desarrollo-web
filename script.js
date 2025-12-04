/**********************
  SISTEMA DE AUTENTICACIÓN SIMPLIFICADO
***********************/

// ==============================
// 1. FUNCIONES DE AUTENTICACIÓN
// ==============================

// Login simulado
function login(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  const error = document.getElementById('loginError');
  
  if (!email || !pass) {
    if (error) {
      error.innerText = "Debe completar correo y contraseña.";
      error.style.display = 'block';
    }
    return false;
  }
  
  console.log('Iniciando sesión para:', email);
  
  // Guardar datos en sessionStorage
  sessionStorage.setItem('userEmail', email);
  sessionStorage.setItem('userName', email.split('@')[0] || 'Usuario');
  sessionStorage.setItem('lastLogin', new Date().toLocaleString());
  sessionStorage.setItem('loginTime', new Date().toISOString());
  sessionStorage.setItem('isLoggedIn', 'true');
  
  // Redirigir al dashboard
  window.location.href = 'dashboard.html';
  
  return true;
}

// Logout
function logout() {
  console.log('=== INICIANDO LOGOUT ===');
  
  if (!confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    return false;
  }
  
  console.log('Limpiando datos de sesión...');
  
  // Limpiar sessionStorage
  sessionStorage.clear();
  
  console.log('Redirigiendo a login...');
  
  // Redirigir a login.html CON PARÁMETRO
  setTimeout(() => {
    window.location.href = 'login.html?logout=true';
  }, 100);
  
  return false;
}

// Rellenar campos demo
function fillDummy() {
  const emailField = document.getElementById('email');
  const passField = document.getElementById('password');
  const error = document.getElementById('loginError');
  
  if (emailField && passField) {
    emailField.value = 'estudiante1@uni.edu';
    passField.value = '123456';
    
    if (error) {
      error.textContent = 'Credenciales demo cargadas. Haz clic en "Iniciar Sesión".';
      error.style.display = 'block';
      error.style.background = '#e8f5e9';
      error.style.color = '#2e7d32';
    }
  }
}

// Mostrar dashboard (para páginas de una sola página)
function showDashboard() {
  const user = sessionStorage.getItem('userName') || 'Usuario';
  const email = sessionStorage.getItem('userEmail') || 'usuario@ejemplo.com';
  const last = sessionStorage.getItem('lastLogin') || '-';

  const userNameEl = document.getElementById('userName');
  const userEmailEl = document.getElementById('userEmail');
  const lastLoginEl = document.getElementById('lastLogin');
  const progressEl = document.getElementById('progress');
  const dashboardEl = document.getElementById('dashboard');
  const loginEl = document.getElementById('login');

  if (userNameEl) userNameEl.innerText = user;
  if (userEmailEl) userEmailEl.innerText = email;
  if (lastLoginEl) lastLoginEl.innerText = last;
  if (progressEl) progressEl.innerText = '20%';

  if (dashboardEl && loginEl) {
    dashboardEl.classList.remove('hidden');
    loginEl.classList.add('hidden');
  }

  // cerrar menú en móvil si está abierto
  const nav = document.getElementById('nav');
  if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
    toggleMenu();
  }
}

// ==============================
// 2. FUNCIONES DE UI/UX
// ==============================

// Toggle menú responsive
function toggleMenu() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  
  nav.classList.toggle('active');
  const btn = document.querySelector('.menu-btn');
  if (btn) {
    btn.textContent = nav.classList.contains('active') ? '✕' : '☰';
  }
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
  const nav = document.getElementById('nav');
  const menuBtn = document.querySelector('.menu-btn');
  
  if (!nav || !menuBtn) return;
  
  if (!nav.contains(event.target) && !menuBtn.contains(event.target) && nav.classList.contains('active')) {
    toggleMenu();
  }
});

// ==============================
// 3. CARRUSEL AUTOMÁTICO
// ==============================

let slideIndex = 0;

function cambiarSlide() {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  
  slides.forEach(s => s.style.opacity = 0);
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.opacity = 1;
}

function initCarousel() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length) {
    slides[0].style.opacity = 1;
    setInterval(cambiarSlide, 2500);
  }
}

// ==============================
// 4. TABLA DINÁMICA DE ESTADÍSTICAS
// ==============================

const jugadores = [
  { nombre: "Messi", goles: 50, asistencias: 18 },
  { nombre: "Cristiano", goles: 42, asistencias: 9 },
  { nombre: "Mbappé", goles: 37, asistencias: 12 },
  { nombre: "Haaland", goles: 44, asistencias: 6 }
];

let pos = 0;

function agregarDato() {
  const tbody = document.querySelector('#tablaStats tbody');
  if (!tbody) return;
  
  if (pos >= jugadores.length) {
    alert('No hay más datos que agregar');
    return;
  }
  
  const j = jugadores[pos];
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${j.nombre}</td><td>${j.goles}</td><td>${j.asistencias}</td>`;
  tbody.appendChild(tr);
  pos++;
}

function reiniciarTabla() {
  const tbody = document.querySelector('#tablaStats tbody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  pos = 0;
}

// ==============================
// 5. FORMULARIO DE CONTACTO
// ==============================

function enviarFormulario(e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre')?.value.trim();
  const correo = document.getElementById('correo')?.value.trim();
  const resp = document.getElementById('respuesta');
  
  if (!nombre || !correo) {
    if (resp) {
      resp.innerText = 'Complete todos los campos';
      resp.style.color = '#d32f2f';
    }
    return;
  }
  
  if (resp) {
    resp.innerText = `Gracias ${nombre}, su mensaje fue recibido.`;
    resp.style.color = '#2e7d32';
  }
  
  e.target.reset();
  
  setTimeout(() => {
    if (resp) resp.innerText = '';
  }, 3000);
}

// ==============================
// 6. SMOOTH SCROLL
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      if (window.innerWidth <= 768) {
        const nav = document.getElementById('nav');
        if (nav && nav.classList.contains('active')) {
          toggleMenu();
        }
      }
    }
  });
});

// ==============================
// 7. INICIALIZACIÓN
// ==============================

window.addEventListener('load', () => {
  console.log('=== PÁGINA CARGADA ===');
  
  // Inicializar carrusel
  initCarousel();
  
  // Mostrar dashboard si es una sola página y hay sesión
  if (sessionStorage.getItem('userEmail') && document.getElementById('dashboard')) {
    showDashboard();
  }
  
  // Ajustar altura del carrusel
  if (window.innerWidth <= 768) {
    const carousel = document.querySelector('.carousel');
    if (carousel) carousel.style.height = '80px';
  }
});

// Ajustar carrusel en resize
window.addEventListener('resize', () => {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.style.height = window.innerWidth <= 768 ? '80px' : '120px';
  }
});