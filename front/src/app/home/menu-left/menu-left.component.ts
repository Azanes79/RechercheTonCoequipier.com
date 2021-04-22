import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {


  public amis: any[] = [
    {username: 'Ami 1'},
    {username: 'Ami 2'},
    {username: 'Ami 3'},
    {username: 'Ami 4'},
    {username: 'Ami 5'},
    {username: 'Ami 6'},
    {username: 'Ami 2'},
    {username: 'Ami 3'},
    {username: 'Ami 4'},
    {username: 'Ami 5'},
    {username: 'Ami 6'},
    {username: 'Ami 2'},
    {username: 'Ami 3'},
    {username: 'Ami 4'},
    {username: 'Ami 5'},
    {username: 'Ami 6'},
    {username: 'Ami 2'},
    {username: 'Ami 3'},
    {username: 'Ami 4'},
    {username: 'Ami 5'},
    {username: 'Ami 6'},
    {username: 'Ami 2'},
    {username: 'Ami 3'},
    {username: 'Ami 4'},
    {username: 'Ami 5'},
    {username: 'Ami 6'}
  ]

  public notifications: any[] = [
    {content: 'Lorem ipsum Lorem ipsum'},
    {content: 'Lorem ipsum Lorem ipsum'},
    {content: 'Lorem ipsum Lorem ipsum'},
    {content: 'Lorem ipsum Lorem ipsum'},
    {content: 'Lorem ipsum Lorem ipsum'},
    {content: 'Lorem ipsum Lorem ipsum'},
    {content: 'Lorem ipsum Lorem ipsum'},
    {content: 'Lorem ipsum Lorem ipsum'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
