import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Todo} from "../models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  base_Url = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  getTodos() : Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.base_Url + '/all')
      .pipe(catchError((error) => {return throwError(error.json())}));
  }

  createTodo(payload: Todo) : Observable<Todo> {

    return this.http
      .post<Todo>(this.base_Url + '/new' ,payload)
      .pipe(catchError((error) => {return throwError(error.json())}));
  }
  updateState(payload: Todo): Observable<Todo> {
    console.log('payload', payload)
    return this.http
      .put<Todo>(this.base_Url + `/setState/${payload._id}` , payload)
      .pipe(catchError((error) => {return throwError(error.json())}));
  }
}
