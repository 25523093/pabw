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

## Pertemuan 5 — Layout modern: flexbox dan grid

Halaman yang sama dengan Pertemuan 4, disalin ke `worksheet-p5/`. Isi HTML,
warna, dan token tidak berubah; yang berubah hanya CSS yang mengatur posisi.

### Sketsa kerangka

```
+----------------------------------------------------+
| KEPALA (flex)    judul ............ menu   [tema]   |  baris 1: auto
+----------------------------------------------------+
| TENTANG SAYA  (area "tentang", dua kolom)          |
+--------------+-------------------------------------+
| KETERAMPILAN | KARYA  (galeri auto-fit)            |  baris 2: 1fr
| (sidebar,    | HUBUNGI SAYA                        |  kolom: 16rem 1fr
|  span 4 baris)| TANYA JAWAB                        |
|              | PERJALANAN SAYA                     |
+--------------+-------------------------------------+
| KAKI HALAMAN                                       |  baris 3: auto
+----------------------------------------------------+
```

### Keputusan tata letak

| Bagian | Pola | Alasan |
|---|---|---|
| Kerangka `body` | grid `auto 1fr auto`, `min-height: 100dvh` | kepala dan kaki menempel, isi mengisi sisa tinggi |
| Kepala dan menu | flex + `gap` + `flex-wrap` | item berderet satu arah, turun baris sendiri |
| Area isi `main` | grid `16rem 1fr` (layar ≥ 48rem), satu kolom di bawahnya | sidebar tetap, konten lentur |
| Blok Tentang | area bernama `tentang` | menempati dua kolom |
| Blok Keterampilan | `grid-row: 2 / span 4` | sidebar setinggi empat baris |
| Galeri Karya | grid `repeat(auto-fit, minmax(min(16rem, 100%), 1fr))` | kolom berubah tanpa media query |
| Isi kartu dan bagian | flex kolom + `gap` | tersusun berderet, tanpa margin tempelan |

### Tiga kasus sulit yang diperbaiki

- **Tinggi tidak seragam:** kartu memakai `min-height: 8rem` dan `justify-content: flex-start`.
- **Isi panjang:** `min-width: 0` pada bagian dan kartu, `overflow-wrap: anywhere`.
- **Meluber:** tabel kegiatan melewati kotaknya di 360 px, diperbaiki dengan
  `overflow-wrap: anywhere` pada `th` dan `td`.

Diuji pada lebar 320, 360, 768, dan 1 280 px: tidak ada gulir mendatar dan
tidak ada elemen keluar dari kotaknya. Pengalih tema gelap tetap berfungsi.

## Pertemuan 6 — Responsif mobile-first

Halaman yang sama dengan Pertemuan 5, disalin ke `worksheet-p6/`. Ditambah
satu berkas baru, `css/responsif.css`, dimuat paling akhir. Baris meta
viewport dan `img { max-width: 100% }` sudah ada sejak Pertemuan 4, jadi
tidak ditulis ulang.

### Cara kerja `responsif.css`

- **Gaya dasar (tanpa media query):** `main` dan `.katalog` satu kolom,
  berlaku di semua lebar. Ini yang pertama dibaca peramban di ponsel.
- **Titik henti 48rem:** galeri Karya berubah dua kolom.
- **Titik henti 60rem:** sidebar Keterampilan bersanding dengan konten
  (area bernama + `span` empat baris), galeri jadi tiga kolom.

Kedua titik henti memakai `min-width`, jadi sifatnya menambah, bukan
menimpa — gaya dasar tetap berlaku sebagai jaminan minimum di layar sempit.
Titik henti kerangka dua kolom yang tadinya di `layout.css` (48rem, sejak
Pertemuan 5) dipindah ke sini dan angkanya diubah ke 60rem, supaya hanya
satu berkas yang mengatur seluruh titik henti.

### Satu kasus luberan yang ditemukan

Tabel Kegiatan dibungkus `<div class="table-wrap">` dengan
`overflow-x: auto`, tetapi ternyata itu saja belum cukup: karena tabelnya
diizinkan menyusut, isinya malah terpotong per suku kata di layar sempit.
Wadah bergulir baru bekerja setelah tabelnya diberi `min-width: 28rem` —
tabel yang tidak muat jadi digulir oleh wadahnya, bukan dipaksa menyusut.

Diuji pada 360 px, 768 px, dan 1 280 px (tangkapan layar di
`worksheet-p6/bukti/`): tidak ada gulir mendatar pada halaman, jumlah
kolom galeri berubah 1 → 2 → 3, dan tema gelap tetap berfungsi.

## Pertemuan 8 — Data halaman sebagai JavaScript

