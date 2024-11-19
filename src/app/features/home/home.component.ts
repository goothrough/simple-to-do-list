import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCardComponent, TaskCardData, EnumTaskCardMode } from 'src/app/shared/task-card/task-card.component';
import { Task, TaskService } from '../task/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskCardList!: {
    todo: TaskCardData[];
    done: TaskCardData[];
  };

  TaskCardMode = EnumTaskCardMode;

  constructor(public dialog: MatDialog,
    private taskService: TaskService
  ) {
    this.taskCardList = {
      todo: [],
      done: []
    }
  }


  ngOnInit(): void {
    this.taskService.getDataFromMockServer().subscribe(t => {
      this.taskCardList = this.getClassifiedTaskList(this.convertTaskListToTaskCardList(t));
    })
  }

  getClassifiedTaskList(plainTaskList: TaskCardData[]) {
    const todoList: TaskCardData[] = [];
    const doneList: TaskCardData[] = [];

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


  convertTaskListToTaskCardList(taskList: Task[]): TaskCardData[] {
    return taskList.map(t => { return { taskName: t.taskName, description: t.description, isDone: t.isDone } });
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskCardComponent, {
      data: { mode: EnumTaskCardMode.ADD, taskCardData: { taskName: '', description: '', isDone: false } },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}