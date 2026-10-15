// DOM.JS — P11
// Semua yang menyentuh halaman ada di sini: pemilih, render, kelas/atribut.
// Berkas ini hanya MEMBACA state untuk menggambar. Tidak ada keadaan yang disimpan di elemen.

// --- pemilih (diambil sekali) ---
const wadah = document.querySelector("#daftar");
const status = document.querySelector("#status-notisia");
const pesanKosong = document.querySelector("#pesan-kosong");
export const filter = document.querySelector("#filter-notisia");
export const tombolAturUlang = document.querySelector("#atur-ulang");

// Kalau ada yang null, berhenti dengan pesan yang jelas (bukan galat samar di tengah jalan).
const elemenWajib = { wadah, status, pesanKosong, filter, tombolAturUlang };
for (const [nama, el] of Object.entries(elemenWajib)) {
  if (el === null) {
    throw new Error(`dom.js: elemen "${nama}" tidak ketemu, cek id di profil.html`);
  }
}

// --- satu kartu dari satu notisia (isi lewat textContent, bukan innerHTML) ---
function buatKartu(notisia) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const judul = document.createElement("h3");
  judul.textContent = notisia.titulu ?? "Judul belum tersedia";

  const kategori = document.createElement("p");
  kategori.className = "kategori-notisia";
  kategori.textContent = notisia.kategori ?? "umum";

  const ringkasan = document.createElement("p");
  ringkasan.textContent = notisia.ringkasan ?? "Belum ada ringkasan.";

  const tanggal = document.createElement("p");
  tanggal.textContent = `Tanggal: ${notisia.tanggal ?? "belum tersedia"}`;

  const sumber = document.createElement("p");
  sumber.textContent = `Sumber: ${notisia.sumber ?? "tidak dicantumkan"}`;

  kartu.append(judul, kategori, ringkasan, tanggal, sumber);
  return kartu;
}

// --- saring: dulu ada di pendengar klik P9, sekarang membaca kategori dari state ---
function saring(state) {
  if (state.kategoriAktif === "semua") return state.daftarNotisia;
  return state.daftarNotisia.filter((item) => item.kategori === state.kategoriAktif);
}

// --- render(state): kosongkan, cek kosong, isi ulang ---
export function render(state) {
  wadah.textContent = "";                           // 1. kosongkan lebih dulu

  // tombol filter: tanda aktif digambar dari state, bukan dibaca dari tombol
  filter.querySelectorAll("button[data-kategori]").forEach((tombol) => {
    tombol.setAttribute("aria-pressed", String(tombol.dataset.kategori === state.kategoriAktif));
  });

  // status memuat / gagal / berhasil
  if (state.status === "memuat") {
    status.textContent = "Memuat notisia...";
    pesanKosong.hidden = true;
    return;
  }
  if (state.status === "gagal") {
    status.textContent = `Gagal memuat data: ${state.pesanGalat}`;
    pesanKosong.hidden = true;
    return;
  }

  const tampil = saring(state);

  if (tampil.length === 0) {                        // 2. keadaan kosong
    status.textContent = "Data berhasil dibaca.";
    pesanKosong.textContent = state.daftarNotisia.length === 0
      ? "Belum ada notisia dari sumber data."
      : "Tidak ada notisia pada kategori ini.";
    pesanKosong.hidden = false;
    return;
  }

  pesanKosong.hidden = true;
  status.textContent =
    `Berhasil memuat ${state.daftarNotisia.length} notisia. Menampilkan ${tampil.length}.`;

  const fragmen = document.createDocumentFragment();
  tampil.forEach((item) => fragmen.append(buatKartu(item)));
  wadah.append(fragmen);                            // 3. isi ulang
}
