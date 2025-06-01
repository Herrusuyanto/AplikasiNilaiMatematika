document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements (element HTML yang akan kita interaksikan)
    const homeButton = document.getElementById('home-button');
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const menuButtons = document.querySelectorAll('.menu-list a'); // Semua tombol di sidebar
    const mainHeaderTitle = document.getElementById('main-header-title'); // Judul di header utama
    const mainContent = document.querySelector('.main-content'); // Main content untuk mengatur margin

    // Dashboard Menu Cards (kartu-kartu menu di dashboard)
    const dashboardCekNilai = document.getElementById('dashboard-cek-nilai');
    const dashboardMateri = document.getElementById('dashboard-materi');
    const dashboardLatihan = document.getElementById('dashboard-latihan');
    const dashboardVideo = document.getElementById('dashboard-video');
    const dashboardQuiz = document.getElementById('dashboard-quiz'); // Kartu Quiz Online
    const dashboardInfo = document.getElementById('dashboard-info');   // Kartu Pengumuman

    // Main Content Views (bagian-bagian konten yang akan ditampilkan/disembunyikan)
    const dashboardView = document.getElementById('dashboard-view');
    const settingView = document.getElementById('setting-view');
    const aboutView = document.getElementById('about-view');
    const helpView = document.getElementById('help-view');

    // Sidebar Menu Buttons (tombol menu di sidebar)
    const settingButton = document.getElementById('setting-button');
    const aboutButton = document.getElementById('about-button');
    const helpButton = document.getElementById('help-button');

    // Back to Dashboard Buttons (tombol 'Kembali ke Dashboard' di halaman info)
    const backToDashboardButtons = document.querySelectorAll('.back-to-dashboard-button');


    // Fungsi untuk mengubah tampilan utama
    // viewToShow: elemen section yang akan ditampilkan (misal: dashboardView, settingView)
    // headerTitle: teks yang akan ditampilkan di header utama (misal: 'Dashboard Aplikasi Nilai')
    // activeSidebarButton: tombol sidebar yang akan diberi kelas 'active' (misal: homeButton)
    function showView(viewToShow, headerTitle, activeSidebarButton = null) {
        // Sembunyikan semua tampilan utama
        const allViews = [dashboardView, settingView, aboutView, helpView];
        allViews.forEach(view => view.classList.add('hidden'));

        // Tampilkan tampilan yang dipilih
        viewToShow.classList.remove('hidden');

        // Perbarui judul di header utama
        mainHeaderTitle.textContent = headerTitle;

        // Perbarui kelas 'active' di sidebar (hanya satu yang aktif)
        menuButtons.forEach(button => {
            button.classList.remove('active');
        });
        if (activeSidebarButton) { // Pastikan tombol aktifnya ada
            activeSidebarButton.classList.add('active');
        }

        /* --- PERUBAHAN BARU UNTUK SIDEBAR OTOMATIS TERTUTUP --- */
        // Setelah memilih menu, otomatis tutup sidebar (kembali ke mode kompak)
        // Kecuali jika ini adalah inisialisasi awal dan sidebar belum di-toggle sama sekali
        if (sidebar.classList.contains('expanded') && !sidebar.dataset.initialLoad) {
            toggleSidebar(); // Panggil fungsi toggle untuk menutup sidebar
        }
        // Hapus flag initialLoad setelah pemuatan pertama
        if (sidebar.dataset.initialLoad) {
            delete sidebar.dataset.initialLoad;
        }
    }

    // Fungsi untuk toggle (membuka/menutup) sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('expanded'); // Tambah/hapus kelas 'expanded'
        if (window.innerWidth > 768) { // Hanya pengaruhi margin main-content di desktop
            mainContent.classList.toggle('shifted'); // Tambah/hapus kelas 'shifted'
        }
    }

    // Event Listener: Tombol Hamburger (toggle sidebar)
    toggleSidebarButton.addEventListener('click', () => {
        toggleSidebar();
    });

    // Event Listener: Tombol "Dashboard Utama" di Sidebar
    homeButton.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah link pindah halaman
        showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
    });

    // Tambahkan atribut data-tooltip untuk semua tombol menu di sidebar
    // Ini akan digunakan oleh CSS untuk tooltip saat sidebar kompak
    menuButtons.forEach(button => {
        const textContent = button.querySelector('span:not(.icon)').textContent.trim();
        if (textContent) { // Hanya tambahkan jika ada teks konten
            button.setAttribute('data-tooltip', textContent);
        }
    });

    // Event Listener: Kartu "Cek Nilai Siswa" di Dashboard
    if (dashboardCekNilai) {
        dashboardCekNilai.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://script.google.com/macros/s/AKfycbyrO_bYWOUWqNB014iA-yYvLBVWiJ70sv2GiAJ9sqkOZimxaSi70JvICu79K0re0-P7Gg/exec', '_blank');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    }

    // Event Listener: Kartu "Materi Pelajaran" (placeholder)
    if (dashboardMateri) {
        dashboardMateri.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Materi Pelajaran" akan segera hadir!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton); // Kembali ke dashboard setelah alert
        });
    }

    // Event Listener: Kartu "Latihan Soal" (placeholder)
    if (dashboardLatihan) {
        dashboardLatihan.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Latihan Soal" sedang dalam pengembangan!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton); // Kembali ke dashboard setelah alert
        });
    }

    // Event Listener: Kartu "Video Pembelajaran" (placeholder)
    if (dashboardVideo) {
        dashboardVideo.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Video Pembelajaran" akan segera tersedia!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton); // Kembali ke dashboard setelah alert
        });
    }

    // Event Listener: Kartu "Quiz Online" (placeholder)
    if (dashboardQuiz) {
        dashboardQuiz.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Quiz Online" siap menguji pengetahuanmu!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton); // Kembali ke dashboard setelah alert
        });
    }

    // Event Listener: Kartu "Pengumuman" (placeholder)
    if (dashboardInfo) {
        dashboardInfo.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Cek halaman pengumuman untuk informasi terbaru!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton); // Kembali ke dashboard setelah alert
        });
    }

    // Event Listener: Tombol "Pengaturan" di Sidebar
    settingButton.addEventListener('click', (e) => {
        e.preventDefault();
        showView(settingView, 'Pengaturan Aplikasi', settingButton);
    });

    // Event Listener: Tombol "Tentang Aplikasi" di Sidebar
    aboutButton.addEventListener('click', (e) => {
        e.preventDefault();
        showView(aboutView, 'Tentang Aplikasi', aboutButton);
    });

    // Event Listener: Tombol "Bantuan" di Sidebar
    helpButton.addEventListener('click', (e) => {
        e.preventDefault();
        showView(helpView, 'Bantuan', helpButton);
    });

    // Event Listener: Semua tombol "Kembali ke Dashboard"
    backToDashboardButtons.forEach(button => {
        button.addEventListener('click', () => {
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    });

    // Inisialisasi: Tampilkan dashboard utama saat aplikasi pertama kali dimuat
    // Set flag agar sidebar tidak otomatis tertutup saat pemuatan pertama
    sidebar.dataset.initialLoad = 'true';
    showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);

    // Untuk memastikan sidebar berfungsi dengan baik saat pertama kali dimuat
    // Ini menangani kasus refresh atau navigasi langsung ke URL
    if (window.innerWidth > 768) { // Di desktop, sidebar defaultnya expanded
        sidebar.classList.add('expanded');
        mainContent.classList.add('shifted');
    } else { // Di mobile, sidebar defaultnya hidden (kompak)
        sidebar.classList.remove('expanded'); // Pastikan tidak ada class expanded
    }


    // Pendaftaran Service Worker untuk PWA (pastikan ini ada jika ingin fitur instalasi)
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
});
