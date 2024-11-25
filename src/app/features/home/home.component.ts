import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent, TaskCardData, EnumTaskCardMode } from 'src/app/features/task/component/task.component';
import { TaskService } from '../task/service/task.service';
import { GetTaskApiResponse, TaskView } from '../task/model/task.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskCardList!: {
    todo: TaskView[];
    done: TaskView[];
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

  getClassifiedTaskList(plainTaskList: GetTaskApiResponse[]) {
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

  convertTaskListToTaskCardList(taskList: GetTaskApiResponse[]): TaskView[] {
    return taskList.map(t => { return { id: t.id, name: t.name, description: t.description, isDone: t.isDone } });
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskComponent, {
      data: { mode: EnumTaskCardMode.ADD, taskViewData: { name: '', description: '', isDone: false } },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}