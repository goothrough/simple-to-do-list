export interface TaskView {
    id: number;
    name: string;
    description: string;
    isDone: boolean
}

export interface GetTaskServiceOutDto {
    id: number;
    name: string;
    description: string;
    isDone: boolean
}

export interface AddTaskServiceInDto {
    name: string;
    description: string;
}

export interface UpdateTaskServiceInDto {
    id: number;
    name: string;
    description: string;
}

export interface DeleteTaskServiceInDto {
    id: number;
}

export interface MarkAsTodoServiceInDto {
    id: number;
    isDone: boolean;
}

export interface MarkAsDoneServiceInDto {
    id: number;
    isDone: boolean;
}

export interface GetTaskApiResponse {
    id: number;
    name: string;
    description: string;
    isDone: boolean
}

export interface AddTaskApiRequest {
    id: number;
    name: string;
    description: string;
    isDone: boolean;
}

export interface UpdateTaskApiRequest {
    id: number;
    name: string;
    description: string;
}

export interface DeleteTaskApiRequest {
    id: number;
}

export interface MarkAsTodoApiRequest {
    id: number;
    isDone: boolean;
}

export interface MarkAsDoneApiRequest {
    id: number;
    isDone: boolean;
}