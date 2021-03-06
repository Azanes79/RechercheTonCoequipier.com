import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../_models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = environment.api;
  constructor(private http: HttpClient, private authService: AuthService) { }


  private getOptions() {
    const header = {['authorization']: `Bearer ${this.authService.getToken()}`}
    const options = { headers: new HttpHeaders(header) };
    return options;
  }


  // ajoute un utilisateur
  postUser(user: User) {
    return this.http.post(`${this.API}/users`, user, this.getOptions());
  }

  // récupère un utilisateur
  getUser(firebaseId: string) {
    return this.http.get(`${this.API}/users/${firebaseId}`, this.getOptions());
  }

  // récupère les données de l'utilisateur connecté
  getUserData() {
    return this.getUser(this.authService.userData.uid)
  }

  // met à jour un utilisateur
  updateUser(user: User) {
    return this.http.put(`${this.API}/users/`, user, this.getOptions())
  }

}
