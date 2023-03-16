import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { TodoStatus, TodoPriority } from '../../../enums/todo.enum';

@Entity({ name: 'todos' })
export default class Todo extends BaseEntity {
  @PrimaryColumn({ length: 36 })
  public id: string;

  @Column({ length: 255 })
  public title: string;

  @Column('text')
  public description: string;

  @Column({ type: 'datetime' })
  public startTime: Date;

  @Column({ type: 'datetime' })
  public endTime: Date;

  @Column({ type: 'enum', enum: TodoStatus })
  public status: TodoStatus;

  @Column({ type: 'enum', enum: TodoPriority })
  public priority: TodoPriority;

  @Column({ length: 36 })
  public userId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
