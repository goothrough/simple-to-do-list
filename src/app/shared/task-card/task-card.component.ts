import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/features/task/task.service';

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

  taskCardForm!: FormGroup<{ taskName: FormControl<string | null>; description: FormControl<string | null>; }>;;

  constructor(@Optional() public dialogRef: MatDialogRef<TaskCardComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { mode: EnumTaskCardMode, taskCardData: TaskCardData },
    public dialog: MatDialog, private taskService: TaskService) {

    this.taskCardForm = new FormGroup({
      taskName: new FormControl(''),
      description: new FormControl(''),
    });

  }
  ngOnInit(): void {
    // In modal case
    if (this.data != null) {
      this.isContentOpen = true;
      this.mode = this.data.mode;
      this.taskCardData = this.data.taskCardData;
      this.taskCardForm.setValue(
        { taskName: this.data.taskCardData.taskName, description: this.data.taskCardData.description }
      );
    }

  }

  toggleContent() {
    this.isContentOpen = !this.isContentOpen;
  }

  onSubmit() {
    console.log(this.taskCardForm);
    switch (this.mode) {
      case EnumTaskCardMode.ADD:
        this.onAdd();
        break;
      case EnumTaskCardMode.VIEW_TODO:
        this.onMarkAsDone();
        break;
      case EnumTaskCardMode.EDIT:
        this.onSave();
        break;
      case EnumTaskCardMode.VIEW_DONE:
        this.onMarkAsTodo();
        break;

    }

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

  onSave() {
    console.log("Save");
    this.dialogRef.close();
  }

  onAdd() {
    console.log("Add");
    const task = {
      taskName: this.taskCardForm.value.taskName ? this.taskCardForm.value.taskName : '',
      description: this.taskCardForm.value.description ? this.taskCardForm.value.description : '',
      isDone: false
    }
    this.taskService.addTask(task);
    this.dialogRef.close();
  }

  onCancel() {
    console.log("Cancel");
    this.dialogRef.close();
  }
}
