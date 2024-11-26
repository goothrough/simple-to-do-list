export interface TaskView {
    id: string;
    name: string;
    description: string;
    isDone: boolean
}

export interface AddTaskServiceInDto {
    name: string;
    description: string;
    isDone: boolean;
    registered_date: Date;
    updated_date: Date;
}

export interface UpdateTaskServiceInDto {
    id: string;
    name: string;
    description: string;
    updated_date: Date;
}

export interface DeleteTaskServiceInDto {
    id: string;
    updated_date: Date;
}

export interface MarkAsTodoServiceInDto {
    id: string;
    isDone: boolean;
    updated_date: Date;
}

export interface MarkAsDoneServiceInDto {
    id: string;
    isDone: boolean;
    updated_date: Date;
}

export interface TaskApiModel {
    id?: string;
    name?: string;
    description?: string;
    isDone?: boolean;
    registered_date?: Date;
    updated_date?: Date;
}