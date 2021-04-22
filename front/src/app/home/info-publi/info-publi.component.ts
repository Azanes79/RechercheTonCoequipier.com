import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-publi',
  templateUrl: './info-publi.component.html',
  styleUrls: ['./info-publi.component.scss']
})
export class InfoPubliComponent implements OnInit {

  public likes: any[] = [
    {username: 'Amis 1'},
    {username: 'Inconnu 1'},
    {username: 'Amis 2'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
