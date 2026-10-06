/* ===== Elemen ===== */
const btnTema = document.querySelector('#btnToggleTema');
const btnBahasa = document.querySelector('#btnBahasa');
const bodyHalaman = document.body;

const btnBukaModal = document.querySelector('#btnKontak');
const elemenModal = document.querySelector('#modalKontak');
const btnTutupModal = document.querySelector('#btnTutupModal');

/* ===== Kamus Terjemahan ===== */
const terjemahan = {
    id: {
        role: 'Junior Web Developer',
        kirimPesan: 'Kirim Pesan',
        tentangJudul: 'Tentang Saya',
        tentangIsi: 'Siswa kelas 10 Rekayasa Perangkat Lunak yang berfokus mendalami arsitektur Front-End modern, tata letak CSS Flexbox, serta prinsip Mobile-First Responsive Design standar industri.',
        keahlianJudul: 'Keahlian & Kompetensi',
        modalJudul: 'Kirim Pesan',
        modalIsi: 'Silakan hubungi saya melalui email: siswa@smkbrantaskarangkates.sch.id',
        tutup: 'Tutup',
        temaTerang: '☀️ Mode Terang',
        temaGelap: '🌙 Mode Gelap',
        tombolBahasa: '🌐 EN'
    },
    en: {
        role: 'Junior Web Developer',
        kirimPesan: 'Send Message',
        tentangJudul: 'About Me',
        tentangIsi: 'A 10th-grade Software Engineering student focused on modern Front-End architecture, CSS Flexbox layouts, and industry-standard Mobile-First Responsive Design principles.',
        keahlianJudul: 'Skills & Competencies',
        modalJudul: 'Send Message',
        modalIsi: 'Feel free to contact me via email: siswa@smkbrantaskarangkates.sch.id',
        tutup: 'Close',
        temaTerang: '☀️ Light Mode',
        temaGelap: '🌙 Dark Mode',
        tombolBahasa: '🌐 ID'
    }
};

let bahasaSekarang = 'id';

/* ===== Bahasa ===== */
function terapkanBahasa(bahasa) {
    bahasaSekarang = bahasa;
    document.documentElement.lang = bahasa;

    // Ganti semua teks yang punya atribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        const kunci = el.getAttribute('data-i18n');
        if (terjemahan[bahasa][kunci]) {
            el.textContent = terjemahan[bahasa][kunci];
        }
    });

    btnBahasa.textContent = terjemahan[bahasa].tombolBahasa;
    perbaruiTeksTema();
}

btnBahasa.addEventListener('click', function () {
    const baru = bahasaSekarang === 'id' ? 'en' : 'id';
    terapkanBahasa(baru);
    try {
        localStorage.setItem('bahasa', baru);
    } catch (e) { }
});

/* ===== Tema ===== */
function perbaruiTeksTema() {
    const terang = bodyHalaman.classList.contains('light-mode');
    btnTema.textContent = terang
        ? terjemahan[bahasaSekarang].temaGelap
        : terjemahan[bahasaSekarang].temaTerang;
}

btnTema.addEventListener('click', function () {
    bodyHalaman.classList.toggle('light-mode');
    perbaruiTeksTema();
    try {
        localStorage.setItem('tema', bodyHalaman.classList.contains('light-mode') ? 'terang' : 'gelap');
    } catch (e) { }
});

/* ===== Modal ===== */
function bukaModal() {
    elemenModal.classList.add('show');
    btnTutupModal.focus();
}

function tutupModal() {
    elemenModal.classList.remove('show');
    btnBukaModal.focus();
}

btnBukaModal.addEventListener('click', function (event) {
    event.preventDefault();
    bukaModal();
});

btnTutupModal.addEventListener('click', tutupModal);

// Klik area gelap di luar kotak modal
elemenModal.addEventListener('click', function (event) {
    if (event.target === elemenModal) {
        tutupModal();
    }
});

// Tombol Escape
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && elemenModal.classList.contains('show')) {
        tutupModal();
    }
});

/* ===== Muat Pengaturan Tersimpan ===== */
let temaTersimpan = null;
let bahasaTersimpan = null;
try {
    temaTersimpan = localStorage.getItem('tema');
    bahasaTersimpan = localStorage.getItem('bahasa');
} catch (e) { }

bodyHalaman.classList.toggle('light-mode', temaTersimpan === 'terang');
terapkanBahasa(bahasaTersimpan === 'en' ? 'en' : 'id');