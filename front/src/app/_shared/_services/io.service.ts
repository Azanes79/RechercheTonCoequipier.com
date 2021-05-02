import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socket from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Friend } from '../_models/friend';
import { Notifications } from '../_models/notifications';
import { Post } from '../_models/post';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
    // https://codingblast.com/chat-application-angular-socket-io/

    // variables
    private socket: Socket;

    constructor() {
        this.socket = socket.io(environment.io);
    }

    /**
     * send post information
     * @param post 
     */
    public sendPostInformation(post: Post): void {
        this.socket.emit('post', post);
    }

    public sendLike(post: Post): void {
        this.socket.emit('like', post);
    }

    public sendUnLike(post: Post): void {
        this.socket.emit('unlike', post);
    }

    public sendShare(post: Post): void {
        this.socket.emit('share', post);
    }

    public sendUnShare(post: Post): void {
        this.socket.emit('unShare', post);
    }

    public sendNotifLikeAccept(notif: Notifications): void {
        this.socket.emit('notifLikeAccept', notif);
    }

    public sendAddFriend(user: User): void {
        this.socket.emit('addFriend', user);
    }

    public sendAcceptFriend(user: User): void {
        this.socket.emit('acceptFriend', user);
    }

    /**
     * Get post observable
     */
    public getPost = () => {
        return new Observable(observer => {
            this.socket.on('post', (post: Post) => {
                observer.next({ event: 'post', post });
            });
            this.socket.on('like', (post: Post) => {
                observer.next({ event: 'like', post });
            });
            this.socket.on('unLike', (post: Post) => {
                observer.next({ event: 'unLike', post });
            });
            this.socket.on('share', (post: Post) => {
                observer.next({ event: 'share', post });
            });
            this.socket.on('unShare', (post: Post) => {
                observer.next({ event: 'unShare', post });
            });
        });
    }

    /* get notifications */
    public getNotification = () => {
        return new Observable(observer => {
            this.socket.on('notifLikeAccept', (notif: Notifications) => {
                observer.next({ event: 'notifLikeAccept', notif });
            });
        });
    }

    /* get friends */
    public getFriend = () => {
        return new Observable(observer => {
            this.socket.on('addFriend', (user: User) => {
                observer.next({ event: 'addFriend', friend: user });
            });
            this.socket.on('acceptFriend', (user: User) => {
                observer.next({ event: 'acceptFriend', friend: user });
            });
        });
    }
}
