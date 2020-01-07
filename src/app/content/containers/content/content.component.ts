import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Credentials } from 'src/app/shared/models/credentials.model';
import { StorageUtils } from 'src/app/shared/storage-utils';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    const credentials: Credentials = {
      username: 'test',
      password: 'test'
    };

    this.authService.login(credentials).subscribe(res => {
      this.authService.setAuthenticated(true);
      StorageUtils.setAuthToken(res.access_token);
    }, err => {
      this.authService.setAuthenticated(false);
    });
  }
}
