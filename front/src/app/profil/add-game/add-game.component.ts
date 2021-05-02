import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PreferencesGames } from '../../_shared/_models/preferences-games';
import { AuthService } from '../../_shared/_services/auth.service';
import { PreferencesGamesService } from '../../_shared/_services/preferences-games.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  public form: FormGroup;
  public preferencesGames: PreferencesGames[] = [];
  private preferencesGame: PreferencesGames;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddGameComponent>,
    private preferencesGamesService: PreferencesGamesService,
    @Inject(MAT_DIALOG_DATA) public data) {

    console.log(this.data);
    this.preferencesGames = this.data.preferencesGames;
    this.createForm();
    if (this.data.preferencesGame !== null) {
      this.preferencesGame = this.data.preferencesGame;
      this.form.patchValue(this.preferencesGame)
    }

    console.log(this.preferencesGames);

  }

  ngOnInit() {
    // this.form.reset()
  }

  // ajouter une préférence
  addPreference() {
    if (this.form.valid) {
      console.log('form valid')
      console.log('pref')
      if (this.preferencesGame === null) {
        console.log('create')
        const pref: PreferencesGames = new PreferencesGames(this.authService.user.FirebaseId, this.form.get('gameId').value, this.form.get('username').value, this.form.get('level').value)
        this.preferencesGamesService.createPreference(pref).subscribe(_create => {
          this.dialogRef.close(pref);
        })
      } else {
        console.log('update');
        this.preferencesGame.username = this.form.get('username').value;
        this.preferencesGame.level = this.form.get('level').value
        this.preferencesGamesService.updatePreference(this.preferencesGame).subscribe(_update => {
          this.dialogRef.close(this.preferencesGame);
        })
      }

    }
  }

  // créer le formulaire
  createForm() {
    if(this.preferencesGame === null) {
      this.form = this.fb.group({
        gameId: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]),
        preferencesGames: new FormControl([]),
      }, {
        validators: this.gameIsAlreadyExist
      });
    } else {
      this.form = this.fb.group({
        gameId: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]),
        preferencesGames: new FormControl([]),
      });
    }

    this.form.get('preferencesGames').setValue(this.preferencesGames);
  }

  // Gestion du message d'erreur du champ gameId
  getErrorGame() {
    if (this.form.get('gameId').hasError('required')) {
      return `le champ est obligatoire`;
    }
    if (this.form.hasError('gameIsAlreadyExist')) {
      this.form.controls.gameId.setErrors({ gameIsAlreadyExist: true })
      return `Une préférence a déjà été saisie avec ce jeu`
    } else {
      return '';
    }
  }

  // Vérifie si le jeu est déjà saisie en préférence
  gameIsAlreadyExist(form: FormGroup) {
    const prefs = form.get('preferencesGames').value
    if (prefs && prefs !== null) {
      return prefs.find(_pref => _pref.gameId === form.get('gameId').value) === undefined ? null : { gameIsAlreadyExist: true }
    } else {
      return null
    }
  }
}
