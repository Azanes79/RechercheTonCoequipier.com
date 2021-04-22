import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { MaterialModule } from '../_sared/material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AddGameComponent } from './add-game/add-game.component';


@NgModule({
  declarations: [ProfilComponent, NavbarComponent, AddGameComponent],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    MaterialModule
  ],
  entryComponents: [AddGameComponent]
})
export class ProfilModule { }
