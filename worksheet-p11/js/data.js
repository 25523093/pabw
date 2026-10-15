// DATA.JS — P11
// Isinya cuma data mentah dan fungsi murni (hasil panggilan sama kalau argumennya sama).
// Berkas ini tidak menyentuh halaman dan tidak tahu apa-apa soal state.

// --- data diri (dipindah dari app.js P8) ---
export const namaLengkap = "Muhammad Raihan Afifuddin";
export const peran = "Mahasiswa Informatika yang sedang belajar pengembangan web";
export const keahlian = ["HTML semantik", "Git dasar", "CSS dan design token"];

export const profil = {
  nama: namaLengkap,
  peran,
  keahlian,
};

// --- daftar proyek (dipindah dari app.js P8) ---
export const daftarProyek = [
  { judul: "Aplikasi pre order warung Indomie", tahun: 2026, selesai: true },
  { judul: "Praktikum P04 — CSS dan Design Token", tahun: 2026, selesai: true },
  { judul: "Aplikasi belajar untuk siswa", tahun: 2026, selesai: true },
  { judul: "Worksheet PABW — JavaScript Modern", tahun: 2026, selesai: false },
];

// --- pilihan kategori filter notisia ---
// Harus sama huruf per huruf dengan data-kategori pada tombol di profil.html.
// Dipakai state.js untuk mengecek nilai yang dibaca dari localStorage.
export const daftarKategori = ["semua", "informatika", "kuliah", "web"];

// --- dua fungsi murni dari P8 ---
export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");
