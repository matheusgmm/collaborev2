import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <ion-loading *ngIf="(loading | async)" spinner="dots"></ion-loading>
  `
})
export class LoaderComponent  implements OnInit {

  public loading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loadingCtrl: LoadingController,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
    });

    loading.present();
  }
}
