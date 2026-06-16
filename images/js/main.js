// ============================================================
// PIXELFORGE AI - MAIN.JS
// Fungsi utama: navigasi, galeri, FAQ, pricing toggle, generator
// ============================================================

// ---- Hamburger Menu ----
function toggleMenu() {
  var links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

// ---- Tutup menu saat klik tautan ----
document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      document.getElementById('navLinks').classList.remove('open');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 2px 24px rgba(0,212,255,0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }
  });
});

// ---- Gallery Filter ----
function filterGallery(btn, cat) {
  // Update tombol aktif
  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Filter item
  var items = document.querySelectorAll('.gallery-item');
  items.forEach(function (item) {
    if (cat === 'semua' || item.dataset.cat === cat) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// ---- FAQ Toggle ----
function toggleFaq(el) {
  var wasOpen = el.classList.contains('open');
  // Tutup semua
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.classList.remove('open');
  });
  if (!wasOpen) {
    el.classList.add('open');
  }
}

// ---- Ratio Button ----
function setRatio(btn) {
  document.querySelectorAll('.ratio-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
}

// ---- Pricing Toggle ----
function togglePricing() {
  var isYearly = document.getElementById('pricingToggle').checked;
  var creatorEl = document.getElementById('creatorPrice');
  var enterpriseEl = document.getElementById('enterprisePrice');
  if (creatorEl) {
    creatorEl.innerHTML = isYearly
      ? 'Rp 156.000 <span>/ bulan</span><br><small style="color:var(--text2);font-size:.8rem;">Rp 1.872.000 ditagih per tahun</small>'
      : 'Rp 240.000 <span>/ bulan</span>';
  }
  if (enterpriseEl) {
    enterpriseEl.innerHTML = isYearly
      ? 'Rp 871.000 <span>/ bulan</span><br><small style="color:var(--text2);font-size:.8rem;">Rp 10.452.000 ditagih per tahun</small>'
      : 'Rp 1.340.000 <span>/ bulan</span>';
  }
}

// ---- Generator Image (Demo) ----
function generateImage() {
  var prompt = document.getElementById('promptInput').value.trim();
  if (!prompt) {
    alert('Harap masukkan deskripsi gambar terlebih dahulu!');
    return;
  }

  var preview = document.getElementById('genPreview');
  var actions = document.getElementById('genActions');

  // Simulasi loading
  preview.innerHTML = '<i class="fas fa-spinner fa-spin" style="font-size:2.5rem;color:var(--accent);"></i><p>Membuat gambar...</p>';

  setTimeout(function () {
    // Tampilkan gambar contoh dari galeri sebagai demo
    var demoImages = [
      'images/tm-pixel-forge-01.jpg',
      'images/tm-pixel-forge-02.jpg',
      'images/tm-pixel-forge-03.jpg',
      'images/tm-pixel-forge-07.jpg',
      'images/tm-pixel-forge-08.jpg',
      'images/tm-pixel-forge-09.jpg'
    ];
    var randomImg = demoImages[Math.floor(Math.random() * demoImages.length)];
    preview.innerHTML = '<img src="' + randomImg + '" alt="Gambar yang Dibuat" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">';
    if (actions) {
      actions.style.display = 'flex';
    }
  }, 2000);
}
