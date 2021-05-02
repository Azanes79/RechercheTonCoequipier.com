import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public authForm: FormGroup;

  public errorMessage: string;
  constructor(public authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    console.log('login init')
  }

  createForm() {
    this.authForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  getErrorMessageEmail() {
    if (this.authForm.get('email').hasError('required')) {
      return `l'email est obligatoire`;
    }
    return this.authForm.get('email').hasError('email') ? `L'email n'est pas valide` : '';
  }

  getErrorMessagePwd() {
    if (this.authForm.get('pwd').hasError('required')) {
      return `le mot de passse est obligatoire`;
    }
    return this.authForm.get('pwd').hasError('minlength') ? `Le mot de passe doit contenir 8 caractères minimum` : '';
  }

  async login() {
    this.errorMessage = undefined;
    if(this.authForm.valid) {
      const result = await this.authService.SignIn(this.authForm.get('email').value, this.authForm.get('pwd').value);
      this.errorMessage = result;
      
    }
  }
}
