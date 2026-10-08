// ============================================================================
// DOM.JS — Pertemuan 9: DOM, Event, dan Interaktivitas
// app.js menyimpan DATA; berkas ini yang menyentuh halaman.
// Urutan: (1) ambil elemen, (2) render dari data, (3) pendengar, (4) form.
// ============================================================================

import { daftarProyek } from "./app.js";

// ---------------------------------------------------------------------------
// LEMBAR A — Ambil elemen sekali di atas, lalu pastikan tidak ada yang null
// ---------------------------------------------------------------------------
const wadah = document.querySelector("#daftar");          // <ul> tempat kartu dipasang
const barisFilter = document.querySelector("#filter");    // induk tombol filter
const kosong = document.querySelector("#pesan-kosong");   // pesan keadaan kosong
const ringkasan = document.querySelector("#ringkasan");   // "Menampilkan X dari Y"
const form = document.querySelector("#form-kontak");
const tombolKirim = form?.querySelector('button[type="submit"]');
const statusForm = document.querySelector("#status-form");

// Gagal keras dan jelas, bukan diam-diam: nama elemen yang null langsung tercetak.
const elemenWajib = { wadah, barisFilter, kosong, ringkasan, form, tombolKirim, statusForm };
for (const [nama, el] of Object.entries(elemenWajib)) {
  if (el === null || el === undefined) {
    throw new Error(`dom.js: elemen "${nama}" tidak ditemukan — periksa id di profil.html`);
  }
}

// ---------------------------------------------------------------------------
// LEMBAR B + D.1 — Render: kosongkan → periksa kosong → isi ulang
// ---------------------------------------------------------------------------
function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";

  const judul = document.createElement("span");
  judul.className = "judul";
  judul.textContent = proyek.judul;            // teks, bukan HTML

  const meta = document.createElement("span");
  meta.className = "meta";
  meta.textContent =
    `${proyek.tahun} · ${proyek.selesai ? "Selesai" : "Sedang dikerjakan"} · ${proyek.kategori}`;

  li.append(judul, meta);
  return li;
}

function render(daftar) {
  wadah.textContent = "";                      // 1. kosongkan lebih dulu
  ringkasan.textContent = `Menampilkan ${daftar.length} dari ${daftarProyek.length} proyek.`;

  if (daftar.length === 0) {                   // 2. periksa keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment(); // halaman digambar sekali
  daftar.forEach((proyek) => fragmen.append(buatKartu(proyek)));
  wadah.append(fragmen);                       // 3. isi ulang
}

// ---------------------------------------------------------------------------
// LEMBAR C — Satu pendengar di induk melayani semua tombol filter
// ---------------------------------------------------------------------------
function tandaiTombolAktif(tombolAktif) {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

// Dipasang SEKALI, di luar render. Tombol yang ditambahkan kemudian tetap terlayani.
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;                         // klik di luar tombol, abaikan

  const kategori = tombol.dataset.kategori;
  const terpilih = daftarProyek.filter(
    (proyek) => kategori === "semua" || proyek.kategori === kategori
  );
  tandaiTombolAktif(tombol);
  render(terpilih);
});

// ---------------------------------------------------------------------------
// LEMBAR D.2 — Validasi form: preventDefault, per kolom, tombol menunggu
// Tiap aturan mengembalikan pesan galat (cara memperbaiki) atau "" bila layak.
// ---------------------------------------------------------------------------
const aturan = {
  nama: (v) => (v.trim() === "" ? "Nama wajib diisi. Ketik nama lengkap Anda, bukan hanya spasi." : ""),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? ""
      : "Masukkan alamat email yang benar, contoh nama@contoh.com.",
  nim: (v) =>
    /^[0-9]{8}$/.test(v.trim()) ? "" : "NIM harus tepat 8 digit angka, tanpa spasi atau huruf.",
  pesan: (v) => (v.trim() === "" ? "Tulis pesan Anda sebelum mengirim; spasi saja tidak dihitung." : ""),
};

const kolomForm = Object.keys(aturan).map((nama) => form.elements[nama]);

// Memeriksa satu kolom, memperbarui tampilannya, mengembalikan true bila layak.
function periksaKolom(kolom) {
  const galat = aturan[kolom.name](kolom.value);
  const pembungkus = kolom.closest(".form-kolom");
  const pesanGalat = pembungkus.querySelector(".pesan-galat");

  pembungkus.classList.toggle("tidak-sah", galat !== "");
  pesanGalat.textContent = galat;
  if (galat === "") {
    kolom.removeAttribute("aria-invalid");
  } else {
    kolom.setAttribute("aria-invalid", "true");
  }
  return galat === "";
}

// Bila seluruh kolom layak, tombol dibuka; bila tidak, ditahan.
function perbaruiTombol() {
  const sah = kolomForm.every((kolom) => aturan[kolom.name](kolom.value) === "");
  tombolKirim.disabled = !sah;
  return sah;
}

// Saat mengetik: hanya kolom yang sedang diketik diperiksa (pesan hilang tepat
// ketika isinya layak), lalu keadaan tombol diperbarui. Satu pendengar di <form>.
form.addEventListener("input", (event) => {
  const kolom = event.target.closest("input, textarea");
  if (!kolom || !(kolom.name in aturan)) return;
  periksaKolom(kolom);
  perbaruiTombol();
  statusForm.hidden = true;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();                      // baris pertama: halaman tidak dimuat ulang

  const hasil = kolomForm.map(periksaKolom);   // semua kolom diperiksa, bukan berhenti di yang pertama
  const pertamaSalah = kolomForm[hasil.indexOf(false)];
  perbaruiTombol();

  if (pertamaSalah) {
    statusForm.hidden = true;
    pertamaSalah.focus();                      // pandangan pindah ke kolom yang perlu diperbaiki
    return;
  }

  statusForm.textContent = `Terima kasih, ${form.elements.nama.value.trim()}. Pesan Anda sudah dicatat.`;
  statusForm.hidden = false;
  form.reset();
  kolomForm.forEach((kolom) => {
    kolom.removeAttribute("aria-invalid");
    kolom.closest(".form-kolom").classList.remove("tidak-sah");
  });
  tombolKirim.disabled = false;                // kembali ke keadaan awal
});

// ---------------------------------------------------------------------------
// Tampilan awal: semua proyek, tombol "semua" bertanda aktif
// ---------------------------------------------------------------------------
render(daftarProyek);
