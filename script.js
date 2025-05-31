document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-button');
    const cekNilaiButton = document.getElementById('cek-nilai-button');
    const backToDashboardButton = document.getElementById('back-to-dashboard');
    const dashboardView = document.getElementById('dashboard-view');
    const nilaiView = document.getElementById('nilai-view');
    const loadingOverlay = document.getElementById('loadingOverlay'); // Dapatkan elemen loading overlay
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const menuButtons = document.querySelectorAll('.menu-list a');

    // URL App Web Apps Script-mu (ini URL /exec ASLI-mu)
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyrO_bYWOUWqNB014iA-yYvLBVWiJ70sv2GiAJ9sqkOZimxaSi70JvICu79K0re0-P7Gg/exec'; // <--- URL KAMU SUDAH ADA DI SINI

    // Fungsi untuk menampilkan loading overlay
    const showLoading = () => {
        loadingOverlay.classList.remove('hidden');
    };

    // Fungsi untuk menyembunyikan loading overlay
    const hideLoading = () => {
        loadingOverlay.classList.add('hidden');
    };

    // Sembunyikan loading overlay segera setelah DOMContentLoaded
    // Ini memastikan overlay hilang saat PWA dimuat, karena kita tidak lagi memuat iframe Apps Script
    hideLoading(); // Ini akan menjalankan fungsi hideLoading saat halaman dimuat

    // Handle sidebar toggle for mobile
    toggleSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });

    // Event listener untuk tombol "Dashboard Utama"
    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardView.classList.remove('hidden');
        nilaiView.classList.add('hidden'); // Sembunyikan nilai-view
        updateActiveClass(homeButton);
        if (window.innerWidth <= 768) {
            sidebar.classList.add('hidden');
        }
    });

    // Event listener untuk tombol "Cek Nilai Siswa"
    cekNilaiButton.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah perilaku default link
        // Buka App Web Apps Script di tab browser baru
        window.open(appsScriptUrl, '_blank');

        // Setelah membuka tab baru, kita bisa kembali ke tampilan dashboard utama PWA
        dashboardView.classList.remove('hidden');
        nilaiView.classList.add('hidden');
        updateActiveClass(homeButton); // Set tombol dashboard utama sebagai aktif
        if (window.innerWidth <= 768) {
            sidebar.classList.add('hidden');
        }
    });

    // Event listener untuk tombol "Kembali ke Dashboard" (di dalam nilai-view)
    // Fungsi ini masih dipertahankan meskipun tombol cek nilai membuka tab baru,
    // mungkin berguna jika ada navigasi internal di masa depan
    backToDashboardButton.addEventListener('click', () => {
        dashboardView.classList.remove('hidden');
        nilaiView.classList.add('hidden');
        updateActiveClass(homeButton);
    });

    // Fungsi untuk mengupdate kelas 'active' pada menu
    function updateActiveClass(activeButton) {
        menuButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Bagian ini dihapus karena tidak ada iframe Apps Script yang dimuat di awal PWA
    // appsScriptIframe.onload = () => { hideLoading(); };
    // if (dashboardView.classList.contains('active')) { appsScriptIframe.style.display = 'none'; }
});

// Pendaftaran Service Worker untuk PWA
// Bagian ini penting agar PWA bisa diinstal di perangkat
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js') // Kita akan membuat file sw.js ini nanti
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
