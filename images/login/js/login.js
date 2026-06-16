// ============================================================
// login.js - Fungsi login menggunakan REST API
// API: https://herisusanta.my.id/javalogin/api/
// ============================================================

// Objek konfigurasi API
var apiConfig = {
  baseUrl: 'https://herisusanta.my.id/javalogin/api/',
  loginEndpoint: 'login'
};

// Fungsi untuk menampilkan pesan alert
function showAlert(message, type) {
  var alertEl = document.getElementById('alertMsg');
  alertEl.textContent = message;
  alertEl.className = 'alert-msg ' + type;
  alertEl.style.display = 'block';
  // Auto hide setelah 5 detik untuk pesan sukses
  if (type === 'success') {
    setTimeout(function () {
      alertEl.style.display = 'none';
    }, 5000);
  }
}

// Fungsi toggle tampil/sembunyikan password
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

// Fungsi utama login
function loginUser() {
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();
  var btnText = document.getElementById('btnMasukText');
  var btn = document.getElementById('btnMasuk');

  // Validasi input
  if (!username || !password) {
    showAlert('Harap isi nama pengguna dan kata sandi!', 'error');
    return;
  }

  // Set loading state
  btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sedang masuk...';
  btn.disabled = true;

  // Kirim request ke REST API
  fetch(apiConfig.baseUrl + apiConfig.loginEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Reset tombol
    btnText.textContent = 'Masuk';
    btn.disabled = false;

    if (data.status === 'success' || data.token || data.message === 'Login berhasil' || (data.user && data.user.username)) {
      // Login berhasil
      var namaUser = (data.user && data.user.username) ? data.user.username : username;
      var token = data.token || data.access_token || '';

      // Simpan ke sessionStorage
      sessionStorage.setItem('loggedUser', namaUser);
      sessionStorage.setItem('loggedToken', token);
      sessionStorage.setItem('loggedRole', data.role || 'user');

      showAlert('Login berhasil! Mengalihkan...', 'success');

      // Cek role: admin diarahkan ke halaman admin, user ke landing page
      setTimeout(function () {
        if (data.role === 'admin' || username === 'admin') {
          window.location.href = '../admin/index.html';
        } else {
          window.location.href = '../index.html';
        }
      }, 1200);

    } else {
      // Login gagal
      var pesan = data.message || data.error || 'Nama pengguna atau kata sandi salah!';
      showAlert('Login gagal: ' + pesan, 'error');
    }
  })
  .catch(function (error) {
    // Reset tombol
    btnText.textContent = 'Masuk';
    btn.disabled = false;
    // Coba login lokal sebagai fallback (untuk demo offline)
    loginLokal(username, password);
  });
}

// Fallback login lokal (saat API tidak tersedia / offline)
function loginLokal(username, password) {
  var demoUsers = [
    { username: 'heri', password: '123', role: 'user' },
    { username: 'admin', password: '123', role: 'admin' }
  ];

  var found = demoUsers.find(function (u) {
    return u.username === username && u.password === password;
  });

  if (found) {
    sessionStorage.setItem('loggedUser', found.username);
    sessionStorage.setItem('loggedRole', found.role);
    showAlert('Login berhasil (mode demo)! Mengalihkan...', 'success');
    setTimeout(function () {
      if (found.role === 'admin') {
        window.location.href = '../admin/index.html';
      } else {
        window.location.href = '../index.html';
      }
    }, 1200);
  } else {
    showAlert('Nama pengguna atau kata sandi salah! Coba: heri/123 atau admin/123', 'error');
  }
}
