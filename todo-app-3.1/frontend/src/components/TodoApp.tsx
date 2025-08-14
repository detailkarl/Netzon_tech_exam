import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import TodoItem from './TodoItem';
import '../App.css';

const LOCAL_STORAGE_KEY = 'todo-app-tasks';

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Task[] = JSON.parse(stored);
        setTasks(parsed);
      } catch {
        console.warn('Failed to parse tasks from localStorage');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = () => {
    if (!text.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text,
      deadline: deadline || undefined,
      completed: false,
    };

    setTasks(prev => [...prev, newTask]);
    setText('');
    setDeadline('');
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toLocaleString() : undefined,
            }
          : task
      )
    );
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      {/* <form className="todo-form"> */}
      <form className="todo-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task description"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <button className="btn-submit" onClick={addTask} style={{ marginLeft: '10px' }}>
          Add Task
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {tasks.map(task => (
          <TodoItem key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;