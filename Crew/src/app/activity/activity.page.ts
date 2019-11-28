import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { QuerysService } from '../services/querys.service';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {

  name = '';
    ngOnInit(): void {
      this.test();
    }
  constructor(private authService: AuthService,
              private querysService: QuerysService) { }

  test() {
  }
}
