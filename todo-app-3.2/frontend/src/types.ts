export interface Task {
  id: number;
  task: string;
  deadline?: string;
  completed: boolean;
  completedAt?: string;
}