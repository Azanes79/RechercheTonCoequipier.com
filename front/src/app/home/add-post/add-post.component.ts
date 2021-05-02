import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../_shared/_models/post';
import { AuthService } from '../../_shared/_services/auth.service';
import { SocketIoService } from '../../_shared/_services/io.service';
import { PostService } from '../../_shared/_services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private postService: PostService, private ioService: SocketIoService) {
    
    this.createForm();
  }

  ngOnInit() {
  }

  // création du formulaire
  createForm() {
    this.form = this.fb.group({
      content: new FormControl('', [Validators.required]),
      gameId: new FormControl('', [Validators.required]),
      nbPlayers: new FormControl('', [Validators.required]),
      visibility: new FormControl('', [Validators.required]),
    })
  }

  // ajoute une nouvelle publication
  addPost() {
    if(this.form.valid) {
      const post = new Post(this.authService.user, this.form.get('content').value, this.form.get('gameId').value, this.form.get('nbPlayers').value, this.form.get('visibility').value, new Date())
      this.postService.postPosts(post).subscribe(_create => {
        this.broadcastPost(post);
        this.form.reset();
      })
    }
  }

  // envoie une notification à socket.io
  public broadcastPost(post: Post): void {
    this.ioService.sendPostInformation(post);
  }

}
