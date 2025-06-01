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
        // Cek jika ukuran layar adalah mobile ATAU sidebar saat ini dalam mode expanded
        if (window.innerWidth <= 768 || sidebar.classList.contains('expanded')) {
            // Hindari menutup sidebar jika itu adalah inisialisasi awal di desktop
            if (!(window.innerWidth > 768 && sidebar.dataset.initialLoad === 'true')) {
                toggleSidebar(true); // Panggil fungsi toggle untuk menutup sidebar (forceClose = true)
            }
        }
        // Hapus flag initialLoad setelah pemuatan pertama
        if (sidebar.dataset.initialLoad) {
            delete sidebar.dataset.initialLoad;
        }
    }

    // Fungsi untuk toggle (membuka/menutup) sidebar
    // forceClose: boolean, jika true akan memaksa sidebar untuk menutup
    function toggleSidebar(forceClose = false) {
        if (forceClose && !sidebar.classList.contains('expanded')) {
            // Jika memaksa menutup dan sidebar sudah tertutup, jangan lakukan apa-apa
            return;
        }

        if (forceClose) {
            sidebar.classList.remove('expanded');
        } else {
            sidebar.classList.toggle('expanded'); // Toggle jika tidak dipaksa
        }
        
        if (window.innerWidth > 768) { // Hanya pengaruhi margin main-content di desktop
            if (sidebar.classList.contains('expanded')) {
                mainContent.classList.add('shifted');
            } else {
                mainContent.classList.remove('shifted');
            }
        }
        // Di mobile, main-content selalu 0 margin-left, sidebar overlay
        // Perubahan ini hanya untuk visual, bukan fungsional di mobile
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('expanded')) {
                // Saat sidebar terbuka di mobile, mungkin ingin overlay ke kanan, tapi kita sudah handle di CSS
            } else {
                // Saat sidebar tertutup di mobile, pastikan tidak ada sisa margin
                mainContent.style.marginLeft = '0';
            }
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
        // Cari span yang bukan icon
        const textSpan = button.querySelector('span:not(.icon)');
        if (textSpan) { // Pastikan elemen span ditemukan
            const textContent = textSpan.textContent.trim();
            if (textContent) { // Hanya tambahkan jika ada teks konten
                button.setAttribute('data-tooltip', textContent);
            }
        }
    });

    // Event Listener: Kartu "Cek Nilai Siswa" di Dashboard
    if (dashboardCekNilai) {
        dashboardCekNilai.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://script.google.com/macros/s/AKfycbyrO_bYWOUWqNB014iA-yYvLBVWiJ70sv2GiAJ9sqkOZimxaSi70JvICu79K0re0-P7Gg/exec', '_blank');
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton); // Kembali ke dashboard setelah alert
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
    // Di desktop, sidebar defaultnya expanded. Di mobile, sidebar defaultnya hidden (kompak).
    function setInitialSidebarState() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('expanded');
            mainContent.classList.add('shifted');
        } else {
            sidebar.classList.remove('expanded'); // Pastikan tidak ada class expanded
            // Di mobile, main-content harus punya margin-left 0, sudah di CSS
        }
    }

    // Set kondisi awal sidebar saat DOMContentLoaded
    setInitialSidebarState();

    // Sesuaikan sidebar saat ukuran jendela berubah (misal dari desktop ke mobile)
    window.addEventListener('resize', setInitialSidebarState);


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
});
