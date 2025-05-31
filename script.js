document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-button');
    const cekNilaiButton = document.getElementById('cek-nilai-button');
    const backToDashboardButton = document.getElementById('back-to-dashboard');
    const dashboardView = document.getElementById('dashboard-view');
    const nilaiView = document.getElementById('nilai-view');
    const appsScriptIframe = document.getElementById('apps-script-iframe');
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const menuButtons = document.querySelectorAll('.menu-list a');

    // Handle sidebar toggle for mobile
    toggleSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });

    // Event listener untuk tombol "Dashboard Utama"
    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardView.classList.remove('hidden'); // Tampilkan dashboard utama
        nilaiView.classList.add('hidden'); // Sembunyikan nilai-view
        updateActiveClass(homeButton);
        if (window.innerWidth <= 768) {
            sidebar.classList.add('hidden');
        }
        appsScriptIframe.style.display = 'none'; // Pastikan iframe tersembunyi di dashboard utama
    });

    // Event listener untuk tombol "Cek Nilai Siswa"
    cekNilaiButton.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardView.classList.add('hidden'); // Sembunyikan dashboard utama
        nilaiView.classList.remove('hidden'); // Tampilkan nilai-view (dengan iframe)
        updateActiveClass(cekNilaiButton);
        if (window.innerWidth <= 768) {
            sidebar.classList.add('hidden');
        }
        // Muat ulang iframe untuk memastikan kontennya segar
        appsScriptIframe.src = appsScriptIframe.src; // Memaksa iframe untuk me-refresh
        appsScriptIframe.style.display = 'block'; // Pastikan iframe terlihat
    });

    // Event listener untuk tombol "Kembali ke Dashboard" (di dalam nilai-view)
    backToDashboardButton.addEventListener('click', () => {
        dashboardView.classList.remove('hidden');
        nilaiView.classList.add('hidden');
        updateActiveClass(homeButton);
        appsScriptIframe.style.display = 'none'; // Sembunyikan iframe saat kembali ke dashboard
    });

    // Fungsi untuk mengupdate kelas 'active' pada menu
    function updateActiveClass(activeButton) {
        menuButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Pastikan iframe tersembunyi saat PWA dimuat pertama kali
    appsScriptIframe.style.display = 'none';
});

// Pendaftaran Service Worker untuk PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
