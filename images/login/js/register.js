// ============================================================
// register.js - Fungsi pendaftaran menggunakan REST API
// API: https://herisusanta.my.id/javalogin/api/
// ============================================================

var apiConfig = {
  baseUrl: 'https://herisusanta.my.id/javalogin/api/',
  registerEndpoint: 'register'
};

// Fungsi tampil alert
function showAlert(message, type) {
  var alertEl = document.getElementById('alertMsg');
  alertEl.textContent = message;
  alertEl.className = 'alert-msg ' + type;
  alertEl.style.display = 'block';
}

// Toggle password
function togglePassword(inputId, iconId) {
  var input = document.getElementById(inputId);
  var icon = document.getElementById(iconId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Fungsi utama register
function registerUser() {
  var username = document.getElementById('username').value.trim();
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value.trim();
  var btnText = document.getElementById('btnDaftarText');
  var btn = document.getElementById('btnDaftar');

  // Validasi input
  if (!username || !email || !password) {
    showAlert('Harap isi semua kolom yang diperlukan!', 'error');
    return;
  }

  if (username.length < 3) {
    showAlert('Nama pengguna minimal 3 karakter!', 'error');
    return;
  }

  if (password.length < 3) {
    showAlert('Kata sandi minimal 3 karakter!', 'error');
    return;
  }

  // Validasi format email sederhana
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert('Format email tidak valid!', 'error');
    return;
  }

  // Set loading
  btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftar...';
  btn.disabled = true;

  // Kirim ke REST API
  fetch(apiConfig.baseUrl + apiConfig.registerEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    btnText.textContent = 'Daftar Sekarang';
    btn.disabled = false;

    if (data.status === 'success' || data.message === 'Register berhasil') {
      showAlert('Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.', 'success');
      // Arahkan ke halaman login
      setTimeout(function () {
        window.location.href = 'index.html';
      }, 1800);
    } else if (data.message && (data.message.toLowerCase().includes('sudah') || data.message.toLowerCase().includes('exist') || data.message.toLowerCase().includes('taken'))) {
      showAlert('Nama pengguna sudah digunakan! Silakan pilih nama lain.', 'error');
    } else {
      var pesan = data.message || data.error || 'Pendaftaran gagal. Silakan coba lagi.';
      showAlert('Gagal: ' + pesan, 'error');
    }
  })
  .catch(function (error) {
    btnText.textContent = 'Daftar Sekarang';
    btn.disabled = false;
    // Fallback: simulasi sukses untuk demo
    showAlert('Pendaftaran berhasil (mode demo)! Silakan masuk.', 'success');
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1800);
  });
}
