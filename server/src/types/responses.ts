import { Task } from '@prisma/client';

export type TaskResponse = Task;

export type TaskListResponse = Task[];

export interface ErrorResponse {
    error: string;
    details?: unknown;
}

export interface MessageResponse {
    message: string;
}
