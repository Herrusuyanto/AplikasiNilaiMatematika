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
    const dashboardQuiz = document.getElementById('dashboard-quiz');
    const dashboardInfo = document.getElementById('dashboard-info');

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

    // --- Fungsi Utama untuk Mengganti Tampilan ---
    function showView(viewToShow, headerTitle, activeSidebarButton = null) {
        // Sembunyikan semua tampilan utama
        const allViews = [dashboardView, settingView, aboutView, helpView];
        allViews.forEach(view => view.classList.add('hidden'));

        // Tampilkan tampilan yang dipilih
        if (viewToShow) { // Pastikan viewToShow tidak null/undefined
            viewToShow.classList.remove('hidden');
        }

        // Perbarui judul di header utama
        mainHeaderTitle.textContent = headerTitle;

        // Perbarui kelas 'active' di sidebar (hanya satu yang aktif)
        menuButtons.forEach(button => {
            button.classList.remove('active');
        });
        if (activeSidebarButton) {
            activeSidebarButton.classList.add('active');
        }

        // Otomatis tutup sidebar setelah memilih menu, terutama di mobile
        // Atau jika sidebar sedang dalam mode expanded di desktop
        if (window.innerWidth <= 768 || sidebar.classList.contains('expanded')) {
            // Kecuali jika ini adalah inisialisasi awal di desktop (agar sidebar tetap expanded)
            if (!(window.innerWidth > 768 && sidebar.dataset.initialLoad === 'true')) {
                toggleSidebar(true); // Memaksa sidebar untuk menutup
            }
        }
        // Hapus flag initialLoad setelah pemuatan pertama (hanya untuk kontrol inisialisasi)
        if (sidebar.dataset.initialLoad) {
            delete sidebar.dataset.initialLoad;
        }
    }

    // --- Fungsi untuk Toggle (Membuka/Menutup) Sidebar ---
    function toggleSidebar(forceClose = false) {
        if (forceClose) {
            // Jika dipaksa tutup, hapus class 'expanded'
            sidebar.classList.remove('expanded');
        } else {
            // Jika tidak dipaksa, toggle class 'expanded'
            sidebar.classList.toggle('expanded');
        }

        // Sesuaikan margin main-content hanya di desktop
        if (window.innerWidth > 768) {
            if (sidebar.classList.contains('expanded')) {
                mainContent.classList.add('shifted');
            } else {
                mainContent.classList.remove('shifted');
            }
        }
    }

    // --- Event Listeners ---

    // Event Listener: Tombol Hamburger (toggle sidebar)
    if (toggleSidebarButton) {
        toggleSidebarButton.addEventListener('click', () => {
            toggleSidebar();
        });
    }

    // Event Listener: Tombol "Dashboard Utama" di Sidebar
    if (homeButton) {
        homeButton.addEventListener('click', (e) => {
            e.preventDefault();
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    }

    // Tambahkan atribut data-tooltip untuk semua tombol menu di sidebar (untuk CSS tooltip)
    menuButtons.forEach(button => {
        const textSpan = button.querySelector('span:not(.icon)');
        if (textSpan) {
            const textContent = textSpan.textContent.trim();
            if (textContent) {
                button.setAttribute('data-tooltip', textContent);
            }
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

    // Event Listener: Kartu lainnya di Dashboard (placeholder)
    // Saya menambahkan showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
    // agar setelah alert, tampilan tetap di dashboard dan tombol home aktif.
    if (dashboardMateri) {
        dashboardMateri.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Materi Pelajaran" akan segera hadir!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    }
    if (dashboardLatihan) {
        dashboardLatihan.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Latihan Soal" sedang dalam pengembangan!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    }
    if (dashboardVideo) {
        dashboardVideo.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Video Pembelajaran" akan segera tersedia!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    }
    if (dashboardQuiz) {
        dashboardQuiz.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Quiz Online" siap menguji pengetahuanmu!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    }
    if (dashboardInfo) {
        dashboardInfo.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Cek halaman pengumuman untuk informasi terbaru!');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    }

    // Event Listener: Tombol "Pengaturan", "Tentang", "Bantuan" di Sidebar
    if (settingButton) {
        settingButton.addEventListener('click', (e) => {
            e.preventDefault();
            showView(settingView, 'Pengaturan Aplikasi', settingButton);
        });
    }
    if (aboutButton) {
        aboutButton.addEventListener('click', (e) => {
            e.preventDefault();
            showView(aboutView, 'Tentang Aplikasi', aboutButton);
        });
    }
    if (helpButton) {
        helpButton.addEventListener('click', (e) => {
            e.preventDefault();
            showView(helpView, 'Bantuan', helpButton);
        });
    }

    // Event Listener: Semua tombol "Kembali ke Dashboard"
    backToDashboardButtons.forEach(button => {
        button.addEventListener('click', () => {
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    });

    // --- Inisialisasi Kondisi Awal Sidebar dan Tampilan ---
    // Fungsi untuk mengatur kondisi awal sidebar berdasarkan ukuran layar
    function setInitialSidebarState() {
        if (window.innerWidth > 768) { // Desktop
            sidebar.classList.add('expanded');
            mainContent.classList.add('shifted');
        } else { // Mobile
            sidebar.classList.remove('expanded'); // Pastikan tidak ada class expanded
            // Di mobile, main-content harus punya margin-left 0 (sudah di CSS)
        }
    }

    // Panggil fungsi inisialisasi saat DOMContentLoaded
    setInitialSidebarState();
    // Panggil lagi saat jendela diubah ukurannya (misal: rotasi HP, resize browser)
    window.addEventListener('resize', setInitialSidebarState);

    // Set flag agar sidebar tidak otomatis tertutup saat pemuatan pertama
    sidebar.dataset.initialLoad = 'true';
    showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);


    // --- Pendaftaran Service Worker untuk PWA ---
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
