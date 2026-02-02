import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';

//
import { AlertController } from '@ionic/angular';

// Icon
import { addIcons } from 'ionicons';
import { add, create, trash } from 'ionicons/icons';

// Service data
import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon
  ],
})
export class HomePage {

  dataMahasiswa: any[] = [];

  constructor(
    private dataService: DataMahasiswaService,
    private cdr: ChangeDetectorRef,

    //
    private alertController: AlertController
  ) {
    addIcons({ 
      add,
      create,   // icon edit
      trash     // icon hapus 
    });}

  // Load setiap buka halaman
  async ionViewWillEnter() {
    await this.loadData();
  }

  async loadData() {
    this.dataMahasiswa = await this.dataService.getData();
    this.cdr.detectChanges();
  }

  // KONFIRMASI HAPUS
  async konfirmasiHapus(id: number) {

    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: async () => {
            await this.dataService.hapusData(id);
            this.loadData(); // refresh data
          }
        }
      ]
    });

    await alert.present();
  }

  //  EDIT DATA
  async editData(mhs: any) {

    const alert = await this.alertController.create({
      header: 'Edit Data',
      inputs: [
        {
          name: 'nama',
          type: 'text',
          value: mhs.nama,
          placeholder: 'Nama'
        },
        {
          name: 'jurusan',
          type: 'text',
          value: mhs.jurusan,
          placeholder: 'Jurusan'
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Simpan',
          handler: async (data) => {

            const dataUpdate = {
              id: mhs.id,
              nama: data.nama,
              jurusan: data.jurusan
            };

            await this.dataService.updateData(dataUpdate);
            this.loadData(); // refresh data
          }
        }
      ]
    });

    await alert.present();
  }

}
