import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { AddTaskServiceInDto, DeleteTaskServiceInDto, MarkAsDoneServiceInDto, MarkAsTodoServiceInDto, TaskView as TaskViewData, UpdateTaskServiceInDto } from '../model/task.dto';
import { getCurrentDateTime } from 'src/app/core/date-util';

export type TaskCardData = {
  id: string;
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
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  mode!: EnumTaskCardMode;

  @Input()
  taskViewData!: TaskViewData;

  isContentOpen: boolean = false;

  TaskCardMode = EnumTaskCardMode;

  taskCardForm!: FormGroup<{ name: FormControl<string | null>; description: FormControl<string | null>; }>;;

  constructor(@Optional() public dialogRef: MatDialogRef<TaskComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { mode: EnumTaskCardMode, taskViewData: TaskViewData },
    public dialog: MatDialog, private taskService: TaskService) {

    this.taskCardForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
    });

  }
  ngOnInit(): void {
    // In modal case
    if (this.data != null) {
      this.isContentOpen = true;
      this.mode = this.data.mode;
      this.taskViewData = this.data.taskViewData;
      this.taskCardForm.setValue(
        { name: this.data.taskViewData.name, description: this.data.taskViewData.description }
      );
    }

  }

  toggleContent() {
    this.isContentOpen = !this.isContentOpen;
  }

  onSubmit() {
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
    const serviceInDto: MarkAsDoneServiceInDto = {
      id: this.taskViewData.id,
      isDone: true,
      updated_date: getCurrentDateTime()
    }
    this.taskService.markTaskAsDone(serviceInDto);
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(TaskComponent, {
      data: {
        mode: EnumTaskCardMode.EDIT,
        taskViewData: {
          id: this.taskViewData.id,
          name: this.taskViewData.name,
          description: this.taskViewData.description,
          isDone: this.taskViewData.isDone
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onDelete() {
    const isOkayToDelete: boolean = confirm("Are you sure to delete this task?")
    if (isOkayToDelete) {
      const serviceInDto: DeleteTaskServiceInDto = {
        id: this.taskViewData.id,
        updated_date: getCurrentDateTime()
      }

      this.taskService.deleteTask(serviceInDto);
    }

  }

  onMarkAsTodo() {
    const serviceInDto: MarkAsTodoServiceInDto = {
      id: this.taskViewData.id,
      isDone: false,
      updated_date: getCurrentDateTime()
    }
    this.taskService.markTaskAsTodo(serviceInDto);
  }

  onSave() {
    if (this.taskCardForm.valid) {
      // Submit form logic
      const serviceInDto: UpdateTaskServiceInDto = {
        id: this.taskViewData.id,
        name: this.taskCardForm.value.name ? this.taskCardForm.value.name : '',
        description: this.taskCardForm.value.description ? this.taskCardForm.value.description : '',
        updated_date: getCurrentDateTime()
      }
      this.taskService.updateTask(serviceInDto);
      this.dialogRef.close();

    } else {
      this.taskCardForm.markAllAsTouched();
    }

  }

  onAdd() {
    if (this.taskCardForm.valid) {
      const serviceInDto: AddTaskServiceInDto = {
        name: this.taskCardForm.value.name ? this.taskCardForm.value.name : '',
        description: this.taskCardForm.value.description ? this.taskCardForm.value.description : '',
        isDone: false,
        registered_date: getCurrentDateTime(),
        updated_date: getCurrentDateTime(),
      }

      // Add a task
      this.taskService.addTask(serviceInDto);

      this.dialogRef.close();
    } else {
      this.taskCardForm.markAllAsTouched();
    }

  }

  onCancel() {
    this.dialogRef.close();
  }
}
