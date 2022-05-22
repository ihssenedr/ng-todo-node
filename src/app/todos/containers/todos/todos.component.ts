import {Component, OnInit, SimpleChange} from '@angular/core';
import {TodosService} from "../../services";
import {Todo} from "../../models/todo.model";
import {CdkDragDrop, CdkDragEnter, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {map} from "rxjs";
declare var UIkit: any;
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos :any[] = [];
  inProgres : any[] = [];
  done : any[] = [];
  form = this.fb.group({
    title : ['', Validators.required]
  })
  constructor(private todoService: TodosService,
              private fb: FormBuilder) { }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }
  get titleControlInvalid() {
    return this.titleControl.hasError('required') && this.titleControl.touched;
  }

  ngOnInit(): void {
    this.todoService.getTodos().pipe(
      map((value  ) => {
        value.map(value1 => this.todos?.push(value1.title))
        console.log('map values', value)
      })
    ).subscribe();
  }

  createTodo(form : FormGroup) {
    const {value , valid} = form
    if (valid) {
      this.todoService.createTodo(value).subscribe(todo =>{
        this.todos?.push(todo.title)
      });
    }
  }
  onItemMoved() {
    UIkit.util.on('#sortable', 'moved', function () {
      console.log('moved triggered');
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('event.container.data' , event.container.data)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  move(event : CdkDragEnter<string[]>){
    console.log('move', event.currentIndex)
  }
}
