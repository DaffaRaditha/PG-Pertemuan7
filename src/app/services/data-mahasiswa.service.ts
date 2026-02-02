import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class DataMahasiswaService {

  // Kunci penyimpanan
  private KEY_MAHASISWA = 'data_mahasiswa_app';

  constructor() { }

  // AMBIL DATA
  async getData() {
    const { value } = await Preferences.get({ key: this.KEY_MAHASISWA });
    return value ? JSON.parse(value) : [];
  }

  // TAMBAH DATA
  async tambahData(mahasiswaBaru: any) {

    const dataLama = await this.getData();

    mahasiswaBaru.id = Date.now();
    dataLama.push(mahasiswaBaru);

    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataLama)
    });
  }

  // HAPUS DATA
  async hapusData(id: number) {

    const dataLama = await this.getData(); // ambil semua data

    // filter = buang data yang ID sama
    const dataBaru = dataLama.filter(
      (item: any) => item.id !== id
    );

    // simpan ulang
    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataBaru)
    });
  }

  // UPDATE DATA
  async updateData(dataBaru: any) {

    const dataLama = await this.getData(); // ambil semua data

    // cari index berdasarkan ID
    const index = dataLama.findIndex(
      (item: any) => item.id === dataBaru.id
    );

    // ganti isi datanya
    if (index !== -1) {
      dataLama[index] = dataBaru;
    }

    // simpan ulang
    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataLama)
    });
  }

}
