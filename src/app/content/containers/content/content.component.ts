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
  ) { }

  ngOnInit() {
  }

}
