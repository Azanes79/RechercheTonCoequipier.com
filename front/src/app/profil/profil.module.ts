import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { MaterialModule } from '../_shared/material/material.module';
import { AddGameComponent } from './add-game/add-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfilComponent, AddGameComponent],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [AddGameComponent]
})
export class ProfilModule { }
