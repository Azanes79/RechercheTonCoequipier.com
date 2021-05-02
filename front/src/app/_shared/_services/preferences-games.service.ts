import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PreferencesGames } from '../_models/preferences-games';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreferencesGamesService {

  private API = environment.api;
  constructor(private http: HttpClient, private authService: AuthService) { }


  private getOptions() {
    const header = {['authorization']: `Bearer ${this.authService.getToken()}`}
    const options = { headers: new HttpHeaders(header) };
    return options;
  }

  getPreferencesOfUser(firebaseId: string) {
    return this.http.get<PreferencesGames[]>(`${this.API}/preferencesGames/${firebaseId}`, this.getOptions());
  }

  getOnePreferencesOfUser(firebaseId: string, gameId:string) {
    return this.http.get<PreferencesGames[]>(`${this.API}/preferencesGames/${firebaseId}/${gameId}`, this.getOptions());
  }

  createPreference(pref: PreferencesGames) {
    return this.http.post(`${this.API}/preferencesGames`, pref, this.getOptions());
  }

  updatePreference(pref: PreferencesGames) {
    return this.http.put(`${this.API}/preferencesGames/`, pref, this.getOptions())
  }

  deletePreference(pref: PreferencesGames) {
    return this.http.delete(`${this.API}/preferencesGames/${pref.userId}/${pref.gameId}`, this.getOptions())
  }
}
