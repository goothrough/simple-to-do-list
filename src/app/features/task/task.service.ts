import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export type Task = {
  taskName: string;
  description: string;
  isDone: boolean
}

export type ClassifiedTaskList = {
  todo: Task[];
  done: Task[];
  [key: string]: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // temporary task list
  taskList: Task[] = [
    {
      taskName: 'homework',
      description: 'test desc1',
      isDone: false
    },
    {
      taskName: 'do the shopping',
      description: 'test desc2',
      isDone: false
    },
    {
      taskName: 'leetcode',
      description: 'test desc3',
      isDone: true
    },

  ]

  private taskList$ = new BehaviorSubject<Task[]>(this.taskList);

  constructor() {
  }

  addTask(task: Task) {
    console.log(task);
    this.taskList.push(task);
    this.taskList$.next(this.taskList);
  }

  getDataFromMockServer(): Observable<Task[]> {
    return this.taskList$.asObservable();

  }

}
