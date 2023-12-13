import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) { 
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onLogin() {
    if (this.formGroup.valid && this.formGroup.value) {
      const formValues = this.formGroup.value;
      this.authService.login(formValues).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem("userId", res.user.id);
          this.authService.saveToken(res.token);
          this.authService.setIsAuthenticated(true);
          // this.router.navigate(['collabore/feed']);
        },
        error: (err) => {
          console.log(err)
          //this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message || `Ocorreu um erro ao efetuar login.` });
        }
      })
    }
  }

}
