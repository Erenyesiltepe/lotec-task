import type { Task, CreateTaskInput, UpdateTaskInput } from './types';

const API_BASE_URL = 'http://localhost:8000';

export const api = {
    async getTasks(completed?: boolean): Promise<Task[]> {
        const url = completed !== undefined
            ? `${API_BASE_URL}/tasks?completed=${completed}`
            : `${API_BASE_URL}/tasks`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return response.json();
    },

    async createTask(data: CreateTaskInput): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        return response.json();
    },

    async updateTask(id: number, data: UpdateTaskInput): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return response.json();
    },

    async completeTask(id: number): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw new Error('Failed to complete task');
        }
        return response.json();
    },

    async undoTask(id: number): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}/undo`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw new Error('Failed to undo task');
        }
        return response.json();
    },

    async deleteTask(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    },
};
