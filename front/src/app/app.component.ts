import { Component } from '@angular/core';
import { AuthService } from './_shared/_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  public newNotif: boolean = false;

  constructor(private authService: AuthService) {
    
  }

  setNewNotif(event: boolean) {
    this.newNotif = event;
  }
}
