export interface Task {
    id: number;
    title: string;
    assignee: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskInput {
    title: string;
    assignee?: string;
    completed?: boolean;
}

export interface UpdateTaskInput {
    title?: string;
    assignee?: string;
    completed?: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
