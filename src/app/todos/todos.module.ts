import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from "@angular/router";

import * as fromContainers from './containers'
import * as fromServices from './services'
import * as fromComponents from './components'
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers : [...fromServices.services],
  exports : [...fromContainers.containers,
    ...fromComponents.components]
})
export class TodosModule { }
