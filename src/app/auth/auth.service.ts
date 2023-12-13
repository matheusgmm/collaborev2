import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Storage } from '@ionic/storage-angular';
import { CreateAccount, GoogleInfos, Login } from '../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  error: any;
  userInfo?: GoogleInfos;

  private readonly API = environment.API;
  private readonly KEY = 'token';

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();


  constructor(
    private http: HttpClient, 
    public auth: AngularFireAuth,
    private storage: Storage
  ) {
    this.init();
    this.setIsAuthenticated(!!this.getToken());
  }

  async init() {
    await this.storage.create();
  }

  public setIsAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }


  getToken(): Observable<string> {
    return from(this.storage.get('token') || '');
  }

  saveToken(token: string): Observable<any> {
    this.setIsAuthenticated(true);
    return from(this.storage.set('token', token));
  }

  deleteToken(): Observable<any> {
    this.setIsAuthenticated(false);
    return from(this.storage.remove('token'));
  }

  haveToken() {
    const hasToken = !!this.getToken();
    return hasToken;
  }

  // login(login: Login): Observable<{ token: string }> {
  //   return this.http.post<{ token: string }>(`${this.API}/user/login`, login);
  // }
  login(login: Login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API}/user/login`, login).pipe(
      delay(5000)
    );
  }

  async googleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);
      this.user = credential.user;
      this.userInfo = {
        name: credential.user?.displayName as string,
        email: credential.user?.email as string,
        google_id: credential.user?.uid as string,
      };
      this.loginWithGoogle(this.userInfo).subscribe({
        next: (auth) => {
          console.info('Login efetuado com sucesso! ', auth);
        },
        error: (erro) => {
          console.error('Erro => ', erro);
        },
      });
      console.log('Usuário logado com sucesso! ', this.userInfo);
    } catch (error) {
      this.error = error;
      console.error('Erro => ', error);
    }
  }

  async googleRegister() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);
      this.user = credential.user;
      this.userInfo = {
        name: credential.user?.displayName as string,
        email: credential.user?.email as string,
        google_id: credential.user?.uid as string,
      };
      this.registerWithGoogle(this.userInfo).subscribe({
        next: (auth) => {
          console.info('Cadastro efetuado com sucesso! ', auth);
        },
        error: (erro) => {
          console.error('Erro => ', erro);
        },
      });
      console.log('Usuário cadastrado com sucesso! ', this.userInfo);
    } catch (error) {
      this.error = error;
      console.error('Erro => ', error);
    }
  }

  loginWithGoogle(infos: GoogleInfos): Observable<GoogleInfos> {
    return this.http.post<GoogleInfos>(`${this.API}/user/loginWithGoogle`, infos);
  }

  registerWithGoogle(infos: GoogleInfos): Observable<GoogleInfos> {
    return this.http.post<GoogleInfos>(`${this.API}/user/registerWithGoogle`, infos);
  }

  createAccount(values: CreateAccount): Observable<CreateAccount> {
    return this.http.post<CreateAccount>(`${this.API}/user/register`, values);
  }

  verifyToken(token: Promise<string | null>): Observable<string | null> {
    return this.http.post<string | null>(`${this.API}/user/verifyEmail`, token);
  } 


}
