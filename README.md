# PABW — Muhammad Raihan Afifuddin — 25523093

Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi Berbasis Web,
satu folder untuk setiap pertemuan.

## Pertemuan 4 — Halaman profil saya

Halaman profil ini dibuat untuk memperkenalkan Muhammad Raihan Afifuddin,
mahasiswa Program Studi Informatika Universitas Islam Indonesia. Halaman
berisi informasi diri, kegiatan, karya, keterampilan, dan formulir kontak.

### Arah visual

- **Arah visual:** Tegas dan teknis
- **Warna utama:** `#060F27` (navy nyaris hitam) — diambil dari warna langit
  malam pada foto profil saya sendiri di bagian Tentang saya
- **Warna netral:** `--gray-50 #F8FAFC` untuk latar, `--gray-900 #0F172A`
  untuk teks; latar kartu putih `#FFFFFF`, garis tepi `#D1D5DB`
- **Ukuran huruf:** teks isi 1rem, judul bagian 1.5rem, judul halaman 2.25rem
- **Jarak dasar:** skala 4 langkah — 0.25rem / 0.5rem / 0.75rem / 1rem, dan
  1.5rem untuk jarak antar bagian halaman
- **Radius & bayangan:** radius 0.5rem untuk tombol dan kartu, radius penuh
  999px untuk bentuk pil, bayangan halus `0 1px 3px rgba(0,0,0,.10)`

### Design token yang saya tetapkan

| Token | Nilai | Untuk apa |
|---|---|---|
| `--color-primary` | `#060F27` | tombol, tautan, penanda |
| `--color-fg` | `#0F172A` | warna teks utama |
| `--color-bg` | `#F8FAFC` | latar halaman |
| `--color-surface` | `#FFFFFF` | latar kartu dan panel |
| `--color-border` | `#D1D5DB` | garis pemisah dan tepi kotak |
| `--color-focus` | `#3E4F74` | garis fokus papan ketik |
| `--radius-md` | `0.5rem` | sudut tombol dan kartu |
| `--space-4` | `1rem` | jarak standar antar elemen |

Kriteria selesai saya: mengubah `--color-primary` cukup di satu baris (lapis
primitif `--blue-700` di `tokens.css`), lalu tombol, tautan, judul, dan garis
fokus ikut berubah sekaligus tanpa menyunting berkas lain.

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
