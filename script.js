/**********************
  Funciones de UI & Login
***********************/

// Toggle menú responsive mejorado
function toggleMenu(){
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
  const btn = document.querySelector('.menu-btn');
  if (nav.classList.contains('active')) {
    btn.textContent = '✕';
  } else {
    btn.textContent = '☰';
  }
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
  const nav = document.getElementById('nav');
  const menuBtn = document.querySelector('.menu-btn');
  
  if (!nav.contains(event.target) && !menuBtn.contains(event.target) && nav.classList.contains('active')) {
    toggleMenu();
  }
});

// Login simulado
function login(e){
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  const error = document.getElementById('loginError');

  if(!email || !pass){
    error.innerText = "Debe completar correo y contraseña.";
    return;
  }

  // Simulación de validación
  sessionStorage.setItem('userEmail', email);
  sessionStorage.setItem('userName', email.split('@')[0] || 'Usuario');
  sessionStorage.setItem('lastLogin', new Date().toLocaleString());

  showDashboard();
}

// Rellenar campos demo
function fillDummy(){
  document.getElementById('email').value = 'estudiante1@uni.edu';
  document.getElementById('password').value = '123456';
}

// Mostrar dashboard
function showDashboard(){
  const user = sessionStorage.getItem('userName') || 'Usuario';
  const email = sessionStorage.getItem('userEmail') || 'usuario@ejemplo.com';
  const last = sessionStorage.getItem('lastLogin') || '-';

  document.getElementById('userName').innerText = user;
  document.getElementById('userEmail').innerText = email;
  document.getElementById('lastLogin').innerText = last;
  document.getElementById('progress').innerText = '20%';

  // mostrar elemento y ocultar login
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('login').classList.add('hidden');

  // cerrar menú en móvil si está abierto
  const nav = document.getElementById('nav');
  if(window.innerWidth <= 768 && nav.classList.contains('active')){
    toggleMenu();
  }
}

// Logout
function logout(){
  sessionStorage.clear();
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}

/**********************
  Carrusel automático
***********************/
let slideIndex = 0;
function cambiarSlide(){
  const slides = document.querySelectorAll('.slide');
  slides.forEach(s => s.style.opacity = 0);
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.opacity = 1;
}

// Inicializar carrusel
function initCarousel() {
  const slides = document.querySelectorAll('.slide');
  if(slides.length) {
    slides[0].style.opacity = 1;
    setInterval(cambiarSlide, 2500);
  }
}

/**********************
  Tabla dinámica de estadísticas
***********************/
const jugadores = [
  {nombre:"Messi", goles:50, asistencias:18},
  {nombre:"Cristiano", goles:42, asistencias:9},
  {nombre:"Mbappé", goles:37, asistencias:12},
  {nombre:"Haaland", goles:44, asistencias:6}
];
let pos = 0;

function agregarDato(){
  const tbody = document.querySelector('#tablaStats tbody');
  if(!tbody) return;
  if(pos >= jugadores.length){
    alert('No hay más datos que agregar');
    return;
  }
  const j = jugadores[pos];
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${j.nombre}</td><td>${j.goles}</td><td>${j.asistencias}</td>`;
  tbody.appendChild(tr);
  pos++;
}

function reiniciarTabla(){
  const tbody = document.querySelector('#tablaStats tbody');
  tbody.innerHTML = '';
  pos = 0;
}

/**********************
  Formulario contacto
***********************/
function enviarFormulario(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const resp = document.getElementById('respuesta');

  if(!nombre || !correo){
    resp.innerText = 'Complete todos los campos';
    resp.style.color = '#d32f2f';
    return;
  }
  resp.innerText = `Gracias ${nombre}, su mensaje fue recibido.`;
  resp.style.color = '#2e7d32';
  e.target.reset();
  
  // Limpiar mensaje después de 3 segundos
  setTimeout(() => {
    resp.innerText = '';
  }, 3000);
}

/**********************
  Smooth scroll para enlaces internos
***********************/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Cerrar menú en móvil
      if(window.innerWidth <= 768) {
        const nav = document.getElementById('nav');
        if(nav.classList.contains('active')) {
          toggleMenu();
        }
      }
    }
  });
});

/**********************
  Inicialización
***********************/
window.addEventListener('load', ()=>{
  // Inicializar carrusel
  initCarousel();
  
  // Si hay usuario ya logueado, mostrar dashboard
  if(sessionStorage.getItem('userEmail')) showDashboard();
  
  // Ajustar altura del carrusel en móvil
  if(window.innerWidth <= 768) {
    const carousel = document.querySelector('.carousel');
    if(carousel) carousel.style.height = '80px';
  }
});

// Ajustar en redimensionamiento
window.addEventListener('resize', () => {
  const carousel = document.querySelector('.carousel');
  if(carousel) {
    carousel.style.height = window.innerWidth <= 768 ? '80px' : '120px';
  }
});