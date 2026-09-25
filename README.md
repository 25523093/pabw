# Praktikum P04 — Design Token untuk Halaman Profil Saya

Halaman profil ini dibuat untuk memperkenalkan Muhammad Raihan Afifuddin,
mahasiswa Program Studi Informatika Universitas Islam Indonesia. Halaman
berisi informasi diri, kegiatan, karya, keterampilan, dan formulir kontak.

## Isi paket

- `worksheet-p4/profil.html` — halaman profil pribadi.
- `worksheet-p4/media/foto-profil.jpg` — foto profil yang digunakan pada halaman.
- `worksheet-p4/css/` — lima berkas gaya berbasis design token.
- `worksheet-p4/bukti/` — tempat tangkapan layar hasil evaluasi.

## Tiga pekerjaan utama

1. Mengisi sembilan bagian profil, yaitu nama, tagline, foto, deskripsi diri,
   tabel kegiatan, tiga karya, NIM, dan identitas footer.
2. Menambahkan tiga bagian semantik baru di dalam `<main>`:
   `<details>` untuk Tanya Jawab, `<ol>` dan `<time>` untuk Perjalanan Saya,
   serta `<dl>` untuk Keterampilan.
3. Membuat dan menggunakan lima berkas CSS dengan sistem design token untuk
   mengatur warna, tipografi, tata letak, komponen form, dan tema gelap.

## Bagian tambahan

- **Tanya Jawab** memakai `<details>` dan `<summary>` untuk pembaca yang ingin
  mengenal saya secara singkat. Bagian ini menjawab apa yang sedang saya
  pelajari dan alat yang saya gunakan sehari-hari.
- **Perjalanan Saya** memakai `<ol>` dan `<time>` untuk pembaca yang ingin
  mengetahui perkembangan pendidikan dan pengalaman belajar saya, mulai dari
  kuliah di UII sampai membuat halaman profil ini.
- **Keterampilan** memakai `<dl>` untuk memperkenalkan kemampuan saya dalam
  HTML semantik, Git dasar, dan CSS design token.

## Lima berkas gaya

| Berkas | Isi |
|---|---|
| `css/tokens.css` | Token mentah dan token peran untuk warna, jarak, radius, bayangan, dan ukuran teks. |
| `css/base.css` | Reset ringan, `box-sizing`, tipografi dasar, dan warna halaman. |
| `css/layout.css` | Navbar flex, susunan bagian halaman, katalog karya, kartu, dan footer. |
| `css/komponen.css` | Form, tombol, keadaan fokus, validasi isian, tabel, dan tiga bagian tambahan. |
| `css/tema.css` | Tema gelap, pengalih tema, dan token warna untuk mode gelap. |

Token warna utama yang digunakan adalah `--blue-700: #060F27` dan token
perannya adalah `--color-primary: #060F27`. Warna ini digunakan pada tombol,
tautan, penanda, dan elemen aksen halaman.

## Evaluasi yang dilaporkan

- **W3C Nu Html Checker:** 0 error setelah penambahan bagian profil dan
  struktur semantik.
- **WCAG kontras tema terang:** Lolos. Teks utama memiliki rasio 17.06:1,
  tautan 18.16:1, dan tombol 19.00:1 terhadap latar yang digunakan.
- **WCAG kontras tema gelap:** Lolos. Teks utama memiliki rasio 14.48:1,
  tautan 7.56:1, dan tombol 6.19:1.
- **WCAG navigasi Tab:** Ya. Tautan, kolom formulir, tombol, bagian Tanya
  Jawab, link lewati, dan pengalih tema dapat dijangkau dengan Tab.
- **WCAG tanpa bantuan warna:** Informasi tetap disampaikan melalui judul,
  teks, label form, struktur semantik, dan pesan validasi, bukan hanya warna.

## Bukti

Lima tangkapan layar hasil pengerjaan dan evaluasi tersedia di folder
[`worksheet-p4/bukti/`](worksheet-p4/bukti/):

- [`lighthouse-akhir.png`](worksheet-p4/bukti/lighthouse-akhir.png) — hasil Lighthouse akhir.
- [`tema-gelap.png`](worksheet-p4/bukti/tema-gelap.png) — tampilan tema gelap.
- [`w3checker.png`](worksheet-p4/bukti/w3checker.png) — hasil pemeriksaan W3C Nu Html Checker.
- [`zoom-200.png`](worksheet-p4/bukti/zoom-200.png) — tampilan saat zoom 200%.
- [`tukar-token.png`](worksheet-p4/bukti/tukar-token.png) — perubahan tampilan setelah nilai token warna ditukar.

## Catatan penggunaan AI

Struktur README dan perapian deskripsi bagian halaman dibantu AI. Konten
profil, pengalaman belajar, daftar karya, dan keterampilan disesuaikan dengan
kegiatan serta proyek yang saya kerjakan sendiri.

## Pengumpulan

Folder `worksheet-p4/` berisi `profil.html`, `css/`, `media/`, dan `bukti/`.
Berkas dikumpulkan ke repositori GitHub pribadi setelah seluruh evaluasi dan
bukti tangkapan layar selesai diperiksa.
