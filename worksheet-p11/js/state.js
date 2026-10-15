// STATE.JS — P11
// Semua keadaan aplikasi ada di satu objek `state`.
// Yang boleh mengubah state cuma fungsi-fungsi di berkas ini, dan tiap fungsi
// memanggil render() supaya tampilan ikut berubah. Simpan/muat localStorage juga di sini.
import { daftarKategori } from "./data.js";
import { render } from "./dom.js";

// ---------------------------------------------------------------------------
// Objek state tunggal
// ---------------------------------------------------------------------------
export const KATEGORI_BAWAAN = "semua";

export const state = {
  daftarNotisia: [],               // isi dari api.js
  kategoriAktif: KATEGORI_BAWAAN,  // satu-satunya keadaan yang diingat
  status: "memuat",                // "memuat" | "berhasil" | "gagal"
  pesanGalat: "",                  // dipakai kalau status "gagal"
};

// ---------------------------------------------------------------------------
// localStorage: cuma teks, jadi objek lewat JSON
// ---------------------------------------------------------------------------
const KUNCI = "pabw-p11";
const VERSI = 2;

export function simpan(state) {
  // Yang disimpan hanya pilihan tampilan. Daftar notisia, status, dan galat
  // sengaja tidak disimpan (data diambil ulang tiap halaman dibuka).
  const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif };
  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch (galat) {
    console.warn("Simpanan tidak bisa ditulis:", galat.message);
  }
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      aturUlang();                    // bentuk lama atau belum ada: buang
      return null;
    }
    return isi;
  } catch {
    aturUlang();                      // isi rusak (atau localStorage diblokir): buang
    return null;
  }
}

// Menghapus simpanan. Dibungkus try/catch juga, karena kalau peramban memblokir
// localStorage, removeItem pun melempar galat dan halaman ikut berhenti.
export function aturUlang() {
  try {
    localStorage.removeItem(KUNCI);
  } catch (galat) {
    console.warn("Simpanan tidak bisa dihapus:", galat.message);
  }
}

// ---------------------------------------------------------------------------
// Fungsi pengubah: satu pintu untuk setiap perubahan
// ---------------------------------------------------------------------------

// Dipanggil sekali waktu halaman dibuka. Tidak memanggil render: app.js yang menggambar.
export function pulihkan() {
  const isi = muat();                       // null kalau kunjungan pertama atau simpanan rusak
  const tersimpan = isi?.kategoriAktif;
  // nilai tersimpan dicek lagi, jangan percaya begitu saja
  if (daftarKategori.includes(tersimpan)) {
    state.kategoriAktif = tersimpan;
  } else {
    if (isi) aturUlang();                   // ada simpanan tapi nilainya aneh: buang
    state.kategoriAktif = KATEGORI_BAWAAN;
  }
}

export function pilihKategori(nilai) {
  if (!daftarKategori.includes(nilai)) return; // kategori yang tidak dikenal diabaikan
  state.kategoriAktif = nilai;
  simpan(state);                               // simpan dulu, baru gambar
  render(state);
}

export function isiNotisia(daftar) {
  state.daftarNotisia = daftar;
  state.pesanGalat = "";
  state.status = "berhasil";
  render(state);
}

export function gagalMemuat(pesan) {
  state.daftarNotisia = [];
  state.pesanGalat = pesan;
  state.status = "gagal";
  render(state);
}

export function aturUlangPilihan() {
  aturUlang();                                 // hapus simpanan
  state.kategoriAktif = KATEGORI_BAWAAN;
  render(state);
}
