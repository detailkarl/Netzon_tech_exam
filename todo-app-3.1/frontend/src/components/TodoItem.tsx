import React from 'react';
import { Task } from '../types';
import '../App.css';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ task, onToggle }) => {
  return (
      <div className="todo-item">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </span>
        {task.deadline && <span> — Deadline: {task.deadline}</span>}
        {task.completedAt && <span> Completed at: {task.completedAt}</span>}
      </div>
  );
};

export default TodoItem;
