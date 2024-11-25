export interface TaskView {
    id: string;
    name: string;
    description: string;
    isDone: boolean
}

export interface GetTaskServiceOutDto {
    id: string;
    name: string;
    description: string;
    isDone: boolean
}

export interface AddTaskServiceInDto {
    name: string;
    description: string;
}

export interface UpdateTaskServiceInDto {
    id: string;
    name: string;
    description: string;
}

export interface DeleteTaskServiceInDto {
    id: string;
}

export interface MarkAsTodoServiceInDto {
    id: string;
    isDone: boolean;
}

export interface MarkAsDoneServiceInDto {
    id: string;
    isDone: boolean;
}

export interface TaskApiModel {
    id?: string;
    name?: string;
    description?: string;
    isDone?: boolean
}