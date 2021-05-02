import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/_services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public authForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    
  }

  register() {
    if(this.authForm.valid) {
      // alert('ok');
      this.authService.SignUp(this.authForm.get('email').value, this.authForm.get('pwd').value, this.authForm.get('pseudo').value)
    }
  }

  createForm() {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      pseudo:  new FormControl('', [Validators.minLength(2), Validators.required]),
      pwd: new FormControl('', [Validators.required]),
      confirmPwd: new FormControl('', [Validators.required])
    }, {
      validators: this.checkPasswords
    })
  }

  getErrorMessageEmail() {
    if (this.authForm.get('email').hasError('required')) {
      return `l'email est obligatoire`;
    }
    return this.authForm.get('email').hasError('email') ? `L'email n'est pas valide` : '';
  }

  getErrorMessagePseudo() {
    if (this.authForm.get('pseudo').hasError('required')) {
      return `le pseudo est obligatoire`;
    }
    return this.authForm.get('pseudo').hasError('minlength') ? `Le pseudo doit contenir 2 caractères minimum` : '';
  }

  getErrorMessagePwd() {
    if (this.authForm.get('pwd').hasError('required')) {
      return `le mot de passse est obligatoire`;
    }
    return this.authForm.get('pwd').hasError('pattern') ? `Le mot de passe doit contenir 8 caractères minimum, dont une minuscule, une majuscule, un caractère spécial` : '';
  }

  getErrorMessageConfirmPwd() {
    if (this.authForm.hasError('notSame')) {
      this.authForm.controls.confirmPwd.setErrors({notSame: true})
      return `Le mot de passe ne correspond pas`;
    }
  }

  checkPasswords(form: FormGroup) {
    const password = form.controls.pwd.value;
    const confirmPassword = form.controls.confirmPwd.value;
    return password === confirmPassword ? null : { notSame: true }
}

}
