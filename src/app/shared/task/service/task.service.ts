import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AddTaskServiceInDto, DeleteTaskServiceInDto, MarkAsDoneServiceInDto, MarkAsTodoServiceInDto, TaskApiModel, UpdateTaskServiceInDto } from '../model/task.dto';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) {
  }

  private taskCollection = this.firestore.collection<TaskApiModel>('tasks', (ref) =>
    ref
  );


  // Get all tasks from server
  getTasks(): Observable<TaskApiModel[]> {
    return this.taskCollection.valueChanges({ idField: 'id' });
  }

  // Add a task
  addTask(serviceInDto: AddTaskServiceInDto) {
    const request: TaskApiModel = {
      isDone: false,
      ...serviceInDto
    }

    // Request to Server
    this.taskCollection.add(request).catch(e => {
      console.error("Error during adding a task", e);
    });
  }

  // Update a task
  updateTask(serviceInDto: UpdateTaskServiceInDto) {
    console.log("update")
    const request: TaskApiModel = {
      name: serviceInDto.name,
      description: serviceInDto.description,
    }

    // Request to Server
    this.taskCollection.doc(serviceInDto.id).update(request).catch(e => {
      console.error("Error during updating a task", e);
    });
  }

  // Mark a task as Done
  markTaskAsDone(serviceInDto: MarkAsDoneServiceInDto) {
    console.log("mark as done")
    const request: TaskApiModel = {
      isDone: serviceInDto.isDone
    }

    // Request to Server
    this.taskCollection.doc(serviceInDto.id).update(request).catch(e => {
      console.error("Error during marking a task as done", e);
    });
  }

  // Mark a task as Todo
  markTaskAsTodo(serviceInDto: MarkAsTodoServiceInDto) {
    console.log("mark as todo")
    const request: TaskApiModel = {
      isDone: serviceInDto.isDone
    }

    // Request to Server
    this.taskCollection.doc(serviceInDto.id).update(request).catch(e => {
      console.error("Error during marking a task as todo", e);
    });
  }

  // Delete a task
  deleteTask(serviceInDto: DeleteTaskServiceInDto) {
    console.log("delete");
    
    // Request to Server
    this.taskCollection.doc(serviceInDto.id).delete().catch(e => {
      console.error("Error during deleting a task as todo", e);
    });

  }



}
