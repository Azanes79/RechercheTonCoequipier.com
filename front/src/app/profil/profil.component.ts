import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddGameComponent } from './add-game/add-game.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public pseudoGames: any[] = [
    {game: 'Rocket League', pseudo: 'Azanes'},
    {game: 'CoD Warzone', pseudo: 'Azanes'},
  ]
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddGameComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
