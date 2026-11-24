const botonMenu = document.getElementById('botonMenu');
const menuPrincipal = document.getElementById('menuPrincipal');
botonMenu.addEventListener('click', function () {
  menuPrincipal.classList.toggle('visible');
  const abierto = menuPrincipal.classList.contains('visible');
  botonMenu.setAttribute('aria-expanded', abierto);
  botonMenu.textContent = abierto ? '✕' : '☰';
});

const botonesDesplegables = document.querySelectorAll('.nav-desplegable');
botonesDesplegables.forEach(function (boton) {
  boton.addEventListener('click', function () {
    const item = boton.parentElement;
    const estabaAbierto = item.classList.contains('abierto');
    document.querySelectorAll('.nav-item').forEach(function (otro) {
      otro.classList.remove('abierto');
      otro.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    if (!estabaAbierto) {
      item.classList.add('abierto');
      boton.setAttribute('aria-expanded', 'true');
    }
  });
});

document.querySelectorAll('.menu a').forEach(function (enlace) {
  enlace.addEventListener('click', function () {
    menuPrincipal.classList.remove('visible');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.textContent = '☰';
  });
});

const botonesAcordeon = document.querySelectorAll('.boton-acordeon');
botonesAcordeon.forEach(function (boton) {
  boton.addEventListener('click', function () {
    const item = boton.parentElement;
    const abierto = item.classList.contains('abierto');
    document.querySelectorAll('.item-acordeon').forEach(function (otro) {
      otro.classList.remove('abierto');
      otro.querySelector('button').setAttribute('aria-expanded', 'false');
      otro.querySelector('.boton-acordeon span').textContent = '+';
    });
    if (!abierto) {
      item.classList.add('abierto');
      boton.setAttribute('aria-expanded', 'true');
      boton.querySelector('span').textContent = '−';
    }
  });
});


const modal = document.getElementById('modalVideo');
const reproductor = document.getElementById('reproductor');
const tituloVideo = document.getElementById('tituloVideo');
const cerrarVideo = document.getElementById('cerrarVideo');
document.querySelectorAll('[data-video]').forEach(function (boton) {
  boton.addEventListener('click', function () {
    tituloVideo.textContent = boton.getAttribute('data-titulo');
    reproductor.src = boton.getAttribute('data-video');
    modal.hidden = false;
  });
});
function cerrarReproductor() {
  modal.hidden = true;
  reproductor.pause();
  reproductor.removeAttribute('src');
  reproductor.load();
}
cerrarVideo.addEventListener('click', cerrarReproductor);
modal.addEventListener('click', function (evento) {
  if (evento.target === modal) cerrarReproductor();
});
document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape' && !modal.hidden) cerrarReproductor();
});


document.querySelectorAll('.imagen-pendiente').forEach(function (elemento) {
  const estilo = elemento.getAttribute('style');
  const resultado = estilo.match(/url\(['"]?([^'"\)]+)['"]?\)/);
  if (resultado) {
    const imagen = new Image();
    imagen.onload = function () { elemento.classList.remove('sin-imagen'); };
    imagen.onerror = function () { elemento.classList.add('sin-imagen'); };
    imagen.src = resultado[1];
  }
});
