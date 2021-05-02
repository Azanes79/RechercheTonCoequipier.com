import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../_shared/_models/user';
import { AuthService } from '../_shared/_services/auth.service';
import { UserService } from '../_shared/_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() newNotif: boolean;
  @Output() navOutput: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private authService: AuthService, private userService: UserService) {
    console.log('NAVBAR HOME');
    
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.SignOut();
  }

}
