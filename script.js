document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements (element HTML yang akan kita interaksikan)
    const homeButton = document.getElementById('home-button');
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const menuButtons = document.querySelectorAll('.menu-list a'); // Semua tombol di sidebar
    const mainHeaderTitle = document.getElementById('main-header-title'); // Judul di header utama

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

        // Sembunyikan sidebar di perangkat mobile setelah memilih menu
        if (window.innerWidth <= 768) { // Cek jika ukuran layar adalah mobile
            sidebar.classList.add('hidden');
            // Pastikan main-content kembali ke posisi normal saat sidebar tertutup di mobile
            document.querySelector('.main-content').style.marginLeft = '0';
        }
    }

    // Event Listener: Tombol Hamburger (toggle sidebar di mobile)
    toggleSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden'); // Menambah/menghapus kelas 'hidden'

        // Sesuaikan margin main-content di mobile berdasarkan status sidebar
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('hidden')) {
                // Sidebar tertutup, main-content kembali ke kiri
                document.querySelector('.main-content').style.marginLeft = '0';
            } else {
                // Sidebar terbuka, main-content bergeser ke kanan
                document.querySelector('.main-content').style.marginLeft = '250px';
            }
        }
    });

    // Event Listener: Tombol "Dashboard Utama" di Sidebar
    homeButton.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah link pindah halaman
        showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
    });


    // Event Listener: Kartu "Cek Nilai Siswa" di Dashboard
    if (dashboardCekNilai) { // Memastikan elemennya ada sebelum menambahkan event listener
        dashboardCekNilai.addEventListener('click', (e) => {
            e.preventDefault();
            // Buka Google Apps Script di tab baru (tetap seperti semula)
            window.open('https://script.google.com/macros/s/AKfycbyrO_bYWOUWqNB014iA-yYvLBVWiJ70sv2GiAJ9sqkOZimxaSi70JvICu79K0re0-P7Gg/exec', '_blank');
            // Setelah klik, tetap di dashboard dan aktifkan 'Dashboard Utama' di sidebar
            showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);
        });
    }

    // Event Listener: Kartu "Materi Pelajaran" (placeholder)
    if (dashboardMateri) {
        dashboardMateri.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Materi Pelajaran" akan segera hadir!');
            // Jika suatu saat kamu membuat halaman materi di PWA ini, bisa diganti seperti ini:
            // showView(materiPelajaranView, 'Materi Pelajaran', null); // null karena mungkin tidak ada menu sidebar yang aktif untuk ini
        });
    }

    // Event Listener: Kartu "Latihan Soal" (placeholder)
    if (dashboardLatihan) {
        dashboardLatihan.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Latihan Soal" sedang dalam pengembangan!');
        });
    }

    // Event Listener: Kartu "Video Pembelajaran" (placeholder)
    if (dashboardVideo) {
        dashboardVideo.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Video Pembelajaran" akan segera tersedia!');
        });
    }

    // Event Listener: Kartu "Quiz Online" (placeholder)
    if (dashboardQuiz) {
        dashboardQuiz.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur "Quiz Online" siap menguji pengetahuanmu!');
        });
    }

    // Event Listener: Kartu "Pengumuman" (placeholder)
    if (dashboardInfo) {
        dashboardInfo.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Cek halaman pengumuman untuk informasi terbaru!');
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
    // Ini memastikan saat PWA dibuka, yang pertama kali terlihat adalah kartu-kartu dashboard
    showView(dashboardView, 'Dashboard Aplikasi Nilai', homeButton);

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
