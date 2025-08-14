import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import TodoItem from './TodoItem';
import '../App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
console.log('API URL:', API_URL);

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched todos:', data);
        setTasks(data);
      })
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, []);

  const addTask = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: text, deadline: deadline || null, completed: false, completedAt: null }),
    });
    if (res.ok) {
      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
      setText('');
      setDeadline('');
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed, completedAt: task.completed ? null : new Date() }),
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks(prev =>
        prev.map(t =>
          t.id === id
            ? { ...t, completed: updated.completed, completedAt: updated.completedAt }
            : t
        )
      );
    }
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
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
        <button className="btn-submit" type="submit" style={{ marginLeft: '10px' }}>
          Add Task
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          tasks.map(task => (
            <TodoItem key={task.id} task={task} onToggle={toggleTask} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;