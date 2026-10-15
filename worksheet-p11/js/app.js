// APP.JS — P11
// Perakit: cuma mengimpor berkas lain dan menjalankannya. Tidak ada logika di sini.
import { ambilNotisia } from "./api.js";        // lapisan data dari P10, dipakai apa adanya
import { state, muat, pulihkan, isiNotisia, gagalMemuat } from "./state.js";
import { render } from "./dom.js";
import { pasangPendengar } from "./events.js";

// Modul tidak masuk window, jadi dua ini dibuka supaya bisa dicek dari Console
// (console.log(state), console.log(muat())).
window.state = state;
window.muat = muat;

pulihkan();            // baca pilihan terakhir dari localStorage
pasangPendengar();     // pasang pendengar sekali
render(state);         // gambar awal: status "memuat" + pilihan terakhir

try {
  isiNotisia(await ambilNotisia());   // masuk ke state, lalu digambar
} catch (galat) {
  gagalMemuat(galat.message);         // galat dari api.js ditangkap di sini
}
