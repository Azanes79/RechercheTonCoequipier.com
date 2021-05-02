import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Notifications} from '../_models/notifications';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  private getOptions() {
    const header = {['authorization']: `Bearer ${this.authService.getToken()}`}
    const options = { headers: new HttpHeaders(header) };
    return options;
  }

  getNotifications(firebaseId: string) {
    return this.httpClient.get<Array<Notifications>>(`${environment.api}/notifications/${firebaseId}`, this.getOptions())
  }

  postNotification(notification: Notifications) {
    return this.httpClient.post<Notifications>(`${environment.api}/notifications/`, notification, this.getOptions())
  }

  updateNotification(notification: Notifications) {
    return this.httpClient.put<Notifications>(`${environment.api}/notifications/`, notification, this.getOptions())
  }
}