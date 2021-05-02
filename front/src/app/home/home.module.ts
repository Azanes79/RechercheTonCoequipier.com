import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../_shared/material/material.module';
import { FeedComponent } from './feed/feed.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { InfoPubliComponent } from './info-publi/info-publi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, FeedComponent, AddPostComponent, SuggestionsComponent, InfoPubliComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [InfoPubliComponent]
})
export class HomeModule { }
