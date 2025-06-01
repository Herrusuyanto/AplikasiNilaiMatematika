document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const homeButton = document.getElementById('home-button');
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const menuButtons = document.querySelectorAll('.menu-list a');
    const mainHeaderTitle = document.getElementById('main-header-title');
    const mainContent = document.querySelector('.main-content');

    // Dashboard Menu Cards
    const dashboardCekNilai = document.getElementById('dashboard-cek-nilai');
    const dashboardMateri = document.getElementById('dashboard-materi');
    const dashboardLatihan = document.getElementById('dashboard-latihan');
    const dashboardVideo = document.getElementById('dashboard-video');
    const dashboardQuiz = document.getElementById('dashboard-quiz');
    const dashboardInfo = document.getElementById('dashboard-info');

    // Main Content Views
    const dashboardView = document.getElementById('dashboard-view');
    const settingView = document.getElementById('setting-view');
    const aboutView = document.getElementById('about-view');
    const helpView = document.getElementById('help-view');

    // Sidebar Menu Buttons
    const settingButton = document.getElementById('setting-button');
    const aboutButton = document.getElementById('about-button');
    const helpButton = document.getElementById('help-button');

    // Back to Dashboard Buttons
    const backToDashboardButtons = document.querySelectorAll('.back-to-dashboard-button');

    // --- Fungsi Utama untuk Mengganti Tampilan ---
    function showView(viewToShow, headerTitle, activeSidebarButton = null) {
        // Sembunyikan semua tampilan utama
        const allViews = [dashboardView, settingView, aboutView, helpView];
        allViews.forEach(view => view.classList.add('hidden'));

        // Tampilkan tampilan yang dipilih
        if (viewToShow) {
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

        // --- Perubahan untuk memastikan sidebar selalu menutup setelah klik menu ---
        toggleSidebar(true);
    }

    // --- Fungsi untuk Toggle (Membuka/Menutup) Sidebar ---
    function toggleSidebar(forceClose = false) {
        if (forceClose) {
            sidebar.classList.remove('expanded');
            if (window.innerWidth > 768) {
                 mainContent.classList.remove('shifted');
            }
        } else {
            sidebar.classList.toggle('expanded');
            if (window.innerWidth > 768) {
                if (sidebar.classList.contains('expanded')) {
                    mainContent.classList.add('shifted');
                } else {
                    mainContent.classList.remove('shifted');
                }
            }
        }
        if (window.innerWidth <= 768) {
            mainContent.classList.remove('shifted');
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
            showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI
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
            showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI
        });
    }

    // Event Listener: Kartu lainnya di Dashboard (placeholder)
    if (dashboardMateri) {
        dashboardMateri.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Materi Pelajaran" akan segera hadir!');
            showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI
        });
    }
    if (dashboardLatihan) {
        dashboardLatihan.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Latihan Soal" sedang dalam pengembangan!');
            showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI
        });
    }
    if (dashboardVideo) {
        dashboardVideo.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Video Pembelajaran" akan segera tersedia!');
            showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI
        });
    }
    if (dashboardQuiz) {
        dashboardQuiz.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Quiz Online" siap menguji pengetahuanmu!');
            showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI
        });
    }
    if (dashboardInfo) {
        dashboardInfo.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Cek halaman pengumuman untuk informasi terbaru!');
            showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI
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
            showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI
        });
    });

    // --- Inisialisasi Kondisi Awal Sidebar dan Tampilan ---
    // Panggil toggleSidebar(true) untuk memastikan sidebar selalu tertutup saat DOMContentLoaded
    toggleSidebar(true);

    // Tampilkan dashboard utama saat aplikasi pertama kali dimuat
    showView(dashboardView, 'APLIKASI NILAI MATEMATIKA', homeButton); // <-- PERUBAHAN DI SINI

    // Sesuaikan sidebar saat ukuran jendela berubah (misal dari desktop ke mobile)
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('expanded');
            mainContent.classList.remove('shifted');
        } else {
            // Di desktop, jika sidebar sudah dibuka, biarkan terbuka. Jika tidak, biarkan kompak.
            // Tidak perlu ada logic khusus di sini karena toggleSidebar(true) sudah dipanggil di awal
            // dan toggleSidebar() yang dipanggil oleh hamburger akan menangani expanded/shifted
        }
    });

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
