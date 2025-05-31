document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-button');
    const cekNilaiButton = document.getElementById('cek-nilai-button');
    const dashboardView = document.getElementById('dashboard-view');
    const nilaiView = document.getElementById('nilai-view'); // Tetap ada di DOM tapi selalu hidden
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
        nilaiView.classList.add('hidden'); // Pastikan nilai-view selalu tersembunyi
        updateActiveClass(homeButton);
        if (window.innerWidth <= 768) {
            sidebar.classList.add('hidden');
        }
    });

    // Event listener untuk tombol "Cek Nilai Siswa" - INI KUNCI UTAMANYA
    cekNilaiButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Buka Google Apps Script di tab baru
        window.open('https://script.google.com/macros/s/AKfycbyrO_bYWOUWqNB014iA-yYvLBVWiJ70sv2GiAJ9sqkOZimxaSi70JvICu79K0re0-P7Gg/exec', '_blank');

        // Setelah membuka tab baru, kita tetap di dashboard PWA
        dashboardView.classList.remove('hidden'); // Pastikan dashboard utama tetap terlihat
        nilaiView.classList.add('hidden'); // Pastikan nilai-view tersembunyi
        updateActiveClass(cekNilaiButton); // Tandai menu Cek Nilai aktif
        if (window.innerWidth <= 768) {
            sidebar.classList.add('hidden');
        }
    });

    // Fungsi untuk mengupdate kelas 'active' pada menu
    function updateActiveClass(activeButton) {
        menuButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Pastikan nilaiView selalu tersembunyi saat PWA dimuat pertama kali
    nilaiView.classList.add('hidden');
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
