import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Friend } from '../_shared/_models/friend';
import { Notifications } from '../_shared/_models/notifications';
import { Post } from '../_shared/_models/post';
import { User } from '../_shared/_models/user';
import { AuthService } from '../_shared/_services/auth.service';
import { SocketIoService } from '../_shared/_services/io.service';
import { NotificationService } from '../_shared/_services/notifications.service';
import { UserService } from '../_shared/_services/user.service';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {


  public friends: Friend[] = []

  public notifications: Notifications[] = [];

  @Output() newNotif: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private userService: UserService,
    private ioService: SocketIoService) {
    setTimeout(() => {
      this.notificationService.getNotifications(this.authService.user.FirebaseId).subscribe(_notifications => {
        this.notifications = _notifications;

        if (this.notifications.find(_notif => _notif.isNewNotif === true)) {
          this.newNotif.emit(true);
        } else {
          this.newNotif.emit(false);
        }
      });

      this.friends = this.authService.user.friends;
    }, 2000);
  }

  ngOnInit() {
    this.subscribeToNotifications();
    this.subscribeToFriends();
  }


  private subscribeToNotifications(): void {
    this.ioService.getNotification()
      .subscribe((data: { event: string, notif: Notifications }) => {
        switch (data.event) {
          case 'notifLikeAccept':
            if (data.notif.userId === this.authService.user.FirebaseId) {
              this.notifications.unshift(data.notif);
              this.newNotif.emit(true);
            }
            break;
          default:
            console.log('getNotif: ',data)
            break;
        }
      });
  }

  private subscribeToFriends(): void {
    this.ioService.getFriend()
      .subscribe((data: { event: string, friend: User }) => {
        switch (data.event) {
          case 'acceptFriend':
          case 'addFriend':
            console.log('new friend !', data.friend)
            if (data.friend.FirebaseId === this.authService.user.FirebaseId) {
              this.authService.user.friends = data.friend.friends;
              this.friends = data.friend.friends;
            }
            break;
          default:
            console.log('getFriend: ',data);
            break;
        }
      });
  }

  isNotNew(notif: Notifications) {
    if (notif.isNewNotif) {
      notif.isNewNotif = false;
      this.notificationService.updateNotification(notif).subscribe(_update => {
        if (this.notifications.find(_notif => _notif.isNewNotif === true)) {
          this.newNotif.emit(true);
        } else {
          this.newNotif.emit(false);
        }
      });
    }
  }

  setAccepted(friend: Friend) {
    friend.state = 'accepted';
    this.authService.user.friends = this.friends;
    this.userService.getUser(friend.user.FirebaseId).subscribe(_user => {
      const user: User = _user[0];
      const _friend = new Friend(this.authService.user)
      _friend.state = 'accepted'
      user.friends.unshift(_friend);
      const friends: Friend[] = user.friends;
      user.friends = friends.filter(_friend => _friend.state !== 'waiting').sort((a, b) => a.user.username > b.user.username ? 1 : -1);
      user.friends.unshift(...friends.filter(_friend => _friend.state === 'waiting').sort((a, b) => a.user.username > b.user.username ? 1 : -1))
      this.userService.updateUser(this.authService.user).subscribe(_update => {
        this.userService.updateUser(user).subscribe(_update2 => {
          this.broadcastFriend(user);
        })
      });
    })
  }

  setRefused(friend: Friend) {
    this.friends = this.friends.filter(_friend => _friend.user.FirebaseId !== friend.user.FirebaseId);
    this.authService.user.friends = this.friends;
    this.userService.updateUser(this.authService.user).subscribe(_update => {
    });
  }

  public broadcastFriend(user: User): void {
    this.ioService.sendAddFriend(user);
  }

  deleteUser(friend:Friend) {
    this.setRefused(friend);
    this.userService.getUser(friend.user.FirebaseId).subscribe(_user => {
      const user: User = _user[0];
      const friends = user.friends.filter(_friend => _friend.user.FirebaseId !== this.authService.user.FirebaseId);
      user.friends = friends;
      this.userService.updateUser(user).subscribe(_update => {
        this.broadcastFriend(user);
      });
    });
  }

}
