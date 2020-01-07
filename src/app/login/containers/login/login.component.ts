import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from 'src/app/shared/models/credentials.model';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageUtils } from 'src/app/shared/storage-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usernameControl: FormControl = new FormControl(null, Validators.required);
  passwordControl: FormControl = new FormControl(null, Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl
    });
  }

  login() {
    const credentials: Credentials = {
      username: 'test',
      password: 'test'
    };

    this.authService.login(credentials).subscribe(res => {
      this.authService.setAuthenticated(true);
      StorageUtils.setAuthToken(res.access_token);
      this.router.navigate(['']);
    }, err => {
      this.authService.setAuthenticated(false);
    });
  }

}