Halaman yang sama dengan Pertemuan 6, disalin ke `worksheet-p8/`, ditambah
folder `js/` berisi `app.js`. Tampilan halaman tidak berubah di pertemuan
ini — data membaca/menulis ke HTML baru dimulai Pertemuan 9. Semua hasil
di pertemuan ini diperiksa lewat Console.

### Isi `app.js`

- **Data sebagai nilai:** identitas (`nama`, `peran`, `keahlian`) dan daftar
  proyek (`daftarProyek`, array berisi 4 object) disimpan sebagai `const`,
  bukan ditulis di HTML.
- **Dua fungsi murni:** `buatPerkenalan({ nama, peran })` (deklarasi fungsi)
  dan `formatKeahlian(daftar)` (arrow function). Keduanya hanya bergantung
  pada argumennya dan selalu memberi hasil yang sama.
- **Array methods:** `map` (ambil judul saja), `filter` (hanya yang
  `selesai: true`), `find` (cari proyek yang memuat "P04"). Data asli
  tidak diubah — penyalinan memakai `{ ...profil }` dan `[...daftarProyek]`.

### Tiga kasus galat yang saya coba dan perbaiki

| Galat (teks asli dari Console) | Sebabnya | Perbaikan |
|---|---|---|
| `Cannot read properties of null (reading 'textContent')` | `querySelector("#keahlian")` — id itu tidak ada di HTML, yang benar `#keterampilan` | Ganti ke selektor yang benar |
| `"21"` padahal maunya `3` | `"2" + 1` menyambung teks, bukan menjumlahkan | Bungkus dengan `Number("2")` dulu |
| `undefined` pada `profilContoh.namaLengkap` | Label salah ketik, yang benar `nama` | Samakan nama label dengan yang dideklarasikan |

Diuji lewat server lokal (`python3 -m http.server`) — membuka lewat
`file://` langsung menyebabkan galat CORS, persis seperti yang dijelaskan
di Lembar A/E worksheet. Console bersih tanpa pesan merah setelah semua
baris percobaan di atas dikembalikan ke versi yang benar.

### Pengungkapan AI — Pertemuan 8

Struktur `app.js` (urutan lembar B–E, komentar penjelas, dan tiga contoh
kasus galat) disusun dengan bantuan AI berdasarkan worksheet. Data profil
(nama, keahlian, daftar proyek) memakai isi nyata dari halaman saya
sendiri sejak Pertemuan 4. Pengujian Console (memastikan tidak ada galat,
dan mengambil teks galat asli untuk ketiga kasus) dijalankan sendiri.

## Pertemuan 9 — DOM, Event, dan Interaktivitas

Lanjutan dari P8: data di `app.js` sekarang dipasang ke halaman oleh `dom.js`.

| Lembar | Yang dikerjakan | Letak |
|---|---|---|
| A | Wadah `#daftar`, `#filter`, `#pesan-kosong` di HTML; semua pemilih dicek tidak null | `profil.html`, awal `dom.js` |
| B | Kartu proyek dibuat dari array dengan `createElement`, `textContent`, `append` (tanpa `innerHTML`) | `buatKartu()` di `dom.js` |
| C | Satu pendengar `click` di `#filter` (event delegation) memakai `event.target.closest("button")` dan `dataset.kategori`; tombol aktif ditandai kelas `.aktif` | `dom.js`, `komponen.css` |
| D | `render(daftar)`: kosongkan wadah → cek kosong → isi ulang. Form: `preventDefault`, validasi per kolom dengan `trim()`, `aria-invalid`, tombol kirim `disabled` sampai layak | `render()` dan bagian form di `dom.js` |
| E | Tiga kasus sulit: pemilih `null`, pendengar ganda, daftar kosong (lihat `bukti/`) | worksheet E.4 |

Perubahan pada berkas P8:
- `app.js`: setiap proyek diberi `kategori` (`"web"` / `"data"`), dan `daftarProyek` serta `profil` diekspor.
- `profil.html`: daftar tulisan tangan diganti `#filter` + `#daftar` + `#pesan-kosong`; form diberi `id="form-kontak"` dan `novalidate`; ditambah `<script type="module" src="js/dom.js">`.
- `komponen.css`: gaya `.aktif`, `.tidak-sah`, `[aria-invalid="true"]`, dan `button:disabled`; penanda galat form berpindah dari `:user-invalid` ke kelas buatan JavaScript supaya isian spasi saja ikut ditolak.
- Contoh NIM pada bantuan form diperbaiki menjadi 8 digit agar sesuai `pattern`.

### Menjalankan

Modul ES butuh server lokal (bukan klik dua kali pada `profil.html`):

