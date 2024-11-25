import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AddTaskApiRequest, AddTaskServiceInDto, GetTaskApiResponse, UpdateTaskApiRequest, UpdateTaskServiceInDto } from '../model/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // temporary task list
  taskList: GetTaskApiResponse[] = [
    {
      id: 1,
      name: 'homework',
      description: 'test desc1',
      isDone: false
    },
    {
      id: 2,
      name: 'do the shopping',
      description: 'test desc2',
      isDone: false
    },
    {
      id: 3,
      name: 'leetcode',
      description: 'test desc3',
      isDone: true
    },

  ]

  private taskList$ = new BehaviorSubject<GetTaskApiResponse[]>(this.taskList);

  constructor() {
  }

  addTask(serviceInDto: AddTaskServiceInDto) {
    const request: AddTaskApiRequest = {
      id: this.taskList.length + 1,
      isDone: false,
      ...serviceInDto
    }

    // Request to Server
    this.addTaskAsMockServer(request);
    this.taskList$.next(this.taskList);
  }

  updateTask(serviceInDto: UpdateTaskServiceInDto) {
    console.log("update")
    const request: UpdateTaskApiRequest = {
      id: serviceInDto.id,
      name: serviceInDto.name,
      description: serviceInDto.description
    }

    // Request to Server
    this.updateTaskAsMockServer(request);
    this.taskList$.next(this.taskList);

  }

  getDataFromMockServer(): Observable<GetTaskApiResponse[]> {
    return this.taskList$.asObservable();

  }

  addTaskAsMockServer(request: AddTaskApiRequest) {
    const task: GetTaskApiResponse = {
      id: request.id,
      name: request.name,
      description: request.description,
      isDone: request.isDone
    }
    this.taskList.push(task);
  }

  updateTaskAsMockServer(request: UpdateTaskApiRequest) {
    console.log(request);
    this.taskList = this.taskList.map(task =>
      task.id === request.id ? { ...task, name: request.name, description: request.description } : task
    );
    console.log(this.taskList)
  }

}
