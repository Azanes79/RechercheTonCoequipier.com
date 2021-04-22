import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InfoPubliComponent } from '../info-publi/info-publi.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {


  public publications: any[] = [
    {
      content:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      username: 'Ami 1',
      game: 'Rocket League',
      nbPlayer: 2,
      likes: 4,
      shares: 2
    },    
    {
      content:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      username: 'Ami 1',
      game: 'Rocket League',
      nbPlayer: 2,
      likes: 4,
      shares: 2
    },
    {
      content:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      username: 'Ami 1',
      game: 'Rocket League',
      nbPlayer: 2,
      likes: 4,
      shares: 2
    },
    {
      content:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      username: 'Ami 1',
      game: 'Rocket League',
      nbPlayer: 2,
      likes: 4,
      shares: 2
    },
    {
      content:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      username: 'Ami 1',
      game: 'Rocket League',
      nbPlayer: 2,
      likes: 4,
      shares: 2
    },
    {
      content:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      username: 'Ami 1',
      game: 'Rocket League',
      nbPlayer: 2,
      likes: 4,
      shares: 2
    },
    {
      content:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      username: 'Ami 1',
      game: 'Rocket League',
      nbPlayer: 2,
      likes: 4,
      shares: 2
    }
  ] 
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(InfoPubliComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
