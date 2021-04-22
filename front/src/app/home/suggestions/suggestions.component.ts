import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  suggestions: any[] = [
    {game: 'Rocket Legaue', nbPublications: 52},
    {game: 'Rocket Legaue', nbPublications: 52},
    {game: 'Rocket Legaue', nbPublications: 52},
  ]
  constructor() { }

  ngOnInit() {
  }

}
