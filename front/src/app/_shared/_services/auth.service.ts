import { Injectable, NgZone } from '@angular/core';
import { IUser } from "../_models/interfaces/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userData: any; // Save logged in user data
  public user: User ;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private httpClient: HttpClient
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        console.log(this.userData)
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.setUser(this.userData.uid)
      } else {
        localStorage.setItem('user', null);
        this.user = null;
      }
    })
  }


  async setUser(firebaseId: string) {
    const users = await this.httpClient.get<User[]>(`${environment.api}/users/${firebaseId}`, this.getOptions()).toPromise();
    this.user = users[0];
  }

  private getOptions() {
    const header = { ['authorization']: `Bearer ${this.getToken()}` }
    const options = { headers: new HttpHeaders(header) };
    return options;
  }

  postUser(user: User) {
    return this.httpClient.post(`${environment.api}/users/`, user);
  }

  // Sign in with email/password
  SignIn(email, password) {
    console.log(email, password);
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.setData(result)
        this.router.navigate(['home']);
      }).catch((error) => {
        console.log(error)
        return error.message;
      })
  }

  async setData(result) {
    await this.SetUserData(result.user);
    this.setUser(this.userData.uid);
  }

  // Sign up with email/password
  async SignUp(email, password, username) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async result => {

        this.postUser(new User(username, null, email, [], result.user.uid)).subscribe(_res => { })
        this.router.navigate(['/']);
      }).catch((error) => {
        return error.message;
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  async SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = {
      FirebaseId: user.uid,
      email: user.email,
      photoURL: user.photoURL
    }

    return await userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.user = undefined;
      this.router.navigate(['/']);
    })
  }

  getToken() {
    const userConnect = JSON.parse(localStorage.getItem('user'));
    return userConnect.stsTokenManager.accessToken
  }

}