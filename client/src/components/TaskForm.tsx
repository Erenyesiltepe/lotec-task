import { useState } from 'react';
import type { CreateTaskInput } from '../types';

interface TaskFormProps {
    onSubmit: (task: CreateTaskInput) => void;
    loading: boolean;
}

export default function TaskForm({ onSubmit, loading }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [assignee, setAssignee] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({
            title: title.trim(),
            assignee: assignee.trim() || undefined,
        });

        setTitle('');
        setAssignee('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Task title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Assignee (optional)"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    disabled={loading}
                />
            </div>
            <button type="submit" disabled={loading || !title.trim()}>
                {loading ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
}
