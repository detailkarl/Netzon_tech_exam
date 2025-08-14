export interface Task {
  id: number;
  text: string;
  deadline?: string;
  completed: boolean;
  completedAt?: string;
}