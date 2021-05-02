import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PreferencesGames } from '../_shared/_models/preferences-games';
import { AuthService } from '../_shared/_services/auth.service';
import { PreferencesGamesService } from '../_shared/_services/preferences-games.service';
import { UserService } from '../_shared/_services/user.service';
import { AddGameComponent } from './add-game/add-game.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public preferencesGames: PreferencesGames[] = []
  isEdit: boolean;
  private userLoad: boolean = false;
  constructor(
    private dialog: MatDialog, 
    private authService: AuthService, 
    private userService: UserService,
    private preferencesGamesService: PreferencesGamesService,
    private snackbar: MatSnackBar) {
    this.isEdit = false;
  }

  ngOnInit() {
    setTimeout(()=> {
      this.preferencesGamesService.getPreferencesOfUser(this.authService.user.FirebaseId).subscribe(_get => {
        this.preferencesGames = _get;
        console.log(_get)
      })
    }, 500)
  }

  openDialog(preferencesGame: PreferencesGames): void {
    const dialogRef = this.dialog.open(AddGameComponent, {
      width: '320px',
      disableClose: true,
      data: {preferencesGames: this.preferencesGames, preferencesGame: preferencesGame}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(preferencesGame === null) {
          this.preferencesGames.push(result)
        } else {
          const i = this.preferencesGames.findIndex(_pref => _pref.gameId === result.gameId);
          this.preferencesGames[i] = result
        }
      }
    });
  }

  editUser() {
    this.isEdit = true;
  }

  updateUser() {
    this.isEdit = false;
    try {
      this.userService.updateUser(this.authService.user).subscribe(_update => {
        console.log(_update);
        this.snackbar.open('Description mis à jour.', null, {duration: 3000})
      })
    } catch(e) {
      this.snackbar.open('ERREUR: ' + e, null, {duration: 3000})
    }

  }

  deleteGame(pref: PreferencesGames) {
    this.preferencesGamesService.deletePreference(pref).subscribe(_delete => {
      this.preferencesGames = this.preferencesGames.filter(_pref => _pref.gameId !== pref.gameId);
      this.snackbar.open(_delete.toString(), null, {duration: 3000})
    });

  }
}
