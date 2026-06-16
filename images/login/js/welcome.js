// ============================================================
// welcome.js - Menampilkan nama user setelah login berhasil
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  var user = sessionStorage.getItem('loggedUser');
  var role = sessionStorage.getItem('loggedRole');

  var welcomeEl = document.getElementById('welcomeUser');
  var btnLogin = document.getElementById('btnLogin');
  var btnLogout = document.getElementById('btnLogout');

  if (user) {
    // Tampilkan nama user
    if (welcomeEl) {
      welcomeEl.style.display = 'inline';
      welcomeEl.textContent = 'Halo, ' + user + '!';
    }
    // Sembunyikan tombol login, tampilkan tombol logout
    if (btnLogin) btnLogin.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'inline-block';

    // Tampilkan konten khusus user jika ada
    var userContent = document.querySelectorAll('.user-only');
    userContent.forEach(function (el) {
      el.style.display = 'block';
    });

    // Sembunyikan konten hanya untuk tamu jika ada
    var guestContent = document.querySelectorAll('.guest-only');
    guestContent.forEach(function (el) {
      el.style.display = 'none';
    });
  }
});

// Fungsi logout global
function logout() {
  sessionStorage.removeItem('loggedUser');
  sessionStorage.removeItem('loggedToken');
  sessionStorage.removeItem('loggedRole');
  alert('Anda telah berhasil keluar dari PixelForge AI.');
  window.location.href = 'index.html';
}
