import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent, EnumTaskCardMode } from 'src/app/shared/task/component/task.component';
import { TaskService } from '../../shared/task/service/task.service';
import { TaskApiModel, TaskView } from '../../shared/task/model/task.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  taskCardList:
    {
      todo: TaskView[];
      done: TaskView[];
    }
    =
    {
      todo: [],
      done: []
    }

  TaskCardMode = EnumTaskCardMode;

  private taskSubscription!: Subscription;

  constructor(public dialog: MatDialog, private taskService: TaskService) {
  }


  ngOnInit(): void {
    this.taskSubscription = this.taskService.getTasks().subscribe(t => {
      this.taskCardList = this.getClassifiedTaskList(this.convertTaskListToTaskCardList(t));
    })
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  getClassifiedTaskList(plainTaskList: TaskView[]) {
    const todoList: TaskView[] = [];
    const doneList: TaskView[] = [];

    plainTaskList.forEach(task => {
      if (task.isDone) {
        doneList.push(task);
      } else {
        todoList.push(task);
      }
    });

    return {
      todo: todoList,
      done: doneList,
    }
  };

  convertTaskListToTaskCardList(taskList: TaskApiModel[]): TaskView[] {
    return taskList.map(t => {
      return {
        id: t.id ? t.id : '',
        name: t.name ? t.name : '',
        description: t.description ? t.description : '',
        isDone: t.isDone ? t.isDone : false
      }
    });
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskComponent, {
      data: { mode: EnumTaskCardMode.ADD, taskViewData: { name: '', description: '', isDone: false } },
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}