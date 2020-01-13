import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { RealTimeService } from 'src/app/shared/services/real-time.service';

@Component({
  selector: 'app-content-comp',
  templateUrl: './content-comp.component.html',
  styleUrls: ['./content-comp.component.scss'],
})
export class ContentCompComponent implements OnInit {
  constructor(private realTimeService: RealTimeService) {}

  ngOnInit() {}

  connect() {
    this.realTimeService.connect();
  }
}
