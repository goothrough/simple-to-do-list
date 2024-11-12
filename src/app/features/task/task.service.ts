import { Injectable } from '@angular/core';
import { TaskCardData } from 'src/app/shared/task-card/task-card.component';

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

  constructor() { }


  getClassifiedTaskList() {
    const classifiedTaskList: ClassifiedTaskList = {
      todo: [],
      done: []
    }
    this.getTaskList().forEach(task => {
      if (task.isDone) {
        classifiedTaskList.done.push(task);
      } else {
        classifiedTaskList.todo.push(task);
      }
    })

    return classifiedTaskList;
  }

  getTaskList() {
    const taskList: Task[] = [
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

    return taskList;
  }
}
