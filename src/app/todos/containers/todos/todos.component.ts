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
    this.todoService.getTodos().subscribe(async value => {
      this.todos = value
      console.log('value' , value)
      await this.handleData(this.todos)
      console.log('this.inProgres',this.inProgres)
      console.log('this.done',this.done)
      console.log('this.todo',this.todos)
    });
  }

  handleData(todos : Todo[]) {
    this.inProgres = todos.filter(value => value.state == 'inProgress')
    this.done = todos.filter(value => value.state == 'done')
    this.todos = todos.filter(value => value.state == 'todo')

  }

  createTodo(form : FormGroup) {
    const {value , valid} = form
    if (valid) {
      this.todoService.createTodo(value).subscribe(todo =>{
        this.todos?.push(todo.title)
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.handelDrop(event)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.handelDrop(event)
    }
  }

  handelDrop(event : CdkDragDrop<string[]>) {
    let state = ''
    let updateTodo : Todo
    console.log()
    const currentIndex = event.container.id.split('-')[3]
    switch (currentIndex) {
      case '0' :
        state = 'todo'
        break
      case '1':
        state = 'inProgress'
        break
      case '2':
        state = 'done'
        break
      default :
        state = 'todo'
        break
    }
    updateTodo = event.container.data[0] as Todo
    updateTodo.state = state
    this.todoService.updateState(updateTodo).subscribe()


  }

}
