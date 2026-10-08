// ============================================================================
// APP.JS — Pertemuan 8: JavaScript Modern ES6+, Struktur Data, Array Methods
// P9: berkas ini tetap menyimpan DATA. Hanya `daftarProyek` dan `profil` yang
// diekspor; yang menyentuh halaman ada di js/dom.js.
// ============================================================================

// ---------------------------------------------------------------------------
// LEMBAR B — Data halaman sebagai variabel, bukan teks tertulis di HTML
// ---------------------------------------------------------------------------

// const dipakai karena identitas ini tidak pernah ditunjuk ulang sepanjang skrip.
const namaLengkap = "Muhammad Raihan Afifuddin";
const peran = "Mahasiswa Informatika yang sedang belajar pengembangan web";
const keahlian = ["HTML semantik", "Git dasar", "CSS dan design token"];

// Satu nilai angka yang dicatat tangan dulu di lembar ini.
// Di Lembar D nilai ini dihitung ULANG dari array lewat filter(), supaya
// bisa dibandingkan: angka tangan vs angka hasil hitung array (lihat bawah).
// Nilainya 3, dicocokkan dengan daftarProyek di Lembar D: dari 4 proyek,
// 3 berstatus selesai: true dan 1 belum — bukan angka bebas.
const jumlahProyek = 3;

export const profil = {
  nama: namaLengkap,
  peran,
  keahlian,
};

console.log(`Nama: ${namaLengkap}`);
console.log(`Peran: ${peran}`);
console.log(`Perkiraan proyek selesai (dicatat tangan): ${jumlahProyek}`);
console.log(typeof namaLengkap, typeof jumlahProyek, typeof belumDiisi === "undefined");

// ---------------------------------------------------------------------------
// LEMBAR C — Dua fungsi murni
// ---------------------------------------------------------------------------

// 1. Deklarasi fungsi: menyusun kalimat perkenalan dari satu objek.
//    Murni karena hanya bergantung pada argumen { nama, peran } yang dikirim,
//    dan tidak mengubah apa pun di luar dirinya.
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

// 2. Arrow function: merapikan daftar keahlian jadi satu baris teks.
//    Murni dengan alasan yang sama: argumen masuk, nilai baru keluar.
const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

// Uji cepat: panggil tiga kali dengan argumen berbeda, hasilnya harus masuk akal.
console.log(buatPerkenalan({ nama: "Tes Satu", peran: "Peran Tes" }));
console.log(buatPerkenalan({ nama: "Tes Dua", peran: "Peran Lain" }));
console.log(formatKeahlian(["A", "B"]));

// ---------------------------------------------------------------------------
// LEMBAR D — Struktur data: object dan array of object
// ---------------------------------------------------------------------------

// P9: setiap proyek diberi `kategori` ("web" atau "data"). Nilainya harus sama
// huruf per huruf dengan data-kategori pada tombol filter di profil.html.
export const daftarProyek = [
  { judul: "Aplikasi pre order warung Indomie", tahun: 2026, selesai: true, kategori: "web" },
  { judul: "Praktikum P04 — CSS dan Design Token", tahun: 2026, selesai: true, kategori: "web" },
  { judul: "Aplikasi belajar untuk siswa", tahun: 2026, selesai: true, kategori: "web" },
  { judul: "Worksheet PABW — JavaScript Modern", tahun: 2026, selesai: false, kategori: "data" },
];

console.table(profil.keahlian);
console.table(daftarProyek);

// map — array baru, panjang sama: ambil judulnya saja.
const judulProyek = daftarProyek.map((proyek) => proyek.judul);
console.table(judulProyek);

// filter — array baru, bisa lebih pendek: hanya yang sudah selesai.
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);
console.table(proyekSelesai);
console.log(
  `Angka tangan (${jumlahProyek}) vs hasil filter (${proyekSelesai.length}):`,
  jumlahProyek === proyekSelesai.length ? "cocok" : "TIDAK cocok — perbaiki salah satunya"
);

// find — satu isi, atau undefined: proyek yang judulnya memuat "P04".
const proyekP04 = daftarProyek.find((proyek) => proyek.judul.includes("P04"));
console.log(proyekP04);

// D.2 — salinan yang tidak merusak aslinya
const salinanProfil = { ...profil };          // bukan "const salinanProfil = profil"
const proyekUrutTahun = [...daftarProyek].sort((a, b) => a.tahun - b.tahun); // bukan .sort() langsung
console.log("daftarProyek asli tidak berubah posisinya:", daftarProyek[0].judul);
console.log("salinanProfil bukan objek yang sama dengan profil:", salinanProfil !== profil);

// ---------------------------------------------------------------------------
// LEMBAR E — Tiga kasus sulit, diperagakan sendiri lalu diperbaiki
// Baris-baris di bawah ini SENGAJA ditulis salah dulu (dikomentari), supaya
// bisa dicoba ulang kasus per kasus. Yang aktif adalah versi yang sudah benar.
// ---------------------------------------------------------------------------

// Kasus 1 — undefined pada nilai yang seharusnya ada (label salah ketik).
// Percobaan: console.log(profil.namaLengkap);  -> undefined, sebab labelnya
// tidak pernah ada di objek profil (yang benar: profil.nama).
console.log("Kasus 1, label yang benar:", profil.nama);

// Kasus 2 — Cannot read properties of null (querySelector tidak ketemu).
// Percobaan: document.querySelector("#keahlian").textContent;  -> TypeError,
// sebab tidak ada id="keahlian" di profil.html (yang ada: id="keterampilan").
const bagianKeterampilan = document.querySelector("#keterampilan");
console.log("Kasus 2, elemen ditemukan:", bagianKeterampilan !== null);

// Kasus 3 — nilai dari kolom isian tidak bisa langsung dihitung (selalu teks).
// Percobaan: "2" + 1 menghasilkan "21", bukan 3.
const contohAngkaDariForm = "2";
console.log("Kasus 3, tanpa diubah:", contohAngkaDariForm + 1);
console.log("Kasus 3, setelah Number():", Number(contohAngkaDariForm) + 1);
