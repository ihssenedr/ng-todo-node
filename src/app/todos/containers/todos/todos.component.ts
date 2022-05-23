import {Component, OnInit, SimpleChange} from '@angular/core';
import {TodosService} from "../../services";
import {Todo} from "../../models/todo.model";
import {CdkDragDrop, CdkDragEnter, moveItemInArray, transferArrayItem ,copyArrayItem} from '@angular/cdk/drag-drop';

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
  ngOnDestroy() : void {

  }
  ngOnInit(): void {
    this.todoService.getTodos().subscribe(async value => {
      this.todos = value
      await this.handleData(this.todos)
    });
  }

  handleData(todos : Todo[]) {
    this.inProgres = todos.filter(value => value.state == 'inProgress')
    this.done = todos.filter(value => value.state == 'done')
    this.todos = todos.filter(value => value.state == 'todo')

  }

  async createTodo(form : FormGroup) {
    const {value , valid} = form
    if (valid) {
       let createdTodo  =  await this.todoService.createTodo(value).toPromise();
       console.log('created todo' , createdTodo)
      this.todos.push(createdTodo)
    }
  }
  async handleDrop(event : CdkDragDrop<string[]>) {
    let state = ''
    let updateTodo : Todo
    const currentIndex = event.container.id.split('-')[3]
    let updatedtodo
    switch (currentIndex) {
      case '0' :
        state = 'todo'
        updateTodo = await this.todos.find((value, index) => index === event.currentIndex)
        updateTodo.state = state
        console.log('updateTodo',updateTodo)
        updatedtodo = await this.todoService.updateState(updateTodo).toPromise()

        break
      case '1':
        state = 'inProgress'
        updateTodo = await this.inProgres.find((value, index) => index === event.currentIndex)
        updateTodo.state = state
        console.log('updateTodo',updateTodo)
        updatedtodo = await this.todoService.updateState(updateTodo).toPromise()
        break
      case '2':
        state = 'done'
        updateTodo = await this.done.find((value, index) => index === event.currentIndex)
        updateTodo.state = state
        console.log('updateTodo', updateTodo)
        updatedtodo = await this.todoService.updateState(updateTodo).toPromise()
        break
      default :
        state = 'todo'
        break
    }

  }
  async drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    await this.handleDrop(event)
  }



}
