// API.JS — P10: lapisan pengambilan data dipisahkan dari tampilan.
// Data memakai notisia.json lokal sebagai alternatif yang stabil tanpa API key.
const ALAMAT = new URL("../notisia.json", import.meta.url);
export async function ambilNotisia() {
  try {
    const respons = await fetch(ALAMAT);
    console.log("Status notisia:", respons.status, "ok:", respons.ok);

    // fetch tidak otomatis melempar galat untuk status 404/500.
    if (!respons.ok) {
      throw new Error(`Permintaan gagal dengan status ${respons.status}`);
    }

    // response.json() membaca badan respons dan mengubah JSON menjadi nilai JS.
    const data = await respons.json();

    if (!Array.isArray(data)) {
      throw new Error("Bentuk data tidak sesuai: respons harus berupa larik.");
    }

    console.log("Data JSON berhasil dibaca:", data);
    return data;
  } catch (galat) {
    console.error("Gagal mengambil notisia:", galat.message);
    throw galat; // diteruskan agar pemanggil dapat menampilkan pesan di halaman.
  }
}

// Contoh dua arah JSON untuk menunjukkan JSON.parse dan JSON.stringify.
// JSON.parse: teks -> nilai JavaScript. JSON.stringify: nilai -> teks JSON.
export function contohArahJSON() {
  const teks = '{"titulu":"Contoh JSON","kategori":"informatika"}';
  const nilai = JSON.parse(teks);
  const teksKembali = JSON.stringify(nilai);
  console.log("JSON.parse menghasilkan objek:", nilai);
  console.log("JSON.stringify menghasilkan:", typeof teksKembali, teksKembali);
  return { nilai, teksKembali };
}