```
cd worksheet-p9
python -m http.server 8000
# buka http://localhost:8000/profil.html
```

### Deklarasi penggunaan AI

- **Dibantu AI :** penulisan `js/dom.js`, penambahan `kategori` + `export` di `app.js`, perubahan `profil.html` dan `komponen.css`.
- **Saya kerjakan sendiri:** halaman profil, isi, dan data proyek dari P3–P8 (`profil.html`, CSS, `app.js`), pemilihan topik, serta menjalankan, membaca, dan memeriksa hasil P9 sebelum diserahkan.


### Satu baris untuk diingat

Id harus persis sama dengan di HTML, dan `addEventListener` dipasang sekali di induk, di luar `render()`.

## Isi paket

- `worksheet-p4/profil.html` — halaman profil pribadi.
- `worksheet-p4/media/foto-profil.jpg` — foto profil yang digunakan pada halaman.
- `worksheet-p4/css/` — lima berkas gaya berbasis design token.
- `worksheet-p4/bukti/` — tempat tangkapan layar hasil evaluasi.
- `worksheet-p5/` — `profil.html` dan lima berkas CSS dengan tata letak flexbox dan grid.
- `worksheet-p6/` — `profil.html`, keenam berkas CSS (lima dari P4/P5 + responsif.css), dan `bukti/` (tiga tangkapan layar 360/768/1280 px).
- `worksheet-p8/` — `profil.html`, seluruh CSS dari P6, dan `js/app.js` (data, fungsi murni, array methods).
- `worksheet-p9/` — `profil.html`, seluruh CSS, `js/app.js` (data + kategori), `js/dom.js` (render, filter, validasi form), dan `bukti/` (tangkapan layar P9).
- `worksheet-p11/` — `profil.html`, seluruh CSS, dan lima modul di `js/` (`data.js`, `state.js`, `dom.js`, `events.js`, `app.js`) ditambah `api.js` dari P10; `bukti/` untuk tangkapan layar P11.

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


## Pertemuan 10 — JavaScript asinkron, fetch, Promise, dan JSON

Bagian P10 melanjutkan halaman profil P9. Berkas baru `js/api.js` memuat alamat API publik `https://jsonplaceholder.typicode.com/posts`, memanggil `fetch`, memeriksa `respons.ok`, membaca JSON, serta mengekspor fungsi `ambilNotisia()`. Data API dipetakan menjadi bentuk yang dapat ditampilkan pada halaman. Berkas `js/dom.js` menangani keadaan memuat, berhasil, gagal, dan kosong; tombol filter dan validasi form P9 tetap dipertahankan.

### Menjalankan
1. Buka folder `worksheet-p10` di VS Code.
2. Jalankan server lokal dari folder ini, misalnya `profil.html dijalankan melalui Live Server di VS Code.`.
3. Periksa DevTools → Console dan Network. API memerlukan koneksi internet dan akses CORS. Jika API tidak dapat dijangkau di jaringan kelas, gunakan berkas JSON lokal dan ubah alamat di satu tempat pada `js/api.js`; catat perubahan tersebut.

### Deklarasi penggunaan AI
AI digunakan untuk membantu menyusun draf kode `js/api.js`, penyesuaian `js/dom.js`, dan merapikan jawaban worksheet. Saya tetap perlu menjalankan proyek, memeriksa Console/Network, mengambil tangkapan layar empat keadaan, dan memastikan saya memahami fungsi setiap bagian sebelum mengumpulkan. Bagian pengujian langsung dan tangkapan layar harus saya isi berdasarkan hasil yang benar-benar saya dapatkan.

## Pertemuan 10 — JavaScript Asinkron, fetch, Promise, dan JSON

Lanjutan dari P9: data informasi diambil secara asinkron, lalu ditampilkan sebagai kartu pada halaman profil. Bagian P4–P9 di atas dipertahankan; bagian ini hanya mencatat tambahan P10.

| Materi | Yang dikerjakan | Letak |
|---|---|---|
| `fetch` dan Promise | Mengambil data dari berkas JSON lokal dan menangani Promise secara asinkron | `js/api.js` |
| Pemeriksaan respons | Memeriksa `response.ok` sebelum membaca isi respons dengan `response.json()` | `js/api.js` |
| `async/await` dan `try/catch` | Menunggu data dan menampilkan penanganan jika permintaan atau pembacaan data gagal | `js/api.js`, `js/dom.js` |
| JSON | Menyediakan contoh `JSON.parse()` dan `JSON.stringify()` | `js/api.js` |
| Tampilan dinamis | Membuat kartu informasi menggunakan `createElement` dan `textContent`, serta filter kategori | `js/dom.js`, `profil.html`, `css/komponen.css` |
| Keadaan UI | Menangani keadaan memuat, berhasil, gagal, dan kosong | `js/dom.js` |

