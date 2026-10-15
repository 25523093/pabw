// EVENTS.JS — P11
// Semua pendengar peristiwa dipasang di sini, sekali saja, dari app.js.
// Pendengar tidak mengubah state langsung. Dia memanggil fungsi pengubah di state.js.
import { filter, tombolAturUlang } from "./dom.js";
import { pilihKategori, aturUlangPilihan } from "./state.js";

export function pasangPendengar() {
  // satu pendengar di induk melayani semua tombol filter (event delegation)
  filter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button[data-kategori]");
    if (!tombol) return;                 // klik di luar tombol, abaikan
    pilihKategori(tombol.dataset.kategori);
  });

  tombolAturUlang.addEventListener("click", () => {
    aturUlangPilihan();
  });
}
