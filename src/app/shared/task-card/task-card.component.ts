import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/features/task/task.service';

export type TaskCardData = {
  taskName: string;
  description: string;
  isDone: boolean
}

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input()
  mode = ''

  @Input()
  taskCardData!: TaskCardData;

  constructor(@Optional() public dialogRef: MatDialogRef<TaskCardComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    // In modal case
    if (this.data != null) {
      this.mode = this.data.mode;
      this.taskCardData = this.data.taskCardData;
    }

  }
}
