import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  private getOptions() {
    const header = {['authorization']: `Bearer ${this.authService.getToken()}`}
    const options = { headers: new HttpHeaders(header) };
    return options;
  }

  getPosts() {
    return this.httpClient.get<Array<Post>>(`${environment.api}/posts/`, this.getOptions())
  }

  postPosts(post: Post) {
    return this.httpClient.post<Post>(`${environment.api}/posts/`, post, this.getOptions())
  }

  updatePosts(post: Post) {
    return this.httpClient.put<Post>(`${environment.api}/posts/`, post, this.getOptions())
  }
}