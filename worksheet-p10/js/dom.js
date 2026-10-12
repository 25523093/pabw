// DOM.JS — tambahan P9/P10 pada salinan proyek.
// Mengatur keadaan halaman, membuat kartu, dan memfilter kategori.
// Pengambilan data hanya dilakukan melalui ambilNotisia() dari api.js.
import { ambilNotisia, contohArahJSON } from "./api.js";

const wadah = document.querySelector("#daftar");
const status = document.querySelector("#status-notisia");
const pesanKosong = document.querySelector("#pesan-kosong");
const filter = document.querySelector("#filter-notisia");

let semuaNotisia = [];
let kategoriAktif = "semua";

function gambar(daftar) {
  // Kosongkan dahulu supaya kartu tidak berlipat saat dimuat ulang/filter.
  wadah.textContent = "";
  pesanKosong.hidden = daftar.length !== 0;

  if (daftar.length === 0) {
    pesanKosong.textContent = semuaNotisia.length === 0
      ? "Belum ada notisia dari sumber data."
      : "Tidak ada notisia pada kategori ini.";
    return;
  }

  daftar.forEach((notisia) => {
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
    wadah.appendChild(kartu);
  });
}

function terapkanFilter() {
  const hasil = kategoriAktif === "semua"
    ? semuaNotisia
    : semuaNotisia.filter((item) => item.kategori === kategoriAktif);

  gambar(hasil);
  if (semuaNotisia.length > 0) {
    status.textContent = `Berhasil memuat ${semuaNotisia.length} notisia. Menampilkan ${hasil.length}.`;
  }
}

filter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button[data-kategori]");
  if (!tombol) return;

  kategoriAktif = tombol.dataset.kategori;
  filter.querySelectorAll("button[data-kategori]").forEach((item) => {
    item.setAttribute("aria-pressed", String(item === tombol));
  });
  terapkanFilter();
});

async function tampilkanNotisia() {
  status.textContent = "Memuat notisia...";
  pesanKosong.hidden = true;
  wadah.textContent = "";

  try {
    semuaNotisia = await ambilNotisia();
    contohArahJSON();

    if (semuaNotisia.length === 0) {
      status.textContent = "Data berhasil dibaca.";
      gambar([]);
      return;
    }

    terapkanFilter();
  } catch (galat) {
    semuaNotisia = [];
    wadah.textContent = "";
    pesanKosong.hidden = true;
    status.textContent = `Gagal memuat data: ${galat.message}`;
  }
}

// Dapat dipanggil untuk menguji keadaan kosong dari Console DevTools.
window.gambarNotisia = gambar;

tampilkanNotisia();
