import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, from, mergeMap, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes(environment.API)) {
      return this.authService.getToken().pipe(
        switchMap((token) => {
          if (token) {
            request = request.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });
          }
          return from(this.loadingController.create({
            spinner: 'dots',
            cssClass: 'custom-loading',
            showBackdrop: true,
            duration: 5000,
            message: 'Loading...'
          })).pipe(
            mergeMap((loading: HTMLIonLoadingElement) => {
              loading.present();
              return next.handle(request).pipe(catchError((err) => {
                loading.dismiss();
                return throwError(err)
              }))
            } )
          )
        })
      );
    }
    return next.handle(request);
    
  }
}