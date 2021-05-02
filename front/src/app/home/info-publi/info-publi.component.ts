import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Friend } from '../../_shared/_models/friend';
import { Notifications } from '../../_shared/_models/notifications';
import { Post } from '../../_shared/_models/post';
import { User } from '../../_shared/_models/user';
import { UserReact } from '../../_shared/_models/userReact';
import { SocketIoService } from '../../_shared/_services/io.service';
import { NotificationService } from '../../_shared/_services/notifications.service';
import { PostService } from '../../_shared/_services/post.service';
import { PreferencesGamesService } from '../../_shared/_services/preferences-games.service';
import { UserService } from '../../_shared/_services/user.service';

@Component({
  selector: 'app-info-publi',
  templateUrl: './info-publi.component.html',
  styleUrls: ['./info-publi.component.scss']
})
export class InfoPubliComponent implements OnInit {

  public likes: UserReact[] = []
  private post: Post;
  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private preferenceGames: PreferencesGamesService,
    private userService: UserService,
    private ioService: SocketIoService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.likes = this.data.post.likes;
    this.post = this.data.post;
  }

  ngOnInit() {
  }

  isUserLike(like: UserReact) {
    return this.post.user.FirebaseId === like.user.FirebaseId ? true : false;
  }


  async accept(like: UserReact) {
    const i = this.likes.findIndex(_like => _like.user.FirebaseId === like.user.FirebaseId);
    this.likes[i].state = 'accept';
    this.post.likes = this.likes;
    const preferenceGame = await this.preferenceGames.getOnePreferencesOfUser(this.post.user.FirebaseId, this.post.gameId).toPromise();
    this.postService.updatePosts(this.post).subscribe(_update => {
      let text: string;
      if(preferenceGame.length === 0) {
        text = `${this.post.user.username} a accepté ta demande pour jouer à ${this.post.gameId}.`
      } else {
        text = `${this.post.user.username} a accepté ta demande pour jouer à ${this.post.gameId}. Son pseudo dans le jeu est ${preferenceGame[0].username}.`
      }
       
      const notif: Notifications = new Notifications(like.user.FirebaseId, this.post.user, text, true, new Date())
      this.notificationService.postNotification(notif).subscribe(_create => {
        this.broadcastNotification(notif);
      })
    })
  }

  denie(like: UserReact) {
    const i = this.likes.findIndex(_like => _like.user.FirebaseId === like.user.FirebaseId);
    this.likes[i].state = 'denie';
    this.post.likes = this.likes;
    this.postService.updatePosts(this.post).subscribe(_update => {
      
    })
  }

  addFriend(like:UserReact) {
    const friend: Friend = new Friend(this.post.user);
    like.user.friends.unshift(friend);
    let friends: Friend[] = like.user.friends;
    like.user.friends = friends.filter(_friend => _friend.state !== 'waiting').sort((a, b) => a.user.username > b.user.username ? 1 : -1);
    like.user.friends.unshift(...friends.filter(_friend => _friend.state === 'waiting').sort((a, b) => a.user.username > b.user.username ? 1 : -1));
    this.post.likes = this.likes;
    this.postService.updatePosts(this.post).subscribe(_updatePost => {
      this.userService.updateUser(like.user).subscribe(_update => {
        console.log(like.user);
        this.broadcastFriend(like.user)
      });
    });
  }

  public broadcastNotification(notif: Notifications): void {
    this.ioService.sendNotifLikeAccept(notif);
  }

  public broadcastFriend(user: User): void {
    this.ioService.sendAcceptFriend(user);
  }

  isAlreadyFriend(like: UserReact) {
    return like.user.friends.find(_friend => _friend.user.FirebaseId === this.post.user.FirebaseId) ? true : false;
  }
}
