import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from "@angular/router";

import * as fromContainers from './containers'
import * as fromServices from './services'
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DragDropModule} from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path : '' ,
    component : fromContainers.TodosComponent
  },
];

@NgModule({
  declarations: [
    ...fromContainers.containers
  ],
  providers : [...fromServices.services],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class TodosModule { }
