import type { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id, task.completed)}
                    className="task-checkbox"
                />
                <div className="task-details">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-assignee">Assigned to: {task.assignee}</p>
                </div>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="delete-btn"
                aria-label="Delete task"
            >
                ✕
            </button>
        </div>
    );
}
