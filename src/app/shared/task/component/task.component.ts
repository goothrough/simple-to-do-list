import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { AddTaskServiceInDto, DeleteTaskServiceInDto, MarkAsDoneServiceInDto, MarkAsTodoServiceInDto, TaskView as TaskViewData, UpdateTaskServiceInDto } from '../model/task.dto';

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
      name: new FormControl(''),
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
    const serviceInDto: MarkAsDoneServiceInDto = {
      id: this.taskViewData.id,
      isDone: true
    }
    this.taskService.markTaskAsDone(serviceInDto);
  }

  openEditDialog() {
    console.log('Edit');
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
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete() {
    console.log('Delete');
    const isOkayToDelete: boolean = confirm("Are you sure to delete this task?")
    if (isOkayToDelete) {
      const serviceInDto: DeleteTaskServiceInDto = {
        id: this.taskViewData.id
      }
      
      this.taskService.deleteTask(serviceInDto);
    }

  }

  onMarkAsTodo() {
    console.log('Todo');
    const serviceInDto: MarkAsTodoServiceInDto = {
      id: this.taskViewData.id,
      isDone: false
    }
    this.taskService.markTaskAsTodo(serviceInDto);
  }

  onSave() {
    console.log("Save");
    const serviceInDto: UpdateTaskServiceInDto = {
      id: this.taskViewData.id,
      name: this.taskCardForm.value.name ? this.taskCardForm.value.name : '',
      description: this.taskCardForm.value.description ? this.taskCardForm.value.description : '',
    }
    this.taskService.updateTask(serviceInDto);

    this.dialogRef.close();
  }

  onAdd() {
    console.log("Add");
    const serviceInDto: AddTaskServiceInDto = {
      name: this.taskCardForm.value.name ? this.taskCardForm.value.name : '',
      description: this.taskCardForm.value.description ? this.taskCardForm.value.description : '',
    }

    // Add a task
    this.taskService.addTask(serviceInDto);

    this.dialogRef.close();
  }

  onCancel() {
    console.log("Cancel");
    this.dialogRef.close();
  }
}
