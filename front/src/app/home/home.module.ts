import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../_sared/material/material.module';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { FeedComponent } from './feed/feed.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InfoPubliComponent } from './info-publi/info-publi.component';


@NgModule({
  declarations: [HomeComponent, NavbarComponent, MenuLeftComponent, FeedComponent, AddPostComponent, SuggestionsComponent, InfoPubliComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  entryComponents: [InfoPubliComponent]
})
export class HomeModule { }
