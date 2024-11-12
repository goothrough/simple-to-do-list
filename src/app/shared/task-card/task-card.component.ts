import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export type TaskCardData = {
  taskName: string;
  description: string;
  isDone: boolean
}

export enum EnumTaskCardMode {
  VIEW_TODO,
  EDIT,
  ADD,
  VIEW_DONE
}

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input()
  mode!: EnumTaskCardMode;

  @Input()
  taskCardData!: TaskCardData;

  isContentOpen: boolean = false;

  TaskCardMode = EnumTaskCardMode;

  constructor(@Optional() public dialogRef: MatDialogRef<TaskCardComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { mode: EnumTaskCardMode, taskCardData: TaskCardData },
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    // In modal case
    if (this.data != null) {
      this.isContentOpen = true;
      this.mode = this.data.mode;
      this.taskCardData = this.data.taskCardData;
    }

  }

  toggleContent() {
    this.isContentOpen = !this.isContentOpen;
  }

  onMarkAsDone() {
    console.log('Done');
  }

  openEditDialog() {
    console.log('Edit');
    const dialogRef = this.dialog.open(TaskCardComponent, {
      data: {
        mode: EnumTaskCardMode.EDIT,
        taskCardData: {
          taskName: this.taskCardData.taskName,
          description: this.taskCardData.description,
          isDone: this.taskCardData.isDone
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteDialog() {
    console.log('Delete');
  }

  onMarkAsTodo() {
    console.log('Todo');
  }
}
