// ============================================
// TRACKER.JS - Sistema de seguimiento multiusuario
// Guarda en localStorage por usuario
// ============================================

// Obtener usuario actual
function getCurrentUser() {
  return localStorage.getItem('jon_current_user') || 'desconocido';
}

// Prefijo para claves de localStorage segun usuario
function userKey(key) {
  var user = getCurrentUser().toLowerCase().replace(/[^a-z0-9]/g, '');
  return user + '_' + key;
}

// Guardar resultado en localStorage
function saveResult(ejercicio, aciertos, total, nota, porcentaje) {
  var fecha = new Date().toLocaleDateString('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  var user = getCurrentUser();
  var result = { fecha: fecha, usuario: user, ejercicio: ejercicio, aciertos: aciertos, total: total, nota: nota, porcentaje: porcentaje };

  // Guardar en localStorage (por usuario)
  var history = JSON.parse(localStorage.getItem(userKey('history')) || '[]');
  history.unshift(result);
  if (history.length > 100) history = history.slice(0, 100);
  localStorage.setItem(userKey('history'), JSON.stringify(history));

  // Guardar mejor nota por ejercicio (por usuario)
  var bests = JSON.parse(localStorage.getItem(userKey('bests')) || '{}');
  if (!bests[ejercicio] || nota > bests[ejercicio].nota) {
    bests[ejercicio] = { nota: nota, porcentaje: porcentaje, fecha: fecha };
  }
  localStorage.setItem(userKey('bests'), JSON.stringify(bests));
}

// Obtener calificacion segun nota
function getCalificacion(nota) {
  if (nota >= 9)  return { label: 'Sobresaliente', icon: '\u{1F947}', medal: 'Oro',    color: '#FFD700', bg: '#28a745' };
  if (nota >= 7)  return { label: 'Notable',       icon: '\u{1F948}', medal: 'Plata',  color: '#C0C0C0', bg: '#5cb85c' };
  if (nota >= 6)  return { label: 'Bien',           icon: '\u{1F949}', medal: 'Bronce', color: '#CD7F32', bg: '#f0ad4e' };
  if (nota >= 5)  return { label: 'Suficiente',     icon: '\u{1F949}', medal: 'Bronce', color: '#CD7F32', bg: '#e67e22' };
  return           { label: 'Suspenso',      icon: '\u274C',    medal: '',       color: '#ccc',    bg: '#dc3545' };
}

// Alias para compatibilidad con historial de tarjetas
function getMedal(nota) {
  var c = getCalificacion(nota);
  return { icon: c.icon, label: c.medal || c.label, color: c.color };
}

// Obtener historial del usuario actual
function getHistory() {
  return JSON.parse(localStorage.getItem(userKey('history')) || '[]');
}

// Obtener mejores notas del usuario actual
function getBests() {
  return JSON.parse(localStorage.getItem(userKey('bests')) || '{}');
}

// Mostrar panel de resultado con calificacion despues de verificar
function showResultWithMedal(score, total, containerId) {
  var nota = Math.round((score / total) * 100) / 10;
  var pct = Math.round((score / total) * 100);
  var cal = getCalificacion(nota);

  var emoji;
  if (nota >= 9)      emoji = '\u{1F31F}';
  else if (nota >= 7) emoji = '\u{1F44F}';
  else if (nota >= 6) emoji = '\u{1F44D}';
  else if (nota >= 5) emoji = '\u{1F4DA}';
  else                emoji = '\u{1F4AA}';

  var mensaje;
  if (nota >= 9)      mensaje = 'Bikain! Excelente! ' + cal.icon;
  else if (nota >= 7) mensaje = 'Oso ondo! Muy bien! ' + cal.icon;
  else if (nota >= 6) mensaje = 'Ondo! Bien hecho! ' + cal.icon;
  else if (nota >= 5) mensaje = 'Aprobado! ' + cal.icon + ' Sigue practicando.';
  else                mensaje = 'Ez etsi! No te rindas! Repasa e intentalo de nuevo.';

  var r = document.getElementById(containerId);
  r.style.display = 'block';
  r.innerHTML = '<h2>' + emoji + ' Emaitzak / Resultados</h2>' +
    '<div style="font-size:4em;font-weight:bold;margin:10px 0;color:' + cal.bg + '">' + score + ' / ' + total + '</div>' +
    '<div style="width:100%;height:30px;background:#eee;border-radius:15px;overflow:hidden;margin:15px 0">' +
    '<div style="height:100%;width:' + pct + '%;background:' + cal.bg + ';border-radius:15px;transition:width 1s ease"></div>' +
    '</div>' +
    '<p style="font-size:1.1em;margin:8px 0;color:#555">Porcentaje: ' + pct + '%</p>' +
    '<div style="font-size:3em;margin:10px 0">' + cal.icon + '</div>' +
    '<div style="font-size:1.5em;font-weight:bold;margin-top:10px;padding:10px 25px;border-radius:10px;display:inline-block;background:' + cal.bg + '20;color:' + cal.bg + '">' +
    'Nota: ' + nota.toFixed(1) + ' / 10' +
    '</div>' +
    '<div style="font-size:1.3em;font-weight:bold;margin-top:12px;padding:8px 20px;border-radius:8px;display:inline-block;background:' + cal.bg + ';color:white">' +
    cal.label.toUpperCase() +
    '</div>' +
    '<p style="margin-top:12px;font-size:1.1em;color:#555">' + mensaje + '</p>';

  return { nota: nota, pct: pct };
}

// Verificar que hay usuario logueado
function requireLogin() {
  if (!localStorage.getItem('jon_current_user')) {
    var path = window.location.pathname;
    var segments = path.split('/').filter(function(s) { return s.length > 0; });
    if (segments.length > 1) {
      window.location.href = '../index.html';
    } else {
      window.location.href = 'index.html';
    }
  }
}
