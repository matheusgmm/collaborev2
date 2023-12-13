import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../shared/components/loader/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Interceptor está sendo chamado.');
    this.loaderService.show();

    if (request.url.includes(environment.API)) {
      return this.authService.getToken().pipe(
        switchMap((token) => {
          if (token) {
            request = request.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });
          }
          return next.handle(request);
        })
      );
    }

    // return next.handle(request).pipe(finalize(() => this.loaderService.hide()));
    return next.handle(request).pipe(
      catchError(error => {
        console.error('Erro na solicitação HTTP:', error);
        return throwError(error);
      }),
      finalize(() => {
        console.log('Interceptor está ocultando o loader.');
        this.loaderService.hide();
      })
    );
    
  }
}