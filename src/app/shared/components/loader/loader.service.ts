import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  public isLoading = new Subject<boolean>();

  show() {
    console.log('Show')
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
    console.log('Hide')
  }

}
