import { useState, useEffect } from 'react';
import './App.css';
import type { Task, CreateTaskInput, FilterType } from './types';
import { api } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const filterParam = filter === 'all' ? undefined : filter === 'completed';
      const data = await api.getTasks(filterParam);
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleCreateTask = async (taskData: CreateTaskInput) => {
    try {
      setLoading(true);
      setError(null);
      await api.createTask(taskData);
      await fetchTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id: number, currentCompleted: boolean) => {
    try {
      setError(null);
      if (currentCompleted) {
        await api.undoTask(id);
      } else {
        await api.completeTask(id);
      }
      await fetchTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setError(null);
      await api.deleteTask(id);
      await fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Task Manager</h1>
          <p>Manage your tasks efficiently</p>
        </header>

        <TaskForm onSubmit={handleCreateTask} loading={loading} />

        {error && <div className="error-message">{error}</div>}

        <FilterButtons activeFilter={filter} onFilterChange={setFilter} />

        {loading && tasks.length === 0 ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
