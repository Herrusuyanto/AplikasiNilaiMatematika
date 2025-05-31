document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-button');
    const cekNilaiButton = document.getElementById('cek-nilai-button');
    const backToDashboardButton = document.getElementById('back-to-dashboard');
    const dashboardView = document.getElementById('dashboard-view');
    const nilaiView = document.getElementById('nilai-view');
    const appsScriptIframe = document.getElementById('apps-script-iframe');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const menuButtons = document.querySelectorAll('.menu-list a');

    // Fungsi untuk menampilkan loading overlay
    const showLoading = () => {
        loadingOverlay.classList.remove('hidden');
    };

    // Fungsi untuk menyembunyikan loading overlay
    const hideLoading = () => {
        loadingOverlay.classList.add('hidden');
    };

    // Awalnya tampilkan loading overlay
    showLoading();

    // Sembunyikan loading overlay setelah iframe selesai memuat
    appsScriptIframe.onload = () => {
        hideLoading();
    };

    // Handle sidebar toggle for mobile
    toggleSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });

    // Event listener untuk tombol "Dashboard Utama"
    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardView.classList.remove('hidden');
        nilaiView.classList.add('hidden');
        updateActiveClass(homeButton);
        if (window.innerWidth <= 768) { // Sembunyikan sidebar di mobile setelah klik
            sidebar.classList.add('hidden');
        }
    });

    // Event listener untuk tombol "Cek Nilai Siswa"
    cekNilaiButton.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardView.classList.add('hidden');
        nilaiView.classList.remove('hidden');
        updateActiveClass(cekNilaiButton);
        // Muat ulang iframe untuk memastikan kontennya segar
        // appsScriptIframe.src = appsScriptIframe.src; // Opsional: Bisa diaktifkan jika perlu me-refresh iframe setiap kali
        if (window.innerWidth <= 768) { // Sembunyikan sidebar di mobile setelah klik
            sidebar.classList.add('hidden');
        }
        // Pastikan iframe terlihat saat ini
        appsScriptIframe.style.display = 'block';
    });

    // Event listener untuk tombol "Kembali ke Dashboard" (di dalam nilai-view)
    backToDashboardButton.addEventListener('click', () => {
        dashboardView.classList.remove('hidden');
        nilaiView.classList.add('hidden');
        updateActiveClass(homeButton);
        // Sembunyikan iframe saat kembali ke dashboard
        appsScriptIframe.style.display = 'none';
    });

    // Fungsi untuk mengupdate kelas 'active' pada menu
    function updateActiveClass(activeButton) {
        menuButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Sembunyikan iframe secara default saat dashboard-view aktif
    // Ini memastikan iframe tidak terlihat di awal jika browser memuatnya duluan
    if (dashboardView.classList.contains('active')) {
        appsScriptIframe.style.display = 'none';
    }
});

// Pendaftaran Service Worker untuk PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js') // Akan kita buat nanti
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}