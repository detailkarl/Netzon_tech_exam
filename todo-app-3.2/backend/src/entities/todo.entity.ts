import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class userTodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  task: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date | null;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  completedAt: Date;
}