### Berkas tambahan P10

- `js/api.js` — fungsi `ambilNotisia()` untuk mengambil dan memeriksa data.
- `js/dom.js` — menampilkan data dan menangani filter serta keadaan antarmuka.
- `notisia.json` — contoh data JSON lokal yang digunakan oleh fitur P10.
- `profil.html` dan `css/komponen.css` — ditambahkan bagian informasi dan gaya terkait tanpa menghapus bagian profil yang sudah ada.
- `js/app.js` — logika sebelumnya dipertahankan; ditambahkan impor `js/dom.js` untuk mengaktifkan fitur P10.

### Menjalankan dan memeriksa P10

profil.html dijalankan melalui Live Server di VS Code. `profil.html`:


Kemudian buka `http://127.0.0.1:5500/profil.html`. Buka DevTools (`F12`) dan periksa tab **Console** serta **Network**. Coba tombol filter **Semua**, **Informatika**, **Kuliah**, dan **Web**.

Uji juga keadaan memuat, berhasil, gagal, dan kosong. Untuk uji kosong, jalankan `gambarNotisia([])` di Console. Untuk uji gagal, ubah sementara nama berkas JSON pada `js/api.js`, muat ulang halaman, lalu kembalikan nama berkas seperti semula. Ambil tangkapan layar sendiri setelah pengujian benar-benar dilakukan; jangan mencantumkan bukti yang belum diambil.

### Deklarasi penggunaan AI — Pertemuan 10

AI membantu menyusun tambahan awal untuk `js/api.js`, `js/dom.js`, bagian P10 pada `profil.html`, tambahan CSS, dan draf dokumentasi P10. Isi README dari pertemuan sebelumnya dipertahankan dan hanya bagian P10 ini yang ditambahkan. Kode perlu dijalankan dan diperiksa sendiri sebelum pengumpulan, lalu catatan hasil uji serta bukti disesuaikan dengan hasil yang benar-benar diamati.

## Pertemuan 11 — Modul, State, dan Penyimpanan Klien

Bagian P11 melanjutkan halaman profil P10. Kode JavaScript dipecah menjadi modul ES (`type="module"`) dengan tugas masing-masing:

- `js/data.js` — data profil dan daftar proyek, tanpa import.
- `js/state.js` — satu objek `state` (notisia, kategori aktif, status, pesan galat) beserta fungsi yang mengubahnya; setiap perubahan memanggil `render`. Di sini juga fungsi `simpan`, `muat`, `pulihkan`, dan `aturUlang` untuk localStorage.
- `js/dom.js` — mengambil elemen dan menggambar ulang halaman dari `state`.
- `js/events.js` — pendengar klik (delegasi di induk tombol filter dan tombol atur ulang).
- `js/api.js` — tetap seperti P10 (satu-satunya tempat `fetch`).
- `js/app.js` — perakit: memulihkan pilihan, memasang pendengar, menggambar, lalu memuat notisia.

### Yang disimpan di localStorage
Hanya kategori filter yang aktif, dengan kunci `pabw-p11` dan nomor versi (`versi: 2`). Sengaja tidak disimpan: isi form, token, kata sandi, atau data pribadi. Kalau isi penyimpanan rusak (bukan JSON), versinya berbeda, atau kategorinya tidak dikenal, data dibuang dan filter kembali ke "Semua" tanpa membuat halaman error. Tombol "Atur ulang filter" juga menghapusnya.

### Menjalankan
1. Buka folder `worksheet-p11` di VS Code, lalu jalankan `profil.html` dengan Live Server (modul tidak jalan lewat `file://`).
2. Buka DevTools (`F12`) → Console dan Network.
3. Pilih kategori, muat ulang, dan pastikan pilihan bertahan. Untuk menguji penyimpanan rusak: `localStorage.setItem("pabw-p11", "bukan-json")` di Console, lalu muat ulang.
4. Versi alat: `node -v` = v24.22.0 dan `npm -v` = 11.19.1

### Deklarasi penggunaan AI — Pertemuan 11
AI membantu memecah kode menjadi lima modul, menulis logika penyimpanan, menjalankan pengujian otomatis (Playwright) untuk keadaan memuat/berhasil/gagal/kosong dan penyimpanan rusak, serta mengisi draf worksheet. Saya sendiri masih perlu menjalankan di komputer saya, mengambil tangkapan layar yang benar-benar nyata, mengisi versi Node/npm. Isi README sebelumnya tidak diubah, hanya ditambah satu baris di "Isi paket" dan bagian ini.
