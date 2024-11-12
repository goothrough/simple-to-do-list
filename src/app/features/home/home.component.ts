import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCardComponent, TaskCardData, EnumTaskCardMode } from 'src/app/shared/task-card/task-card.component';
import { TaskService } from '../task/task.service';

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
  ) { }


  ngOnInit(): void {
    this.taskCardList = this.convertTaskListToTaskCardList();
    console.log(this.taskCardList)
  }

  convertTaskListToTaskCardList() {
    const classifiedTaskList = this.taskService.getClassifiedTaskList();
    Object.keys(classifiedTaskList).forEach(key => {
      classifiedTaskList[key] = classifiedTaskList[key].map(task => {
        return { taskName: task.taskName, description: task.description, isDone: task.isDone }
      });
    })

    return classifiedTaskList;
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
